import { NextRequest, NextResponse } from 'next/server';
import { issues } from '@/data/mockData';

// GET /api/issues/[id] - Get specific issue
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const issueId = parseInt(params.id);
        const issue = issues.find(i => i.id === issueId);

        if (!issue) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: issue
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid issue ID' },
            { status: 400 }
        );
    }
}

// PUT /api/issues/[id] - Update specific issue
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const issueId = parseInt(params.id);
        const issueIndex = issues.findIndex(i => i.id === issueId);

        if (issueIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const updatedIssue = { ...issues[issueIndex], ...body };

        // In a real app, you'd update in database here
        issues[issueIndex] = updatedIssue;

        return NextResponse.json({
            success: true,
            data: updatedIssue,
            message: 'Issue updated successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to update issue' },
            { status: 500 }
        );
    }
}

// DELETE /api/issues/[id] - Delete specific issue
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const issueId = parseInt(params.id);
        const issueIndex = issues.findIndex(i => i.id === issueId);

        if (issueIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        // In a real app, you'd delete from database here
        const deletedIssue = issues.splice(issueIndex, 1)[0];

        return NextResponse.json({
            success: true,
            data: deletedIssue,
            message: 'Issue deleted successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to delete issue' },
            { status: 500 }
        );
    }
}