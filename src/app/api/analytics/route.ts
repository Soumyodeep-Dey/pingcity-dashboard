import { NextRequest, NextResponse } from 'next/server';
import { analyticsData, issues, users } from '@/data/mockData';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeframe = searchParams.get('timeframe') || '30d';
        const department = searchParams.get('department');

        // Calculate real-time analytics
        const realTimeAnalytics: AnalyticsData & {
            realTime: {
                activeIssues: number;
                avgResolutionTime: string;
                activeUsers: number;
                systemLoad: number;
                departmentPerformance: Array<{
                    department: string;
                    efficiency: number;
                    trend: string;
                    activeIssues: number;
                }>;
                recentTrends: {
                    newIssues: number[];
                    resolvedIssues: number[];
                    userActivity: number[];
                };
            };
            departmentSpecific?: {
                totalIssues: number;
                resolvedIssues: number;
                avgPriority: number;
                topLocations: Array<{ location: string; count: number }>;
            };
        } = {
            ...analyticsData,
            realTime: {
                activeIssues: issues.filter(issue => issue.status !== 'resolved').length,
                avgResolutionTime: '15.2h', // This would be calculated from real data
                activeUsers: users.filter(user => user.status === 'active').length,
                systemLoad: Math.floor(Math.random() * 30) + 70, // Simulate system load %

                // Department performance
                departmentPerformance: analyticsData.performance.departmentEfficiency.map(dept => ({
                    ...dept,
                    activeIssues: issues.filter(issue =>
                        issue.department.toLowerCase() === dept.department.toLowerCase() &&
                        issue.status !== 'resolved'
                    ).length
                })),

                // Recent trends (last 7 days)
                recentTrends: {
                    newIssues: [12, 8, 15, 10, 13, 9, 11], // Daily new issues
                    resolvedIssues: [10, 12, 11, 14, 8, 13, 15],
                    userActivity: [45, 52, 48, 61, 38, 44, 57]
                }
            }
        };

        // Filter by department if specified
        if (department) {
            const deptIssues = issues.filter(issue =>
                issue.department.toLowerCase().includes(department.toLowerCase())
            );

            realTimeAnalytics.departmentSpecific = {
                totalIssues: deptIssues.length,
                resolvedIssues: deptIssues.filter(issue => issue.status === 'resolved').length,
                avgPriority: deptIssues.reduce((acc, issue) => acc + issue.priority, 0) / deptIssues.length,
                topLocations: getTopLocations(deptIssues)
            };
        }

        // Generate insights based on data
        const insights = generateInsights(realTimeAnalytics);

        return NextResponse.json({
            success: true,
            data: realTimeAnalytics,
            insights,
            metadata: {
                timeframe,
                department,
                generatedAt: new Date().toISOString(),
                dataPoints: issues.length
            }
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}

// Helper function to get top locations by issue count
function getTopLocations(issuesData: typeof issues) {
    const locationCounts: Record<string, number> = {};

    issuesData.forEach(issue => {
        locationCounts[issue.location] = (locationCounts[issue.location] || 0) + 1;
    });

    return Object.entries(locationCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([location, count]) => ({ location, count }));
}

// Helper function to generate insights
import { AnalyticsData } from '@/types';

function generateInsights(data: AnalyticsData) {
    const insights = [];

    // Check for departments with declining efficiency
    const decliningDepts = data.performance.departmentEfficiency
        .filter(dept => dept.trend === 'down');

    if (decliningDepts.length > 0) {
        insights.push({
            type: 'warning',
            title: 'Declining Department Performance',
            message: `${decliningDepts.map(d => d.department).join(', ')} showing declining efficiency`,
            priority: 'high'
        });
    }

    // Check for high prediction
    if (data.predictions.nextMonthIssues > 180) {
        insights.push({
            type: 'alert',
            title: 'High Issue Volume Predicted',
            message: `Expecting ${data.predictions.nextMonthIssues} issues next month - consider resource allocation`,
            priority: 'medium'
        });
    }

    // Check citizen satisfaction
    if (data.performance.citizenSatisfaction.rating < 4.0) {
        insights.push({
            type: 'warning',
            title: 'Low Citizen Satisfaction',
            message: 'Citizen satisfaction below target threshold',
            priority: 'high'
        });
    }

    return insights;
}