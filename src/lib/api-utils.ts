import { NextResponse } from 'next/server';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        [key: string]: string | number | boolean | undefined;
    };
}

export function createSuccessResponse<T>(
    data: T,
    message?: string,
    meta?: ApiResponse<T>['meta'],
    status = 200
) {
    const response: ApiResponse<T> = {
        success: true,
        data,
        ...(message && { message }),
        ...(meta && { meta })
    };

    return NextResponse.json(response, { status });
}

export function createErrorResponse(
    error: string,
    status = 500,
    details?: Record<string, unknown>
) {
    const response: ApiResponse = {
        success: false,
        error,
        ...(details && { details })
    };

    return NextResponse.json(response, { status });
}

export function validateRequiredFields(
    body: Record<string, unknown>,
    requiredFields: string[]
): string[] {
    return requiredFields.filter(field => !body[field]);
}

export function parseQueryParams(searchParams: URLSearchParams) {
    const params: Record<string, string | number> = {};

    searchParams.forEach((value, key) => {
        // Try to parse as number if it looks like one
        if (/^\d+$/.test(value)) {
            params[key] = parseInt(value);
        } else {
            params[key] = value;
        }
    });

    return params;
}