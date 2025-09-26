import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/data/mockData';
import { User } from '@/types';

// GET /api/users - Get all users with optional filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const department = searchParams.get('department');
        const status = searchParams.get('status');
        const limit = searchParams.get('limit');

        let filteredUsers = [...users];

        // Apply filters
        if (role) {
            filteredUsers = filteredUsers.filter(user => user.role === role);
        }

        if (department) {
            filteredUsers = filteredUsers.filter(user =>
                user.department?.toLowerCase().includes(department.toLowerCase())
            );
        }

        if (status) {
            filteredUsers = filteredUsers.filter(user => user.status === status);
        }

        // Apply limit
        if (limit) {
            filteredUsers = filteredUsers.slice(0, parseInt(limit));
        }

        // Calculate user statistics
        const stats = {
            total: users.length,
            active: users.filter(u => u.status === 'active').length,
            suspended: users.filter(u => u.status === 'suspended').length,
            byRole: {
                admin: users.filter(u => u.role === 'admin').length,
                staff: users.filter(u => u.role === 'staff').length,
                citizen: users.filter(u => u.role === 'citizen').length
            },
            avgReputation: users.reduce((acc, user) => acc + user.reputation, 0) / users.length
        };

        return NextResponse.json({
            success: true,
            data: filteredUsers,
            stats,
            total: filteredUsers.length,
            filters: { role, department, status, limit }
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'role'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                    missingFields
                },
                { status: 400 }
            );
        }

        const newUser: User = {
            id: Math.max(...users.map(u => u.id)) + 1,
            name: body.name,
            email: body.email,
            role: body.role,
            department: body.department || undefined,
            status: body.status || 'active',
            reputation: 0,
            totalReports: 0,
            joinDate: new Date().toISOString().split('T')[0],
            lastLogin: 'Never',
            permissions: getDefaultPermissions(body.role)
        };

        // In a real app, you'd save to database here
        users.push(newUser);

        return NextResponse.json({
            success: true,
            data: newUser,
            message: 'User created successfully'
        }, { status: 201 });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}

// Helper function to get default permissions based on role
function getDefaultPermissions(role: string): string[] {
    switch (role) {
        case 'admin':
            return ['manage_issues', 'assign_staff', 'view_analytics', 'manage_users'];
        case 'staff':
            return ['manage_issues', 'update_status'];
        case 'citizen':
            return ['create_issues', 'vote_issues'];
        default:
            return ['create_issues'];
    }
}
