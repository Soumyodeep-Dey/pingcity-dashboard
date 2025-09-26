export interface Issue {
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

export interface KPIData {
    newReports: number;
    avgResponseTime: string;
    avgResolutionTime: string;
    resolutionRate: number;
}

export interface TrendingIssue {
    id: number;
    title: string;
    upvotes: number;
    type: string;
    priority: number;
}

export interface Activity {
    id: number;
    user: string;
    action: string;
    time: string;
    dept: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'staff' | 'citizen';
    department?: string;
    status: 'active' | 'inactive' | 'suspended';
    reputation: number;
    totalReports: number;
    joinDate: string;
    lastLogin: string;
    permissions: string[];
    avatar?: string;
}

export interface Message {
    id: number;
    type: 'announcement' | 'alert' | 'update' | 'notification';
    title: string;
    content: string;
    sender: string;
    recipients: string[];
    status: 'draft' | 'sent' | 'scheduled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    createdAt: string;
    sentAt?: string;
    scheduledAt?: string;
    readBy: number[];
    channels: ('email' | 'sms' | 'push' | 'in-app')[];
}

export interface Communication {
    id: number;
    title: string;
    message: string;
    type: 'public' | 'department' | 'targeted';
    audience: string[];
    createdBy: string;
    createdAt: string;
    status: 'active' | 'inactive';
    engagement: {
        views: number;
        clicks: number;
        responses: number;
    };
}

export interface AnalyticsData {
    performance: {
        issueResolutionTime: {
            labels: string[];
            data: number[];
        };
        departmentEfficiency: {
            department: string;
            efficiency: number;
            trend: 'up' | 'down' | 'stable';
        }[];
        citizenSatisfaction: {
            rating: number;
            trend: number;
            responses: number;
        };
    };
    trends: {
        monthlyIssues: {
            labels: string[];
            data: number[];
        };
        issueCategories: {
            category: string;
            count: number;
            percentage: number;
        }[];
        geographicDistribution: {
            area: string;
            issues: number;
            resolved: number;
        }[];
    };
    predictions: {
        nextMonthIssues: number;
        highRiskAreas: string[];
        resourceNeeds: {
            department: string;
            additionalStaff: number;
            priority: 'low' | 'medium' | 'high';
        }[];
    };
}