import { NextRequest, NextResponse } from 'next/server';
import { issues } from '@/data/mockData';

// GET /api/search - Search issues
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        const limit = searchParams.get('limit') || '20';

        if (!query) {
            return NextResponse.json(
                { success: false, error: 'Search query is required' },
                { status: 400 }
            );
        }

        const searchQuery = query.toLowerCase();

        // Search in title, description, location, and department
        const searchResults = issues.filter(issue =>
            issue.title.toLowerCase().includes(searchQuery) ||
            issue.description.toLowerCase().includes(searchQuery) ||
            issue.location.toLowerCase().includes(searchQuery) ||
            issue.department.toLowerCase().includes(searchQuery)
        );

        // Sort by relevance (title matches first, then description, etc.)
        const sortedResults = searchResults.sort((a, b) => {
            const aScore = getRelevanceScore(a, searchQuery);
            const bScore = getRelevanceScore(b, searchQuery);
            return bScore - aScore;
        });

        const limitedResults = sortedResults.slice(0, parseInt(limit));

        return NextResponse.json({
            success: true,
            data: limitedResults,
            total: searchResults.length,
            query: query,
            limit: parseInt(limit)
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Search failed' },
            { status: 500 }
        );
    }
}

// Helper function to calculate relevance score
function getRelevanceScore(issue: typeof issues[0], query: string): number {
    let score = 0;

    if (issue.title.toLowerCase().includes(query)) score += 10;
    if (issue.description.toLowerCase().includes(query)) score += 5;
    if (issue.location.toLowerCase().includes(query)) score += 3;
    if (issue.department.toLowerCase().includes(query)) score += 2;

    // Boost score for higher priority issues
    score += issue.priority;

    // Boost score for more popular issues
    score += issue.upvotes * 0.5;

    return score;
}
