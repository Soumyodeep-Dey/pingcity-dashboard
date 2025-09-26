import { NextRequest, NextResponse } from 'next/server';
import { issues } from '@/data/mockData';

// POST /api/issues/[id]/vote - Upvote an issue
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const issueId = parseInt(resolvedParams.id);
        const issueIndex = issues.findIndex((i) => i.id === issueId);

        if (issueIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        // Increment upvote count
        issues[issueIndex].upvotes += 1;

        return NextResponse.json({
            success: true,
            data: {
                issueId: issues[issueIndex].id,
                newUpvoteCount: issues[issueIndex].upvotes
            },
            message: 'Vote recorded successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to record vote' },
            { status: 500 }
        );
    }
}

// DELETE /api/issues/[id]/vote - Remove upvote from an issue
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resolvedParams = await params;
        const issueId = parseInt(resolvedParams.id);
        const issueIndex = issues.findIndex(i => i.id === issueId);

        if (issueIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Issue not found' },
                { status: 404 }
            );
        }

        // Decrement upvote count (minimum 0)
        issues[issueIndex].upvotes = Math.max(0, issues[issueIndex].upvotes - 1);

        return NextResponse.json({
            success: true,
            data: {
                issueId: issues[issueIndex].id,
                newUpvoteCount: issues[issueIndex].upvotes
            },
            message: 'Vote removed successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to remove vote' },
            { status: 500 }
        );
    }
}