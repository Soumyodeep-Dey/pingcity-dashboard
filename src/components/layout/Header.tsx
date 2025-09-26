"use client";

import { Bell, Search } from 'lucide-react';

interface HeaderProps {
    activeTab: string;
    notifications: number;
}

export const Header = ({ activeTab, notifications }: HeaderProps) => {
    const getTitle = () => {
        switch (activeTab) {
            case 'dashboard':
                return 'Command Center';
            case 'issues':
                return 'Issue Management Hub';
            case 'analytics':
                return 'Analytics & Reporting';
            case 'communication':
                return 'Communication Center';
            case 'users':
                return 'User Management';
            default:
                return 'Command Center';
        }
    };

    return (
        <header className="bg-white border-b border-zinc-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-semibold text-zinc-800">
                        {getTitle()}
                    </h2>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search issues..."
                            className="pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <button className="relative p-2 text-zinc-600 hover:text-purple-600">
                        <Bell className="w-5 h-5" />
                        {notifications > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {notifications}
                            </span>
                        )}
                    </button>

                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">A</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
