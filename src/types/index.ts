export type AlertPriority = 'high' | 'medium' | 'low';
export type RuleType = 'patient' | 'stock' | 'financial' | 'medical' | 'other';
export type TriggerType = 'event' | 'condition' | 'ai';
export type NotificationChannel = 'email' | 'sms' | 'push' | 'dashboard';
export type AlertStatus = 'open' | 'resolved' | 'in_progress';

export interface Alert {
  id: string;
  title: string;
  type: RuleType;
  priority: AlertPriority;
  status: AlertStatus;
  description: string;
  context: string;
  eventData: Record<string, any>;
  suggestedAction: string;
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  resolutionComment?: string;
}

export interface Rule {
  id: string;
  name: string;
  type: RuleType;
  status: 'active' | 'inactive';
  triggerType: TriggerType;
  condition?: string;
  notificationChannels: NotificationChannel[];
  responsibleUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KPI {
  totalAlerts: number;
  averageResolutionTime: number; // in hours
  openToday: number;
  alertsByPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

