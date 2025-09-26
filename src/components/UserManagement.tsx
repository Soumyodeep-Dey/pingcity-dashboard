'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';

interface UsersApiResponse {
    success: boolean;
    data: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = React.useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                ...(searchTerm && { search: searchTerm }),
                ...(selectedRole && { role: selectedRole })
            });

            const response = await fetch(`/api/users?${params}`);
            const data: UsersApiResponse = await response.json();

            if (data.success) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, selectedRole]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleRoleFilter = (role: string) => {
        setSelectedRole(role === selectedRole ? '' : role);
        setCurrentPage(1);
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'staff':
                return 'bg-blue-100 text-blue-800';
            case 'citizen':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage users, roles, and permissions</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['admin', 'staff', 'citizen'].map((role) => (
                        <Button
                            key={role}
                            variant={selectedRole === role ? 'default' : 'outline'}
                            onClick={() => handleRoleFilter(role)}
                            className="capitalize"
                        >
                            {role}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
                {users.map((user) => (
                    <Card key={user.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ) : (
                                        <span className="text-lg font-semibold text-gray-600">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Badge className={getRoleBadgeColor(user.role)}>
                                            {user.role}
                                        </Badge>
                                        <Badge className={getStatusBadgeColor(user.status)}>
                                            {user.status}
                                        </Badge>
                                        {user.department && (
                                            <span className="text-sm text-gray-500">
                                                {user.department}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-600">
                                    ⭐ {user.reputation}/5
                                </div>
                                <div className="text-sm text-gray-600">
                                    {user.totalReports} reports
                                </div>
                                <div className="text-sm text-gray-500">
                                    Last login: {user.lastLogin}
                                </div>
                            </div>
                        </div>

                        {/* Permissions */}
                        {user.permissions && user.permissions.length > 0 && (
                            <div className="mt-4 pt-4 border-t">
                                <div className="text-sm text-gray-600 mb-2">Permissions:</div>
                                <div className="flex flex-wrap gap-1">
                                    {user.permissions.map((permission, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {permission.replace('_', ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {users.length === 0 && !loading && (
                <Card className="p-8 text-center">
                    <div className="text-gray-500">
                        No users found matching your criteria.
                    </div>
                </Card>
            )}

            {/* Pagination placeholder */}
            <div className="flex justify-center">
                <div className="text-sm text-gray-500">
                    Showing {users.length} users
                </div>
            </div>
        </div>
    );
}