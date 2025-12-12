import { AlertPriority } from '@/types';

interface PriorityBadgeProps {
  priority: AlertPriority;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const classes = {
    high: `fluap-badge-high ${sizeClasses[size]}`,
    medium: `fluap-badge-medium ${sizeClasses[size]}`,
    low: `fluap-badge-low ${sizeClasses[size]}`,
  };

  const labels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
  };

  return (
    <span className={classes[priority]}>
      {labels[priority]}
    </span>
  );
}

