interface StatusBadgeProps {
    status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    const colors: Record<string, string> = {
        'new': 'bg-blue-100 text-blue-800',
        'acknowledged': 'bg-yellow-100 text-yellow-800',
        'assigned': 'bg-purple-100 text-purple-800',
        'in-progress': 'bg-orange-100 text-orange-800',
        'resolved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800',
        'active': 'bg-green-100 text-green-800',
        'flagged': 'bg-red-100 text-red-800'
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status.replace('-', ' ').toUpperCase()}
        </span>
    );
};

interface PriorityIndicatorProps {
    priority: number;
}

export const PriorityIndicator = ({ priority }: PriorityIndicatorProps) => {
    const color = priority >= 8 ? 'text-red-500' : priority >= 6 ? 'text-yellow-500' : 'text-green-500';
    return <span className={`font-semibold ${color}`}>{priority}/10</span>;
};
