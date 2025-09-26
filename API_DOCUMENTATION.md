# PingCity Dashboard API Documentation

## Overview

This document outlines the REST API endpoints available in the PingCity Dashboard application. The API provides comprehensive functionality for issue management, user management, communications, analytics, and more.

## Base URL

All API endpoints are prefixed with `/api/`

## Authentication

Currently, the API uses mock data and doesn't require authentication. In a production environment, you would implement proper authentication middleware.

## API Endpoints

### Issues Management

#### Get All Issues
- **GET** `/api/issues`
- **Query Parameters:**
  - `page` (number): Page number for pagination (default: 1)
  - `limit` (number): Number of items per page (default: 10)
  - `search` (string): Search term for filtering issues
  - `status` (string): Filter by status (pending, assigned, resolved, closed)
  - `department` (string): Filter by department
  - `priority` (number): Filter by priority level

**Example Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Get Single Issue
- **GET** `/api/issues/[id]`

#### Update Issue
- **PUT** `/api/issues/[id]`

#### Delete Issue
- **DELETE** `/api/issues/[id]`

#### Vote on Issue
- **POST** `/api/issues/[id]/vote`
- **Body:** `{ "type": "upvote" | "downvote" }`

### User Management

#### Get All Users
- **GET** `/api/users`
- **Query Parameters:**
  - `page`, `limit`, `search` (same as issues)
  - `role` (string): Filter by user role (admin, staff, citizen)
  - `status` (string): Filter by user status (active, inactive, suspended)

#### Get Single User
- **GET** `/api/users/[id]`

#### Update User
- **PUT** `/api/users/[id]`

#### Delete User
- **DELETE** `/api/users/[id]`

### Communications Center

#### Get All Communications
- **GET** `/api/communications`
- **Query Parameters:**
  - `type` (string): Filter by communication type (public, department, targeted)
  - `status` (string): Filter by status (active, inactive)

#### Get Single Communication
- **GET** `/api/communications/[id]`

#### Create Communication
- **POST** `/api/communications`

#### Update Communication
- **PUT** `/api/communications/[id]`

#### Delete Communication
- **DELETE** `/api/communications/[id]`

### Analytics Dashboard

#### Get Analytics Data
- **GET** `/api/analytics`
- **Query Parameters:**
  - `timeframe` (string): Time period for analytics (7d, 30d, 90d) (default: 30d)
  - `department` (string): Filter analytics by specific department

**Example Response:**
```json
{
  "success": true,
  "data": {
    "realTime": {
      "activeIssues": 42,
      "avgResolutionTime": "15.2h",
      "activeUsers": 156,
      "systemLoad": 87,
      "departmentPerformance": [...],
      "recentTrends": {
        "newIssues": [12, 8, 15, 10, 13, 9, 11],
        "resolvedIssues": [10, 12, 11, 14, 8, 13, 15],
        "userActivity": [45, 52, 48, 61, 38, 44, 57]
      }
    },
    "performance": {...},
    "trends": {...},
    "predictions": {...}
  },
  "insights": [
    {
      "type": "warning",
      "title": "High Volume Expected",
      "message": "Expecting 165 issues next month - consider resource allocation",
      "priority": "medium"
    }
  ],
  "metadata": {
    "timeframe": "30d",
    "generatedAt": "2024-01-21T10:00:00Z",
    "dataPoints": 25
  }
}
```

### Dashboard Overview

#### Get Dashboard KPIs
- **GET** `/api/dashboard`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "totalIssues": 156,
    "resolvedIssues": 89,
    "avgResolutionTime": "15.2h",
    "citizenSatisfaction": 4.2,
    "departmentPerformance": [...],
    "recentActivity": [...]
  }
}
```

### Search

#### Search Across Platform
- **GET** `/api/search`
- **Query Parameters:**
  - `q` (string): Search query (required)
  - `type` (string): Filter by content type (issues, users, communications)
  - `limit` (number): Maximum results to return

### Activities

#### Get Activity Log
- **GET** `/api/activities`
- **Query Parameters:**
  - `limit` (number): Maximum activities to return (default: 50)
  - `type` (string): Filter by activity type

### Trending

#### Get Trending Issues
- **GET** `/api/trending`

**Example Response:**
```json
{
  "success": true,
  "data": {
    "trendingIssues": [...],
    "trendingTopics": ["road_repair", "water_supply", "lighting"],
    "viralIssues": [...]
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## Data Types

### Issue
```typescript
interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'assigned' | 'resolved' | 'closed';
  department: string;
  priority: number;
  upvotes: number;
  location: string;
  reportedDate: string;
  assignedTo?: string;
}
```

### User
```typescript
interface User {
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
```

### Communication
```typescript
interface Communication {
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
```

## Frontend Integration

### Example Usage with React

```typescript
// Fetch analytics data
const fetchAnalytics = async (timeframe = '30d') => {
  const response = await fetch(`/api/analytics?timeframe=${timeframe}`);
  const data = await response.json();
  return data;
};

// Search for issues
const searchIssues = async (query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=issues`);
  const data = await response.json();
  return data;
};

// Vote on an issue
const voteOnIssue = async (issueId: number, voteType: 'upvote' | 'downvote') => {
  const response = await fetch(`/api/issues/${issueId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: voteType }),
  });
  const data = await response.json();
  return data;
};
```

## Components

The following React components are available for frontend integration:

- `AnalyticsDashboard` - Complete analytics dashboard with real-time metrics
- `UserManagement` - User management interface with search and filtering
- More components can be created following the same patterns

## Development Notes

1. All API routes use mock data from `/src/data/mockData.ts`
2. TypeScript interfaces are defined in `/src/types/index.ts`
3. API utility functions are available in `/src/lib/api-utils.ts`
4. Client-side API functions can be added to `/src/lib/api-client.ts`

## Next Steps

1. Implement authentication and authorization
2. Connect to a real database instead of mock data
3. Add input validation and sanitization
4. Implement rate limiting and caching
5. Add comprehensive error logging
6. Create automated API tests