"use client";

import { Filter, Download } from 'lucide-react';
import { issues } from '@/data/mockData';
import { Issue } from '@/types';
import { StatusBadge, PriorityIndicator } from '@/components/ui/utility-components';

interface IssuesViewProps {
    issueView: string;
    setIssueView: (view: string) => void;
    setSelectedIssue: (issue: Issue) => void;
}

export const IssuesView = ({ issueView, setIssueView, setSelectedIssue }: IssuesViewProps) => {
    return (
        <div className="p-6 space-y-6">
            {/* View Toggle and Filters */}
            <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setIssueView('kanban')}
                        className={`px-4 py-2 rounded-lg ${issueView === 'kanban' ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                    >
                        Kanban View
                    </button>
                    <button
                        onClick={() => setIssueView('table')}
                        className={`px-4 py-2 rounded-lg ${issueView === 'table' ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
                    >
                        Table View
                    </button>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200">
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {issueView === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {['New', 'Acknowledged', 'Assigned', 'In Progress', 'Resolved'].map(status => (
                        <div key={status} className="bg-zinc-50 p-4 rounded-xl">
                            <h3 className="font-semibold text-zinc-800 mb-4 flex items-center justify-between">
                                {status}
                                <span className="bg-zinc-200 text-zinc-700 text-xs px-2 py-1 rounded-full">
                                    {issues.filter(issue => issue.status === status.toLowerCase().replace(' ', '-')).length}
                                </span>
                            </h3>

                            <div className="space-y-3">
                                {issues
                                    .filter(issue => issue.status === status.toLowerCase().replace(' ', '-'))
                                    .map(issue => (
                                        <div
                                            key={issue.id}
                                            onClick={() => setSelectedIssue(issue)}
                                            className="bg-white p-4 rounded-lg border border-zinc-200 cursor-pointer hover:shadow-md transition-shadow"
                                        >
                                            <p className="font-medium text-zinc-800 text-sm mb-2">{issue.title}</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-zinc-600">#{issue.id}</span>
                                                    <PriorityIndicator priority={issue.priority} />
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="bg-zinc-200 text-zinc-700 px-2 py-1 rounded">{issue.department}</span>
                                                    <span className="text-zinc-500">{issue.upvotes} ↑</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">ID</th>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">Title</th>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">Department</th>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">Priority</th>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-zinc-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {issues.map(issue => (
                                <tr key={issue.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                                    <td className="p-4">
                                        <span className="font-mono text-sm">#{issue.id}</span>
                                    </td>
                                    <td className="p-4">
                                        <div>
                                            <p className="font-medium text-zinc-800">{issue.title}</p>
                                            <p className="text-sm text-zinc-600">{issue.location}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-zinc-200 text-zinc-700 px-2 py-1 rounded text-xs">{issue.department}</span>
                                    </td>
                                    <td className="p-4">
                                        <PriorityIndicator priority={issue.priority} />
                                    </td>
                                    <td className="p-4">
                                        <StatusBadge status={issue.status} />
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => setSelectedIssue(issue)}
                                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
