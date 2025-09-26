import { Issue, KPIData, TrendingIssue, Activity, User, Message, Communication, AnalyticsData } from '@/types';

export const kpiData: KPIData = {
    newReports: 42,
    avgResponseTime: '2.3h',
    avgResolutionTime: '18.5h',
    resolutionRate: 87
};

export const trendingIssues: TrendingIssue[] = [
    { id: 1, title: 'Potholes on Park Street', upvotes: 34, type: 'roads', priority: 8 },
    { id: 2, title: 'Water logging in Sector V', upvotes: 28, type: 'water', priority: 9 },
    { id: 3, title: 'Broken streetlight cluster', upvotes: 19, type: 'lighting', priority: 6 }
];

export const recentActivity: Activity[] = [
    { id: 1, user: 'Priya Singh', action: 'marked Issue #4512 as In Progress', time: '5 min ago', dept: 'Public Works' },
    { id: 2, user: 'Raj Kumar', action: 'resolved water logging complaint', time: '12 min ago', dept: 'Water Supply' },
    { id: 3, user: 'Admin', action: 'assigned pothole report to road dept', time: '18 min ago', dept: 'Roads' }
];

export const issues: Issue[] = [
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

// User Management Mock Data
export const users: User[] = [
    {
        id: 1,
        name: 'Priya Singh',
        email: 'priya.singh@pingcity.gov',
        role: 'admin',
        department: 'Public Works',
        status: 'active',
        reputation: 4.8,
        totalReports: 24,
        joinDate: '2023-01-15',
        lastLogin: '2 hours ago',
        permissions: ['manage_issues', 'assign_staff', 'view_analytics', 'manage_users']
    },
    {
        id: 2,
        name: 'Raj Kumar',
        email: 'raj.kumar@pingcity.gov',
        role: 'staff',
        department: 'Water Supply',
        status: 'active',
        reputation: 4.5,
        totalReports: 18,
        joinDate: '2023-03-20',
        lastLogin: '30 min ago',
        permissions: ['manage_issues', 'update_status']
    },
    {
        id: 3,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@gmail.com',
        role: 'citizen',
        status: 'active',
        reputation: 4.2,
        totalReports: 12,
        joinDate: '2023-06-10',
        lastLogin: '1 day ago',
        permissions: ['create_issues', 'vote_issues']
    },
    {
        id: 4,
        name: 'Anita Patel',
        email: 'anita.patel@pingcity.gov',
        role: 'admin',
        department: 'Roads',
        status: 'active',
        reputation: 4.9,
        totalReports: 31,
        joinDate: '2022-11-05',
        lastLogin: '15 min ago',
        permissions: ['manage_issues', 'assign_staff', 'view_analytics', 'manage_users']
    },
    {
        id: 5,
        name: 'Suresh Gupta',
        email: 'suresh.gupta@gmail.com',
        role: 'citizen',
        status: 'suspended',
        reputation: 2.1,
        totalReports: 3,
        joinDate: '2024-01-20',
        lastLogin: '1 week ago',
        permissions: ['create_issues']
    }
];

// Communication Center Mock Data
export const messages: Message[] = [
    {
        id: 1,
        type: 'announcement',
        title: 'Scheduled Maintenance: Water Supply',
        content: 'Water supply will be temporarily disrupted on Sunday from 6 AM to 2 PM for maintenance work in Sector 5.',
        sender: 'Water Department',
        recipients: ['all_citizens'],
        status: 'sent',
        priority: 'high',
        createdAt: '2024-01-20T10:00:00Z',
        sentAt: '2024-01-20T10:30:00Z',
        readBy: [1, 2, 3],
        channels: ['email', 'sms', 'push']
    },
    {
        id: 2,
        type: 'alert',
        title: 'Emergency: Road Closure',
        content: 'Main Street is temporarily closed due to emergency repair work. Use alternate routes.',
        sender: 'Roads Department',
        recipients: ['sector_1', 'sector_2'],
        status: 'sent',
        priority: 'urgent',
        createdAt: '2024-01-21T14:00:00Z',
        sentAt: '2024-01-21T14:05:00Z',
        readBy: [1, 2],
        channels: ['push', 'in-app']
    },
    {
        id: 3,
        type: 'update',
        title: 'Issue Resolution Update',
        content: 'The pothole on Park Street has been successfully repaired. Thank you for your patience.',
        sender: 'Public Works',
        recipients: ['issue_reporters'],
        status: 'draft',
        priority: 'medium',
        createdAt: '2024-01-21T16:00:00Z',
        readBy: [],
        channels: ['email', 'in-app']
    }
];

export const communications: Communication[] = [
    {
        id: 1,
        title: 'Monthly Newsletter - January 2024',
        message: 'Updates on city improvements, resolved issues, and upcoming projects.',
        type: 'public',
        audience: ['all_citizens'],
        createdBy: 'Communications Team',
        createdAt: '2024-01-01T09:00:00Z',
        status: 'active',
        engagement: {
            views: 2450,
            clicks: 185,
            responses: 23
        }
    },
    {
        id: 2,
        title: 'Department Training Notice',
        message: 'Mandatory training session on new issue management system.',
        type: 'department',
        audience: ['public_works', 'roads', 'water_supply'],
        createdBy: 'HR Department',
        createdAt: '2024-01-15T11:00:00Z',
        status: 'active',
        engagement: {
            views: 45,
            clicks: 38,
            responses: 12
        }
    }
];

// Analytics Dashboard Mock Data
export const analyticsData: AnalyticsData = {
    performance: {
        issueResolutionTime: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [24, 19, 16, 18, 15, 12]
        },
        departmentEfficiency: [
            { department: 'Roads', efficiency: 85, trend: 'up' },
            { department: 'Water Supply', efficiency: 78, trend: 'stable' },
            { department: 'Sanitation', efficiency: 92, trend: 'up' },
            { department: 'Lighting', efficiency: 73, trend: 'down' },
            { department: 'Parks', efficiency: 88, trend: 'up' }
        ],
        citizenSatisfaction: {
            rating: 4.2,
            trend: 0.3,
            responses: 1247
        }
    },
    trends: {
        monthlyIssues: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            data: [145, 132, 178, 156, 134, 167, 189]
        },
        issueCategories: [
            { category: 'Roads & Infrastructure', count: 45, percentage: 32 },
            { category: 'Water & Drainage', count: 38, percentage: 27 },
            { category: 'Sanitation', count: 22, percentage: 16 },
            { category: 'Street Lighting', count: 18, percentage: 13 },
            { category: 'Parks & Recreation', count: 17, percentage: 12 }
        ],
        geographicDistribution: [
            { area: 'Sector 1', issues: 34, resolved: 28 },
            { area: 'Sector 2', issues: 28, resolved: 25 },
            { area: 'Sector 3', issues: 42, resolved: 31 },
            { area: 'Sector 4', issues: 19, resolved: 16 },
            { area: 'Sector 5', issues: 36, resolved: 29 }
        ]
    },
    predictions: {
        nextMonthIssues: 165,
        highRiskAreas: ['Sector 3', 'Sector 5', 'Industrial Zone'],
        resourceNeeds: [
            { department: 'Roads', additionalStaff: 2, priority: 'high' },
            { department: 'Water Supply', additionalStaff: 1, priority: 'medium' },
            { department: 'Sanitation', additionalStaff: 0, priority: 'low' }
        ]
    }
};
