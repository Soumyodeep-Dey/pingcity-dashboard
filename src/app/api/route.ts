import { NextResponse } from 'next/server';

// GET /api - API Documentation
export async function GET() {
    const apiDocs = {
        name: "PingCity Dashboard API",
        version: "1.0.0",
        description: "Municipal issue management system API",
        baseUrl: "/api",
        endpoints: {
            issues: {
                "GET /api/issues": {
                    description: "Get all issues with optional filtering",
                    params: {
                        status: "Filter by status (new, in-progress, resolved, etc.)",
                        department: "Filter by department name",
                        priority: "Filter by minimum priority level",
                        limit: "Limit number of results"
                    }
                },
                "POST /api/issues": {
                    description: "Create a new issue",
                    body: {
                        title: "string (required)",
                        description: "string (required)",
                        location: "string (required)",
                        department: "string (required)",
                        priority: "number (optional, default: 5)"
                    }
                },
                "GET /api/issues/[id]": {
                    description: "Get specific issue by ID"
                },
                "PUT /api/issues/[id]": {
                    description: "Update specific issue",
                    body: "Partial issue object"
                },
                "DELETE /api/issues/[id]": {
                    description: "Delete specific issue"
                },
                "POST /api/issues/[id]/vote": {
                    description: "Upvote an issue"
                },
                "DELETE /api/issues/[id]/vote": {
                    description: "Remove upvote from an issue"
                }
            },
            dashboard: {
                "GET /api/dashboard": {
                    description: "Get dashboard analytics and KPIs",
                    returns: "Real-time metrics, department stats, priority distribution"
                }
            },
            trending: {
                "GET /api/trending": {
                    description: "Get trending issues",
                    params: {
                        limit: "Number of results (default: 10)",
                        timeframe: "Time period (default: 48h)"
                    }
                }
            },
            activities: {
                "GET /api/activities": {
                    description: "Get recent activities",
                    params: {
                        limit: "Number of results (default: 10)",
                        department: "Filter by department"
                    }
                },
                "POST /api/activities": {
                    description: "Log new activity",
                    body: {
                        user: "string (required)",
                        action: "string (required)",
                        dept: "string (required)"
                    }
                }
            },
            search: {
                "GET /api/search": {
                    description: "Search issues",
                    params: {
                        q: "Search query (required)",
                        limit: "Number of results (default: 20)"
                    }
                }
            }
        },
        responseFormat: {
            success: {
                success: true,
                data: "Response data",
                message: "Optional message"
            },
            error: {
                success: false,
                error: "Error message",
                details: "Optional error details"
            }
        }
    };

    return NextResponse.json(apiDocs, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
