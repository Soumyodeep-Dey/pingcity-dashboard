'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { analyticsData, issues, users } from '@/data/mockData';
import { BarChart3, TrendingUp, Users as UsersIcon, Clock } from 'lucide-react';

export default function AnalyticsDashboard() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

    // Calculate real-time metrics from mock data
    const realTimeMetrics = {
        activeIssues: issues.filter(issue => issue.status !== 'resolved').length,
        activeUsers: users.filter(user => user.status === 'active').length,
        avgResolutionTime: '15.2h',
        systemLoad: 78
    };

    // Generate insights based on data
    const insights = [
        {
            type: 'warning',
            title: 'High Issue Volume in Sector 3',
            message: 'Sector 3 shows 25% more issues than average. Consider additional resources.',
            priority: 'high'
        },
        {
            type: 'success',
            title: 'Resolution Rate Improved',
            message: 'Overall resolution rate improved by 3% this month.',
            priority: 'medium'
        },
        {
            type: 'info',
            title: 'Peak Activity Hours',
            message: 'Most citizen reports come between 9 AM - 11 AM.',
            priority: 'low'
        }
    ];

    // Enhanced department performance with active issues
    const departmentPerformance = analyticsData.performance.departmentEfficiency.map(dept => ({
        ...dept,
        activeIssues: issues.filter(issue =>
            issue.department.toLowerCase() === dept.department.toLowerCase() &&
            issue.status !== 'resolved'
        ).length
    }));

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                    <p className="text-gray-600">
                        Generated at {new Date().toLocaleString()}
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
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{realTimeMetrics.activeIssues}</div>
                            <div className="text-sm text-gray-600">Active Issues</div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{realTimeMetrics.avgResolutionTime}</div>
                            <div className="text-sm text-gray-600">Avg Resolution Time</div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{realTimeMetrics.activeUsers}</div>
                            <div className="text-sm text-gray-600">Active Users</div>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-orange-600">{realTimeMetrics.systemLoad}%</div>
                            <div className="text-sm text-gray-600">System Load</div>
                        </div>
                    </div>
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
                                    : insight.type === 'success'
                                        ? 'border-green-400 bg-green-50'
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
                    {departmentPerformance.map((dept, index) => (
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

            {/* Issue Categories */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Issue Categories</h2>
                <div className="space-y-3">
                    {analyticsData.trends.issueCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-gray-700">{category.category}</span>
                            <div className="flex items-center space-x-3">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">
                                    {category.count}
                                </span>
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
                        {analyticsData.performance.citizenSatisfaction.rating}/5
                    </div>
                    <div>
                        <div className={`text-sm ${analyticsData.performance.citizenSatisfaction.trend > 0 ? 'text-green-600' :
                            analyticsData.performance.citizenSatisfaction.trend < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                            {analyticsData.performance.citizenSatisfaction.trend > 0 ? '↗' :
                                analyticsData.performance.citizenSatisfaction.trend < 0 ? '↘' : '→'}
                            {Math.abs(analyticsData.performance.citizenSatisfaction.trend)}
                        </div>
                        <div className="text-sm text-gray-600">
                            {analyticsData.performance.citizenSatisfaction.responses} responses
                        </div>
                    </div>
                </div>
            </Card>

            {/* Geographic Distribution */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
                <div className="space-y-3">
                    {analyticsData.trends.geographicDistribution.map((area, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{area.area}</span>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">
                                    {area.resolved}/{area.issues} resolved
                                </div>
                                <div className="text-xs text-gray-500">
                                    {Math.round((area.resolved / area.issues) * 100)}% rate
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Predictions */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Predictions & Forecasts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="text-2xl font-bold text-orange-600">
                            {analyticsData.predictions.nextMonthIssues}
                        </div>
                        <div className="text-sm text-gray-600">Expected Issues Next Month</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-600 mb-2">High Risk Areas:</div>
                        <div className="flex flex-wrap gap-2">
                            {analyticsData.predictions.highRiskAreas.map((area, index) => (
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

                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Resource Requirements</h3>
                    <div className="space-y-2">
                        {analyticsData.predictions.resourceNeeds.map((need, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-gray-700">{need.department}</span>
                                <div className="text-right">
                                    <span className="text-sm">+{need.additionalStaff} staff</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${need.priority === 'high' ? 'bg-red-100 text-red-800' :
                                        need.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {need.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
