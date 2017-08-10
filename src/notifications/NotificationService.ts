import * as UUID from 'node-uuid';
import * as Immutable from 'immutable';
import { Notification } from './Notification';
import { Inject } from '../util/Inject';

export const NOTIFICATION_SERVICE = 'notificationService';

@Inject('$timeout')
export class NotificationService {
  private subscriptions: Immutable.Map<string, Action<Notification[]>> = Immutable.Map<string, Action<Notification[]>>();
  private expirations: Immutable.Map<Notification, Action<Notification>[]> = Immutable.Map<Notification, Action<Notification>[]>();
  private notifications: Immutable.List<Notification> = Immutable.List<Notification>();

  constructor(private delay: Delay) {}

  public publish(notification: Notification): void {
    this.notifications = this.notifications.push(notification);
    if (notification.isExpiring) {
      this.delay(() => this.expire(notification), 3000);
    }
    this.subscriptions.map(f => f(this.notifications.toArray()));
  }

  public subscribe(listener: Action<Notification[]>): string {
    const subscriptionId = UUID.v4();
    this.subscriptions = this.subscriptions.set(subscriptionId, listener);
    listener(this.notifications.toArray());
    return subscriptionId;
  }

  public unsubscribe(subscriptionId: string): void {
    this.subscriptions = this.subscriptions.remove(subscriptionId);
  }

  public remove(notification: Notification): void {
    this.notifications = this.notifications.filterNot(n => n === notification).toList();
    this.expirations = this.expirations.remove(notification);
    this.subscriptions.map(f => f(this.notifications.toArray()));
  }

  public onExpiration(notification: Notification, handler: Action<Notification>): void {
    this.expirations = this.expirations.set(notification, this.expirations.get(notification, []).concat([handler]));
  }

  public expire(notification: Notification): void {
    this.expirations.get(notification, [n => this.remove(n)]).map(f => f(notification));
  }
}
