import { Issue, KPIData, TrendingIssue, Activity } from '@/types';

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