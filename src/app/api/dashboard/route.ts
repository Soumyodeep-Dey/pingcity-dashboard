import { NextResponse } from 'next/server';
import { kpiData, issues } from '@/data/mockData';

// GET /api/dashboard - Get dashboard analytics and KPIs
export async function GET() {
    try {
        // Calculate real-time metrics from issues data
        const totalIssues = issues.length;
        const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;
        const inProgressIssues = issues.filter(issue => issue.status === 'in-progress').length;
        const newIssues = issues.filter(issue => issue.status === 'new').length;

        // Calculate department distribution
        const departmentStats = issues.reduce((acc, issue) => {
            acc[issue.department] = (acc[issue.department] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Calculate priority distribution
        const priorityStats = {
            high: issues.filter(issue => issue.priority >= 8).length,
            medium: issues.filter(issue => issue.priority >= 5 && issue.priority < 8).length,
            low: issues.filter(issue => issue.priority < 5).length
        };

        // Calculate recent activity (issues created in last 24h)
        // For demo purposes, consider all issues as recent since we don't have real timestamps
        const recentIssuesCount = issues.length;

        const analytics = {
            ...kpiData,
            realTimeStats: {
                totalIssues,
                resolvedIssues,
                inProgressIssues,
                newIssues,
                resolutionRate: totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0
            },
            departmentStats,
            priorityStats,
            recentActivity: recentIssuesCount
        };

        return NextResponse.json({
            success: true,
            data: analytics,
            timestamp: new Date().toISOString()
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
