'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import { users as mockUsers } from '@/data/mockData';

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('');

    // Filter users based on search and role
    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user => {
            const matchesSearch = !searchTerm ||
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = !selectedRole || user.role === selectedRole;

            return matchesSearch && matchesRole;
        });
    }, [searchTerm, selectedRole]);

    const handleRoleFilter = (role: string) => {
        setSelectedRole(role === selectedRole ? '' : role);
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
                {filteredUsers.map((user) => (
                    <Card key={user.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-semibold text-gray-600">
                                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                                    </span>
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

            {filteredUsers.length === 0 && (
                <Card className="p-8 text-center">
                    <div className="text-gray-500">
                        No users found matching your criteria.
                    </div>
                </Card>
            )}

            {/* Results summary */}
            <div className="flex justify-center">
                <div className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {mockUsers.length} users
                </div>
            </div>
        </div>
    );
}
