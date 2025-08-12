// LinkedIn Webhook Integration for XSigma
// Handles real-time events and notifications from LinkedIn

export interface LinkedInWebhookEvent {
  eventType: 'profile_update' | 'post_engagement' | 'connection_request' | 'message_received' | 'company_update';
  timestamp: string;
  data: any;
  userId?: string;
  companyId?: string;
}

export interface LinkedInNotification {
  id: string;
  type: 'engagement' | 'connection' | 'mention' | 'message' | 'milestone';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: any;
}

class LinkedInWebhookService {
  private eventListeners: Map<string, Function[]> = new Map();
  private notifications: LinkedInNotification[] = [];
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor() {
    this.initializeWebSocket();
    this.loadStoredNotifications();
  }

  // WebSocket connection for real-time events
  private initializeWebSocket() {
    if (typeof window === 'undefined') return;

    const wsUrl = process.env.REACT_APP_LINKEDIN_WEBHOOK_URL || 'ws://localhost:8080/linkedin-webhooks';
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('LinkedIn webhook connection established');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit('connection', { status: 'connected' });
      };

      ws.onmessage = (event) => {
        try {
          const webhookEvent: LinkedInWebhookEvent = JSON.parse(event.data);
          this.handleWebhookEvent(webhookEvent);
        } catch (error) {
          console.error('Error parsing webhook event:', error);
        }
      };

      ws.onclose = () => {
        console.log('LinkedIn webhook connection closed');
        this.isConnected = false;
        this.emit('connection', { status: 'disconnected' });
        this.attemptReconnect();
      };

      ws.onerror = (error) => {
        console.error('LinkedIn webhook error:', error);
        this.emit('error', { error });
      };

    } catch (error) {
      console.error('Failed to initialize LinkedIn webhook connection:', error);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
      
      setTimeout(() => {
        console.log(`Attempting to reconnect to LinkedIn webhooks (attempt ${this.reconnectAttempts})`);
        this.initializeWebSocket();
      }, delay);
    }
  }

  // Event handling
  private handleWebhookEvent(event: LinkedInWebhookEvent) {
    console.log('Received LinkedIn webhook event:', event);

    // Create notification based on event type
    const notification = this.createNotificationFromEvent(event);
    if (notification) {
      this.addNotification(notification);
    }

    // Emit event to listeners
    this.emit(event.eventType, event);
    this.emit('any', event);
  }

  private createNotificationFromEvent(event: LinkedInWebhookEvent): LinkedInNotification | null {
    const baseNotification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: event.timestamp,
      read: false,
    };

    switch (event.eventType) {
      case 'post_engagement':
        return {
          ...baseNotification,
          type: 'engagement',
          title: 'New Post Engagement',
          message: `Your post received ${event.data.engagementType} from ${event.data.actorName}`,
          actionUrl: event.data.postUrl,
          metadata: event.data
        };

      case 'connection_request':
        return {
          ...baseNotification,
          type: 'connection',
          title: 'New Connection Request',
          message: `${event.data.requesterName} wants to connect with you`,
          actionUrl: `/linkedin/connections/pending`,
          metadata: event.data
        };

      case 'message_received':
        return {
          ...baseNotification,
          type: 'message',
          title: 'New LinkedIn Message',
          message: `Message from ${event.data.senderName}: ${event.data.preview}`,
          actionUrl: `/linkedin/messages/${event.data.conversationId}`,
          metadata: event.data
        };

      case 'profile_update':
        return {
          ...baseNotification,
          type: 'milestone',
          title: 'Profile Milestone',
          message: `Your profile reached ${event.data.milestone} views this month!`,
          actionUrl: `/linkedin/analytics`,
          metadata: event.data
        };

      default:
        return null;
    }
  }

  // Event listener management
  on(eventType: string, callback: Function) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(callback);
  }

  off(eventType: string, callback: Function) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(eventType: string, data: any) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      listeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  // Notification management
  private addNotification(notification: LinkedInNotification) {
    this.notifications.unshift(notification);
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    this.saveNotifications();
    this.emit('notification', notification);
  }

  getNotifications(): LinkedInNotification[] {
    return this.notifications;
  }

  getUnreadNotifications(): LinkedInNotification[] {
    return this.notifications.filter(n => !n.read);
  }

  markNotificationAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveNotifications();
      this.emit('notification_read', notification);
    }
  }

  markAllNotificationsAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.saveNotifications();
    this.emit('all_notifications_read', {});
  }

  clearNotifications() {
    this.notifications = [];
    this.saveNotifications();
    this.emit('notifications_cleared', {});
  }

  private saveNotifications() {
    try {
      localStorage.setItem('linkedin_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }

  private loadStoredNotifications() {
    try {
      const stored = localStorage.getItem('linkedin_notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading stored notifications:', error);
      this.notifications = [];
    }
  }

  // Analytics and insights
  getEngagementInsights(): {
    totalEngagements: number;
    engagementTypes: Record<string, number>;
    topPerformingPosts: any[];
    engagementTrend: any[];
  } {
    const engagementNotifications = this.notifications.filter(n => n.type === 'engagement');
    
    const engagementTypes = engagementNotifications.reduce((acc, notification) => {
      const type = notification.metadata?.engagementType || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEngagements: engagementNotifications.length,
      engagementTypes,
      topPerformingPosts: [], // Would be populated with actual post data
      engagementTrend: [] // Would be populated with time-series data
    };
  }

  getConnectionInsights(): {
    totalRequests: number;
    acceptanceRate: number;
    topIndustries: string[];
    connectionTrend: any[];
  } {
    const connectionNotifications = this.notifications.filter(n => n.type === 'connection');
    
    return {
      totalRequests: connectionNotifications.length,
      acceptanceRate: 0.85, // Mock data - would be calculated from actual data
      topIndustries: ['Financial Services', 'Technology', 'Consulting'],
      connectionTrend: []
    };
  }

  // Webhook configuration
  async configureWebhooks(config: {
    events: string[];
    callbackUrl: string;
    secret?: string;
  }): Promise<boolean> {
    try {
      // In a real implementation, this would call LinkedIn's webhook configuration API
      console.log('Configuring LinkedIn webhooks:', config);
      
      // Mock successful configuration
      return true;
    } catch (error) {
      console.error('Error configuring webhooks:', error);
      return false;
    }
  }

  // Status and health
  isWebhookConnected(): boolean {
    return this.isConnected;
  }

  getConnectionStatus(): {
    connected: boolean;
    reconnectAttempts: number;
    lastError?: string;
  } {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  // Cleanup
  disconnect() {
    this.isConnected = false;
    this.eventListeners.clear();
    // WebSocket cleanup would happen here
  }
}

// Export singleton instance
export const linkedinWebhooks = new LinkedInWebhookService();

// Export utility functions
export const linkedinWebhookUtils = {
  // Format notification for display
  formatNotification(notification: LinkedInNotification): {
    title: string;
    message: string;
    timeAgo: string;
    icon: string;
    color: string;
  } {
    const timeAgo = this.getTimeAgo(new Date(notification.timestamp));
    
    const typeConfig = {
      engagement: { icon: '👍', color: 'blue' },
      connection: { icon: '🤝', color: 'green' },
      mention: { icon: '💬', color: 'purple' },
      message: { icon: '📩', color: 'blue' },
      milestone: { icon: '🎉', color: 'yellow' }
    };

    const config = typeConfig[notification.type] || { icon: '📢', color: 'gray' };

    return {
      title: notification.title,
      message: notification.message,
      timeAgo,
      icon: config.icon,
      color: config.color
    };
  },

  // Calculate time ago
  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  },

  // Group notifications by type
  groupNotificationsByType(notifications: LinkedInNotification[]): Record<string, LinkedInNotification[]> {
    return notifications.reduce((acc, notification) => {
      if (!acc[notification.type]) {
        acc[notification.type] = [];
      }
      acc[notification.type].push(notification);
      return acc;
    }, {} as Record<string, LinkedInNotification[]>);
  },

  // Generate notification summary
  generateSummary(notifications: LinkedInNotification[]): string {
    const unread = notifications.filter(n => !n.read);
    if (unread.length === 0) return 'No new notifications';
    
    const types = this.groupNotificationsByType(unread);
    const summary = Object.entries(types)
      .map(([type, items]) => `${items.length} ${type}${items.length > 1 ? 's' : ''}`)
      .join(', ');
    
    return `${unread.length} new: ${summary}`;
  }
};

export default linkedinWebhooks;
