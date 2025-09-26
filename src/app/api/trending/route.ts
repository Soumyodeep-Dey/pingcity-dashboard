import { NextRequest, NextResponse } from 'next/server';
import { trendingIssues, issues } from '@/data/mockData';

// GET /api/trending - Get trending issues
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '10';
        const timeframe = searchParams.get('timeframe') || '48h';

        // Sort issues by upvotes and priority for trending calculation
        const sortedIssues = [...issues]
            .sort((a, b) => (b.upvotes + b.priority) - (a.upvotes + a.priority))
            .slice(0, parseInt(limit));

        const trendingData = {
            issues: sortedIssues,
            staticTrending: trendingIssues.slice(0, parseInt(limit)),
            timeframe,
            generatedAt: new Date().toISOString()
        };

        return NextResponse.json({
            success: true,
            data: trendingData
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch trending issues' },
            { status: 500 }
        );
    }
}