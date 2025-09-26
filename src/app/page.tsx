"use client";

import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  MapPin,
  BarChart3,
  Users,
  LogOut,
  Home,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Download,
  Send,
  MessageSquare,
  Target,
  Activity
} from 'lucide-react';

interface Issue {
  id: number;
  title: string;
  status: string;
  department: string;
  priority: number;
  upvotes: number;
  location: string;
  reportedDate: string;
  assignedTo: string | null;
  description: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [mapView, setMapView] = useState('pins'); // 'pins' or 'heatmap'
  const [issueView, setIssueView] = useState('kanban'); // 'kanban' or 'table'
  const notifications = 3;

  // Mock data
  const kpiData = {
    newReports: 42,
    avgResponseTime: '2.3h',
    avgResolutionTime: '18.5h',
    resolutionRate: 87
  };

  const trendingIssues = [
    { id: 1, title: 'Potholes on Park Street', upvotes: 34, type: 'roads', priority: 8 },
    { id: 2, title: 'Water logging in Sector V', upvotes: 28, type: 'water', priority: 9 },
    { id: 3, title: 'Broken streetlight cluster', upvotes: 19, type: 'lighting', priority: 6 }
  ];

  const recentActivity = [
    { id: 1, user: 'Priya Singh', action: 'marked Issue #4512 as In Progress', time: '5 min ago', dept: 'Public Works' },
    { id: 2, user: 'Raj Kumar', action: 'resolved water logging complaint', time: '12 min ago', dept: 'Water Supply' },
    { id: 3, user: 'Admin', action: 'assigned pothole report to road dept', time: '18 min ago', dept: 'Roads' }
  ];

  const issues = [
    {
      id: 4512,
      title: 'Large pothole on Main Road',
      status: 'in-progress',
      department: 'Roads',
      priority: 8,
      upvotes: 15,
      location: 'Park Street, Sector 2',
      reportedDate: '2 days ago',
      assignedTo: 'Priya Singh',
      description: 'Deep pothole causing traffic issues and vehicle damage'
    },
    {
      id: 4513,
      title: 'Overflowing garbage bin',
      status: 'new',
      department: 'Sanitation',
      priority: 6,
      upvotes: 8,
      location: 'Market Square',
      reportedDate: '4 hours ago',
      assignedTo: null,
      description: 'Garbage bin overflowing, attracting pests'
    },
    {
      id: 4514,
      title: 'Water supply disruption',
      status: 'assigned',
      department: 'Water Supply',
      priority: 9,
      upvotes: 23,
      location: 'Residential Area Block A',
      reportedDate: '1 day ago',
      assignedTo: 'Raj Kumar',
      description: 'No water supply for 12+ hours in entire block'
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-800',
      'acknowledged': 'bg-yellow-100 text-yellow-800',
      'assigned': 'bg-purple-100 text-purple-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      'resolved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const PriorityIndicator = ({ priority }: { priority: number }) => {
    const color = priority >= 8 ? 'text-red-500' : priority >= 6 ? 'text-yellow-500' : 'text-green-500';
    return <span className={`font-semibold ${color}`}>{priority}/10</span>;
  };

  const Sidebar = () => (
    <div className="w-64 bg-zinc-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-700">
        <h1 className="text-xl font-bold text-purple-400">PingCity Admin</h1>
        <p className="text-sm text-zinc-400 mt-1">Municipal Dashboard</p>
      </div>

      <nav className="flex-1 p-4">
        {[
          { id: 'dashboard', label: 'Command Center', icon: Home },
          { id: 'issues', label: 'Issue Management', icon: AlertTriangle },
          { id: 'analytics', label: 'Analytics Hub', icon: BarChart3 },
          { id: 'communication', label: 'Communication', icon: Send },
          { id: 'users', label: 'User Management', icon: Users },
        ].map(item => {
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

  const Header = () => (
    <header className="bg-white border-b border-zinc-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-zinc-800">
            {activeTab === 'dashboard' && 'Command Center'}
            {activeTab === 'issues' && 'Issue Management Hub'}
            {activeTab === 'analytics' && 'Analytics & Reporting'}
            {activeTab === 'communication' && 'Communication Center'}
            {activeTab === 'users' && 'User Management'}
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

  const DashboardView = () => (
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
            <div className="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-12 right-16 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-16 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
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

  const IssuesView = () => (
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

  const AnalyticsView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">Analytics Dashboard</h2>
        <p className="text-zinc-600">Analytics and reporting features coming soon...</p>
      </div>
    </div>
  );

  const CommunicationView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">Communication Center</h2>
        <p className="text-zinc-600">Communication tools and broadcasting features coming soon...</p>
      </div>
    </div>
  );

  const UsersView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
        <h2 className="text-xl font-semibold text-zinc-800 mb-4">User Management</h2>
        <p className="text-zinc-600">User management and permissions coming soon...</p>
      </div>
    </div>
  );

  // Issue Detail Modal
  const IssueDetailModal = () => {
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'issues':
        return <IssuesView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'communication':
        return <CommunicationView />;
      case 'users':
        return <UsersView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <IssueDetailModal />
    </div>
  );
};

export default Dashboard;