import { expect } from 'chai';
import { NotificationsController } from '../../src/notifications/NotificationsController';
import { NotificationService } from '../../src/notifications/NotificationService';
import { Level } from '../../src/notifications/Notification';
import { ILifecycleControllerScope } from '../../src/util/LifecycleController';

const notification = {
  level: Level.Info,
  message: 'Message',
};

const delay: Delay = (f: () => void, n: number) => f();
const timeout: Timeout = (f: () => void) => f();
const scope: ILifecycleControllerScope = { $on: (e: string, f: () => void) => {} };

describe('NotificationsController', () => {
  it('subscribes to notifications', () => {
    const notifications = new NotificationService(delay);
    const controller = new NotificationsController(scope, notifications, timeout);

    expect(controller.notifications).to.be.empty;

    notifications.publish(notification);

    expect(controller.notifications.length).to.equal(1);
    expect(controller.notifications[0]).to.equal(notification);
  });

  it('unsubscribes on teardown', () => {
    const notifications = new NotificationService(delay);
    const controller = new NotificationsController(scope, notifications, timeout);

    notifications.publish(notification);

    expect(controller.notifications.length).to.equal(1);

    controller.teardown();
    notifications.publish(notification);

    expect(controller.notifications.length).to.equal(1);
  });
});
