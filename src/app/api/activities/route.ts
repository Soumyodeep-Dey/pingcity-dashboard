import { NextRequest, NextResponse } from 'next/server';
import { recentActivity } from '@/data/mockData';

// GET /api/activities - Get recent activities
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '10';
        const department = searchParams.get('department');

        let filteredActivities = [...recentActivity];

        // Filter by department if specified
        if (department) {
            filteredActivities = filteredActivities.filter(activity =>
                activity.dept.toLowerCase().includes(department.toLowerCase())
            );
        }

        // Apply limit
        const limitedActivities = filteredActivities.slice(0, parseInt(limit));

        return NextResponse.json({
            success: true,
            data: limitedActivities,
            total: filteredActivities.length,
            filters: { limit, department }
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch activities' },
            { status: 500 }
        );
    }
}

// POST /api/activities - Add new activity log
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const requiredFields = ['user', 'action', 'dept'];
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

        const newActivity = {
            id: Math.max(...recentActivity.map(a => a.id)) + 1,
            user: body.user,
            action: body.action,
            dept: body.dept,
            time: new Date().toLocaleString()
        };

        // In a real app, you'd save to database here
        recentActivity.unshift(newActivity);

        return NextResponse.json({
            success: true,
            data: newActivity,
            message: 'Activity logged successfully'
        }, { status: 201 });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to log activity' },
            { status: 500 }
        );
    }
}