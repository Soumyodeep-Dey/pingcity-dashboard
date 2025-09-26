"use client";

import { Home, AlertTriangle, BarChart3, Send, Users, LogOut } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const menuItems = [
        { id: 'dashboard', label: 'Command Center', icon: Home },
        { id: 'issues', label: 'Issue Management', icon: AlertTriangle },
        { id: 'analytics', label: 'Analytics Hub', icon: BarChart3 },
        { id: 'communication', label: 'Communication', icon: Send },
        { id: 'users', label: 'User Management', icon: Users },
    ];

    return (
        <div className="w-64 bg-zinc-900 text-white h-screen flex flex-col">
            <div className="p-6 border-b border-zinc-700">
                <h1 className="text-xl font-bold text-purple-400">PingCity Admin</h1>
                <p className="text-sm text-zinc-400 mt-1">Municipal Dashboard</p>
            </div>

            <nav className="flex-1 p-4">
                {menuItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg mb-2 transition-colors ${activeTab === item.id
                                ? 'bg-purple-600 text-white'
                                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-zinc-700">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-300 hover:bg-zinc-800 rounded-lg">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};