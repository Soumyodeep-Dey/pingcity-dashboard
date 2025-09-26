"use client";

import React from 'react';
import AnalyticsDashboard from '@/components/views/AnalyticsDashboard';
import UserManagement from '@/components/views/UserManagement';
import { Communication } from '@/types';
import { communications, messages } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const AnalyticsView = () => (
    <AnalyticsDashboard />
);

export const CommunicationView = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedType, setSelectedType] = React.useState<string>('');

    // Filter communications based on search and type
    const filteredCommunications = React.useMemo(() => {
        return communications.filter((comm: Communication) => {
            const matchesSearch = !searchTerm ||
                comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comm.message.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = !selectedType || comm.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [searchTerm, selectedType]);

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
                <p className="text-gray-600">Manage announcements, alerts, and communications</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search communications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['public', 'department', 'targeted'].map((type) => (
                        <Button
                            key={type}
                            variant={selectedType === type ? 'default' : 'outline'}
                            onClick={() => setSelectedType(type === selectedType ? '' : type)}
                            className="capitalize"
                        >
                            {type}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {filteredCommunications.map((message: Communication) => (
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
                                    <span className="text-sm text-zinc-500">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right text-sm text-zinc-500">
                                <div>Views: {message.engagement?.views || 0}</div>
                                <div>Clicks: {message.engagement?.clicks || 0}</div>
                                <div>Responses: {message.engagement?.responses || 0}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCommunications.length === 0 && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 text-center">
                    <p className="text-zinc-600">
                        {searchTerm || selectedType ? 'No communications found matching your criteria.' : 'No communications found.'}
                    </p>
                </div>
            )}

            {/* Messages Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Messages</h2>
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-medium text-zinc-800">{msg.title}</h4>
                                    <p className="text-sm text-zinc-600 mt-1">{msg.content}</p>
                                    <div className="mt-2 flex items-center space-x-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.type === 'announcement' ? 'bg-blue-100 text-blue-800' :
                                            msg.type === 'alert' ? 'bg-red-100 text-red-800' :
                                                msg.type === 'update' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                            }`}>
                                            {msg.type}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${msg.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                            msg.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                                msg.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                            }`}>
                                            {msg.priority}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            by {msg.sender}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-zinc-500">
                                    <div>{msg.status}</div>
                                    <div>Read by: {msg.readBy.length}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const UsersView = () => (
    <UserManagement />
);
