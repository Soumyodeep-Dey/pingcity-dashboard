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