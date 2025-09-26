"use client";

import React from 'react';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import UserManagement from '@/components/UserManagement';
import { Communication } from '@/types';

export const AnalyticsView = () => (
    <AnalyticsDashboard />
);

export const CommunicationView = () => {
    const [messages, setMessages] = React.useState<Communication[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchCommunications = async () => {
            try {
                const response = await fetch('/api/communications');
                const data = await response.json();
                if (data.success) {
                    setMessages(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch communications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunications();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
                <p className="text-gray-600">Manage announcements, alerts, and communications</p>
            </div>

            <div className="space-y-4">
                {messages.map((message: Communication) => (
                    <div key={message.id} className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-zinc-800">{message.title}</h3>
                                <p className="text-zinc-600 mt-2">{message.message}</p>
                                <div className="mt-4 flex items-center space-x-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${message.type === 'public' ? 'bg-blue-100 text-blue-800' :
                                            message.type === 'department' ? 'bg-green-100 text-green-800' :
                                                'bg-purple-100 text-purple-800'
                                        }`}>
                                        {message.type}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${message.status === 'active' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {message.status}
                                    </span>
                                    <span className="text-sm text-zinc-500">
                                        by {message.createdBy}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right text-sm text-zinc-500">
                                <div>Views: {message.engagement?.views || 0}</div>
                                <div>Responses: {message.engagement?.responses || 0}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {messages.length === 0 && !loading && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 text-center">
                    <p className="text-zinc-600">No communications found.</p>
                </div>
            )}
        </div>
    );
};

export const UsersView = () => (
    <UserManagement />
);