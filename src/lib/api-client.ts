const API_BASE = '/api';

interface ApiOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
}

async function apiCall<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Issues API
export const issuesApi = {
    // Get all issues
    getAll: (params?: { status?: string; department?: string; priority?: number; limit?: number }) => {
        const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
        return apiCall(`/issues${query}`);
    },

    // Get specific issue
    getById: (id: number) => apiCall(`/issues/${id}`),

    // Create new issue
    create: (issue: { title: string; description: string; location: string; department: string; priority?: number }) =>
        apiCall('/issues', { method: 'POST', body: issue }),

    // Update issue
    update: (id: number, updates: Record<string, unknown>) =>
        apiCall(`/issues/${id}`, { method: 'PUT', body: updates }),

    // Delete issue
    delete: (id: number) => apiCall(`/issues/${id}`, { method: 'DELETE' }),

    // Vote on issue
    vote: (id: number) => apiCall(`/issues/${id}/vote`, { method: 'POST' }),

    // Remove vote
    unvote: (id: number) => apiCall(`/issues/${id}/vote`, { method: 'DELETE' }),
};

// Dashboard API
export const dashboardApi = {
    getAnalytics: () => apiCall('/dashboard'),
};

// Trending API
export const trendingApi = {
    get: (params?: { limit?: number; timeframe?: string }) => {
        const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
        return apiCall(`/trending${query}`);
    },
};

// Activities API
export const activitiesApi = {
    getAll: (params?: { limit?: number; department?: string }) => {
        const query = params ? `?${new URLSearchParams(params as Record<string, string>)}` : '';
        return apiCall(`/activities${query}`);
    },

    log: (activity: { user: string; action: string; dept: string }) =>
        apiCall('/activities', { method: 'POST', body: activity }),
};

// Search API
export const searchApi = {
    search: (query: string, limit?: number) => {
        const params = new URLSearchParams({ q: query });
        if (limit) params.set('limit', limit.toString());
        return apiCall(`/search?${params}`);
    },
};

// Export a combined API object
export const api = {
    issues: issuesApi,
    dashboard: dashboardApi,
    trending: trendingApi,
    activities: activitiesApi,
    search: searchApi,
};
