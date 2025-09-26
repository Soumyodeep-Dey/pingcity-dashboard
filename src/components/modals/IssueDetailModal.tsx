"use client";

import { MessageSquare } from 'lucide-react';
import { Issue } from '@/types';
import { StatusBadge, PriorityIndicator } from '@/components/ui/utility-components';

interface IssueDetailModalProps {
    selectedIssue: Issue | null;
    setSelectedIssue: (issue: Issue | null) => void;
}

export const IssueDetailModal = ({ selectedIssue, setSelectedIssue }: IssueDetailModalProps) => {
    if (!selectedIssue) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-zinc-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-zinc-800">Issue Details</h2>
                        <button
                            onClick={() => setSelectedIssue(null)}
                            className="p-2 hover:bg-zinc-100 rounded-lg"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-semibold text-zinc-800 mb-2">#{selectedIssue.id} - {selectedIssue.title}</h3>
                        <p className="text-zinc-600 mb-4">{selectedIssue.description}</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-zinc-500">Location:</span>
                                <p className="font-medium">{selectedIssue.location}</p>
                            </div>
                            <div>
                                <span className="text-zinc-500">Department:</span>
                                <p className="font-medium">{selectedIssue.department}</p>
                            </div>
                            <div>
                                <span className="text-zinc-500">Priority:</span>
                                <PriorityIndicator priority={selectedIssue.priority} />
                            </div>
                            <div>
                                <span className="text-zinc-500">Status:</span>
                                <div className="mt-1">
                                    <StatusBadge status={selectedIssue.status} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-3">Internal Communication</h4>
                        <div className="space-y-3 mb-4">
                            <div className="bg-zinc-50 p-3 rounded-lg">
                                <p className="text-sm text-zinc-700">Initial report received and categorized automatically.</p>
                                <span className="text-xs text-zinc-500">System • 2 days ago</span>
                            </div>
                            <div className="bg-zinc-50 p-3 rounded-lg">
                                <p className="text-sm text-zinc-700">@PublicWorks assigned to investigate the issue.</p>
                                <span className="text-xs text-zinc-500">Admin • 1 day ago</span>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Add internal comment..."
                                className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-3">Actions</h4>
                        <div className="flex flex-wrap gap-2">
                            <select className="px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option>Change Status</option>
                                <option>New</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                            </select>
                            <select className="px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option>Assign to</option>
                                <option>Priya Singh</option>
                                <option>Raj Kumar</option>
                            </select>
                            <select className="px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option>Set Priority</option>
                                <option>Low (1-3)</option>
                                <option>Medium (4-6)</option>
                                <option>High (7-8)</option>
                                <option>Critical (9-10)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-zinc-800 mb-3">Audit Trail</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center p-2 bg-zinc-50 rounded">
                                <span>Issue created by citizen</span>
                                <span className="text-zinc-500">2 days ago</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-zinc-50 rounded">
                                <span>Auto-assigned to Roads department</span>
                                <span className="text-zinc-500">2 days ago</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-zinc-50 rounded">
                                <span>Status changed to In Progress</span>
                                <span className="text-zinc-500">1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
