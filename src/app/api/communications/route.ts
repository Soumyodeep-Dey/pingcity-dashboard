import { NextRequest, NextResponse } from 'next/server';
import { messages, communications } from '@/data/mockData';
import { Message } from '@/types';

// GET /api/communications - Get all communications
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const status = searchParams.get('status');
        const limit = searchParams.get('limit');

        let filteredMessages = [...messages];
        let filteredCommunications = [...communications];

        // Filter messages
        if (type) {
            filteredMessages = filteredMessages.filter(msg => msg.type === type);
        }
        if (status) {
            filteredMessages = filteredMessages.filter(msg => msg.status === status);
        }

        // Apply limit
        if (limit) {
            const limitNum = parseInt(limit);
            filteredMessages = filteredMessages.slice(0, limitNum);
            filteredCommunications = filteredCommunications.slice(0, limitNum);
        }

        // Calculate communication statistics
        const stats = {
            totalMessages: messages.length,
            sentMessages: messages.filter(m => m.status === 'sent').length,
            draftMessages: messages.filter(m => m.status === 'draft').length,
            scheduledMessages: messages.filter(m => m.status === 'scheduled').length,
            totalEngagement: communications.reduce((acc, comm) => acc + comm.engagement.views, 0),
            averageReadRate: messages.filter(m => m.status === 'sent').length > 0
                ? messages.reduce((acc, msg) => acc + msg.readBy.length, 0) / messages.filter(m => m.status === 'sent').length
                : 0
        };

        return NextResponse.json({
            success: true,
            data: {
                messages: filteredMessages,
                communications: filteredCommunications
            },
            stats,
            filters: { type, status, limit }
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch communications' },
            { status: 500 }
        );
    }
}

// POST /api/communications - Create new message
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['title', 'content', 'type', 'sender', 'recipients'];
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

        const newMessage: Message = {
            id: Math.max(...messages.map(m => m.id)) + 1,
            type: body.type,
            title: body.title,
            content: body.content,
            sender: body.sender,
            recipients: body.recipients,
            status: body.status || 'draft',
            priority: body.priority || 'medium',
            createdAt: new Date().toISOString(),
            readBy: [],
            channels: body.channels || ['in-app'],
            ...(body.scheduledAt && { scheduledAt: body.scheduledAt }),
            ...(body.status === 'sent' && { sentAt: new Date().toISOString() })
        };

        // In a real app, you'd save to database here
        messages.push(newMessage);

        return NextResponse.json({
            success: true,
            data: newMessage,
            message: 'Communication created successfully'
        }, { status: 201 });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to create communication' },
            { status: 500 }
        );
    }
}