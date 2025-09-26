import { NextRequest, NextResponse } from 'next/server';
import { issues } from '@/data/mockData';
import { Issue } from '@/types';

// GET /api/issues - Get all issues with optional filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const department = searchParams.get('department');
        const priority = searchParams.get('priority');
        const limit = searchParams.get('limit');

        let filteredIssues = [...issues];

        // Apply filters
        if (status) {
            filteredIssues = filteredIssues.filter(issue => issue.status === status);
        }

        if (department) {
            filteredIssues = filteredIssues.filter(issue =>
                issue.department.toLowerCase().includes(department.toLowerCase())
            );
        }

        if (priority) {
            const minPriority = parseInt(priority);
            filteredIssues = filteredIssues.filter(issue => issue.priority >= minPriority);
        }

        // Apply limit
        if (limit) {
            filteredIssues = filteredIssues.slice(0, parseInt(limit));
        }

        return NextResponse.json({
            success: true,
            data: filteredIssues,
            total: filteredIssues.length,
            filters: { status, department, priority, limit }
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch issues' },
            { status: 500 }
        );
    }
}

// POST /api/issues - Create new issue
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['title', 'description', 'location', 'department'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                    missingFields
                },
                { status: 400 }
            );
        }

        const newIssue: Issue = {
            id: Math.max(...issues.map(i => i.id)) + 1,
            title: body.title,
            description: body.description,
            location: body.location,
            department: body.department,
            status: 'new',
            priority: body.priority || 5,
            upvotes: 0,
            reportedDate: new Date().toISOString(),
            assignedTo: null
        };

        // In a real app, you'd save to database here
        issues.push(newIssue);

        return NextResponse.json({
            success: true,
            data: newIssue,
            message: 'Issue created successfully'
        }, { status: 201 });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to create issue' },
            { status: 500 }
        );
    }
}