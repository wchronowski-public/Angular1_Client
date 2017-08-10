import { expect } from 'chai';
import { NotificationService } from '../../src/notifications/NotificationService';
import { Notification, Level } from '../../src/notifications/Notification';

const notification: Notification = {
  level: Level.Info,
  message: 'A message',
};

const delay: Delay = (f: () => void, n: number) => f();

describe('NotificationService', () => {
  it('publishes notifications to a subscriber', () => {
    const notifications = new NotificationService(delay);
    let received: Notification[];
    notifications.subscribe(ns => received = ns);

    notifications.publish(notification);

    expect(received.length).to.equal(1);
    expect(received[0]).to.equal(notification);
  });

  it('publishes notifications on subscribe', () => {
    const notifications = new NotificationService(delay);
    let received: Notification[];
    notifications.publish(notification);

    notifications.subscribe(ns => received = ns);

    expect(received.length).to.equal(1);
    expect(received[0]).to.equal(notification);
  });

  it('publishes notifications to multiple subscribers', () => {
    const notifications = new NotificationService(delay);
    let subA: Notification[];
    let subB: Notification[];
    notifications.subscribe(ns => subA = ns);
    notifications.subscribe(ns => subB = ns);

    notifications.publish(notification);

    expect(subA.length).to.equal(1);
    expect(subA[0]).to.equal(notification);
    expect(subB.length).to.equal(1);
    expect(subB[0]).to.equal(notification);
  });

  it('removes a notification', () => {
    const notifications = new NotificationService(delay);
    const notification2 = {
      level: Level.Info,
      message: 'Something',
    };
    let received: Notification[];
    notifications.subscribe(ns => received = ns);
    notifications.publish(notification);
    notifications.publish(notification2);
    notifications.remove(notification);

    expect(received.length).to.equal(1);
    expect(received[0]).to.equal(notification2);
  });

  it('unsubscribes a subscriber', () => {
    const notifications = new NotificationService(delay);
    let received: Notification[];
    const subscription = notifications.subscribe(ns => received = ns);

    notifications.publish(notification);

    expect(received.length).to.equal(1);

    notifications.unsubscribe(subscription);
    notifications.publish(notification);

    expect(received.length).to.equal(1);
  });

  it('expires a notification', () => {
    const notifications = new NotificationService(delay);
    notifications.publish(notification);
    let expired: Notification;
    notifications.onExpiration(notification, n => expired = n);

    notifications.expire(notification);

    expect(expired).to.eq(notification);
  });

  it('removes a notification on expiration when no expiration handlers are registered', () => {
    const notifications = new NotificationService(delay);
    let received: Notification[];
    notifications.subscribe(ns => received = ns);
    notifications.publish(notification);

    expect(received.length).to.eq(1);

    notifications.expire(notification);

    expect(received.length).to.eq(0);
  });

  it('schedules expiration for an auto expiring notification when published', () => {
    const notification = {
      level: Level.Info,
      message: 'Something',
      isExpiring: true,
    };
    let delayed: () => void;
    let delayedFor: number;
    const delay = (f: () => void, n: number) => {
      delayed = f;
      delayedFor = n;
    };
    const notifications = new NotificationService(delay);
    let expired: Notification;
    notifications.publish(notification);
    notifications.onExpiration(notification, n => expired = n);

    expect(delayedFor).to.equal(3000);
    expect(expired).to.be.undefined;

    delayed();

    expect(expired).to.eq(notification);
  });
});
