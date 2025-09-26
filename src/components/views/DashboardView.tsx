"use client";

import { useEffect, useState } from 'react';
import {
    MapPin,
    CheckCircle,
    Clock,
    TrendingUp,
    Plus,
    Target,
    Activity
} from 'lucide-react';
import { kpiData, trendingIssues, recentActivity } from '@/data/mockData';
import { PriorityIndicator } from '@/components/ui/utility-components';

interface DashboardViewProps {
    mapView: string;
    setMapView: (view: string) => void;
}

export const DashboardView = ({ mapView, setMapView }: DashboardViewProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        <div className="p-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-600">New Reports (24h)</p>
                            <p className="text-3xl font-bold text-zinc-800">{kpiData.newReports}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Plus className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">↑ 12% from yesterday</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-600">Avg Response Time</p>
                            <p className="text-3xl font-bold text-zinc-800">{kpiData.avgResponseTime}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">↓ 18% improvement</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-600">Avg Resolution Time</p>
                            <p className="text-3xl font-bold text-zinc-800">{kpiData.avgResolutionTime}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Target className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                    <p className="text-sm text-red-600 mt-2">↑ 5% slower</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-600">Resolution Rate</p>
                            <p className="text-3xl font-bold text-zinc-800">{kpiData.resolutionRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">↑ 3% improvement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Interactive Map */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-zinc-800">Live Interactive Map</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setMapView('pins')}
                                className={`px-3 py-1 rounded-lg text-sm ${mapView === 'pins' ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                            >
                                Pins
                            </button>
                            <button
                                onClick={() => setMapView('heatmap')}
                                className={`px-3 py-1 rounded-lg text-sm ${mapView === 'heatmap' ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                            >
                                Heatmap
                            </button>
                        </div>
                    </div>

                    <div className="relative h-96 bg-zinc-50 rounded-lg border-2 border-dashed border-zinc-300 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                            <p className="text-zinc-600">Interactive Map Component</p>
                            <p className="text-sm text-zinc-400">Real-time issue plotting • {mapView === 'pins' ? 'Pin View' : 'Heatmap View'}</p>
                        </div>

                        {/* Mock pins */}
                        <div className={`absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full ${isMounted ? 'animate-pulse' : ''}`}></div>
                        <div className={`absolute top-12 right-16 w-3 h-3 bg-yellow-500 rounded-full ${isMounted ? 'animate-pulse' : ''}`}></div>
                        <div className={`absolute bottom-16 left-1/3 w-3 h-3 bg-orange-500 rounded-full ${isMounted ? 'animate-pulse' : ''}`}></div>
                    </div>
                </div>

                {/* Trending Issues */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                    <h3 className="text-lg font-semibold text-zinc-800 mb-4">Trending Issues (48h)</h3>
                    <div className="space-y-4">
                        {trendingIssues.map(issue => (
                            <div key={issue.id} className="flex items-start justify-between p-3 bg-zinc-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-zinc-800 text-sm">{issue.title}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <span className="text-xs text-zinc-600">{issue.upvotes} upvotes</span>
                                        <PriorityIndicator priority={issue.priority} />
                                    </div>
                                </div>
                                <TrendingUp className="w-4 h-4 text-purple-600 mt-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Recent Activity Feed</h3>
                <div className="space-y-3">
                    {recentActivity.map(activity => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-zinc-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <Activity className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-zinc-800">
                                    <span className="font-medium">{activity.user}</span> {activity.action}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-zinc-500">{activity.time}</span>
                                    <span className="text-xs bg-zinc-200 text-zinc-700 px-2 py-1 rounded">{activity.dept}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
