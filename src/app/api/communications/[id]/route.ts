import { NextRequest, NextResponse } from 'next/server';
import { messages } from '@/data/mockData';

// GET /api/communications/[id] - Get specific message
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const messageId = parseInt(params.id);
        const message = messages.find(m => m.id === messageId);

        if (!message) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: message
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Invalid message ID' },
            { status: 400 }
        );
    }
}

// PUT /api/communications/[id] - Update specific message
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const messageId = parseInt(params.id);
        const messageIndex = messages.findIndex(m => m.id === messageId);

        if (messageIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const updatedMessage = { ...messages[messageIndex], ...body };

        // Update sentAt timestamp if status changes to sent
        if (body.status === 'sent' && messages[messageIndex].status !== 'sent') {
            updatedMessage.sentAt = new Date().toISOString();
        }

        // In a real app, you'd update in database here
        messages[messageIndex] = updatedMessage;

        return NextResponse.json({
            success: true,
            data: updatedMessage,
            message: 'Message updated successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to update message' },
            { status: 500 }
        );
    }
}

// POST /api/communications/[id]/send - Send a specific message
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const messageId = parseInt(params.id);
        const messageIndex = messages.findIndex(m => m.id === messageId);

        if (messageIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            );
        }

        if (messages[messageIndex].status === 'sent') {
            return NextResponse.json(
                { success: false, error: 'Message already sent' },
                { status: 400 }
            );
        }

        // Update message status to sent
        messages[messageIndex].status = 'sent';
        messages[messageIndex].sentAt = new Date().toISOString();

        return NextResponse.json({
            success: true,
            data: messages[messageIndex],
            message: 'Message sent successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to send message' },
            { status: 500 }
        );
    }
}