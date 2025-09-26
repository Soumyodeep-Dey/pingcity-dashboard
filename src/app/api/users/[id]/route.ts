import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/data/mockData';

// GET /api/users/[id] - Get specific user
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const userId = parseInt(resolvedParams.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: user
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid user ID' },
            { status: 400 }
        );
    }
}

// PUT /api/users/[id] - Update specific user
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const userId = parseInt(resolvedParams.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const updatedUser = { ...users[userIndex], ...body };

        // Update last login if user is being activated
        if (body.status === 'active' && users[userIndex].status !== 'active') {
            updatedUser.lastLogin = new Date().toLocaleString();
        }

        // In a real app, you'd update in database here
        users[userIndex] = updatedUser;

        return NextResponse.json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to update user' },
            { status: 500 }
        );
    }
}

// DELETE /api/users/[id] - Delete specific user
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const userId = parseInt(resolvedParams.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        // Don't allow deletion of admin users in demo
        if (users[userIndex].role === 'admin') {
            return NextResponse.json(
                { success: false, error: 'Cannot delete admin users' },
                { status: 403 }
            );
        }

        // In a real app, you'd delete from database here
        const deletedUser = users.splice(userIndex, 1)[0];

        return NextResponse.json({
            success: true,
            data: deletedUser,
            message: 'User deleted successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}