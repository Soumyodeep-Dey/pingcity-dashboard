'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnalyticsData } from '@/types';

interface AnalyticsApiResponse {
    success: boolean;
    data: AnalyticsData & {
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
    };
    insights: Array<{
        type: string;
        title: string;
        message: string;
        priority: string;
    }>;
    metadata: {
        timeframe: string;
        department?: string;
        generatedAt: string;
        dataPoints: number;
    };
}

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

    const fetchAnalytics = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/analytics?timeframe=${selectedTimeframe}`);
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedTimeframe]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!analytics || !analytics.success) {
        return (
            <div className="p-6">
                <div className="text-center text-red-600">
                    Failed to load analytics data. Please try again.
                </div>
            </div>
        );
    }

    const { data, insights, metadata } = analytics;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600">
                        Generated at {new Date(metadata.generatedAt).toLocaleString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    {['7d', '30d', '90d'].map((timeframe) => (
                        <Button
                            key={timeframe}
                            variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                            onClick={() => setSelectedTimeframe(timeframe)}
                        >
                            {timeframe}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-2xl font-bold text-blue-600">{data.realTime.activeIssues}</div>
                    <div className="text-sm text-gray-600">Active Issues</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold text-green-600">{data.realTime.avgResolutionTime}</div>
                    <div className="text-sm text-gray-600">Avg Resolution Time</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold text-purple-600">{data.realTime.activeUsers}</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                </Card>
                <Card className="p-4">
                    <div className="text-2xl font-bold text-orange-600">{data.realTime.systemLoad}%</div>
                    <div className="text-sm text-gray-600">System Load</div>
                </Card>
            </div>

            {/* Insights */}
            {insights.length > 0 && (
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
                    <div className="space-y-3">
                        {insights.map((insight, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg border-l-4 ${insight.type === 'warning'
                                        ? 'border-yellow-400 bg-yellow-50'
                                        : insight.type === 'alert'
                                            ? 'border-red-400 bg-red-50'
                                            : 'border-blue-400 bg-blue-50'
                                    }`}
                            >
                                <h3 className="font-medium">{insight.title}</h3>
                                <p className="text-sm text-gray-600">{insight.message}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Department Performance */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
                <div className="space-y-4">
                    {data.realTime.departmentPerformance.map((dept, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-medium">{dept.department}</div>
                                <div className="text-sm text-gray-600">{dept.activeIssues} active issues</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold">{dept.efficiency}%</div>
                                <div className={`text-sm ${dept.trend === 'up' ? 'text-green-600' :
                                        dept.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                                    }`}>
                                    {dept.trend === 'up' ? '↗' : dept.trend === 'down' ? '↘' : '→'} {dept.trend}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Citizen Satisfaction */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Citizen Satisfaction</h2>
                <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-blue-600">
                        {data.performance.citizenSatisfaction.rating}/5
                    </div>
                    <div>
                        <div className={`text-sm ${data.performance.citizenSatisfaction.trend > 0 ? 'text-green-600' :
                                data.performance.citizenSatisfaction.trend < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                            {data.performance.citizenSatisfaction.trend > 0 ? '↗' :
                                data.performance.citizenSatisfaction.trend < 0 ? '↘' : '→'}
                            {Math.abs(data.performance.citizenSatisfaction.trend)}
                        </div>
                        <div className="text-sm text-gray-600">
                            {data.performance.citizenSatisfaction.responses} responses
                        </div>
                    </div>
                </div>
            </Card>

            {/* Predictions */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Predictions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-2xl font-bold text-orange-600">
                            {data.predictions.nextMonthIssues}
                        </div>
                        <div className="text-sm text-gray-600">Expected Issues Next Month</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-2">High Risk Areas:</div>
                        <div className="flex flex-wrap gap-2">
                            {data.predictions.highRiskAreas.map((area, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}