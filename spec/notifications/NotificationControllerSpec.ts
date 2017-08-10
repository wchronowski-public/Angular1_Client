import { expect } from 'chai';
import { NotificationController } from '../../src/notifications/NotificationController';
import { NotificationService } from '../../src/notifications/NotificationService';
import { Notification, Level } from '../../src/notifications/Notification';

const onDismissed = (f: () => void) => f();
const delay: Delay = (f: () => void, n: number) => f();
let notificationService: NotificationService;

describe('NotificationController', () => {
  before(() => {
    notificationService = new NotificationService(delay);
  });

  it('identifies an info notification', () => {
    const notification = { level: Level.Info, message: 'Ok' };
    const controller = new NotificationController({ onDismissed, notification }, notificationService);

    expect(controller.isInfo()).to.equal(true);
  });

  it('identifies a warn notification', () => {
    const notification = { level: Level.Warn, message: 'Ok' };
    const controller = new NotificationController({ onDismissed, notification }, notificationService);

    expect(controller.isWarn()).to.equal(true);
  });

  it('identifies an error notification', () => {
    const notification = { level: Level.Error, message: 'Ok' };
    const controller = new NotificationController({ onDismissed, notification }, notificationService);

    expect(controller.isError()).to.equal(true);
  });

  it('dismisses a notification', () => {
    let notifications: Notification[];
    notificationService.subscribe(ns => notifications = ns);
    const notification = { level: Level.Info, message: 'Ok' };
    notificationService.publish(notification);
    const controller = new NotificationController({ onDismissed, notification }, notificationService);

    expect(notifications.length).to.equal(1);

    controller.dismiss();

    expect(controller.isDismissing()).to.equal(true);
    expect(notifications.length).to.equal(0);
  });

  it('dismisses when the notification expires', () => {
    let notifications: Notification[];
    notificationService.subscribe(ns => notifications = ns);
    const notification = { level: Level.Info, message: 'Ok' };
    notificationService.publish(notification);
    const controller = new NotificationController({ onDismissed, notification }, notificationService);

    expect(notifications.length).to.equal(1);

    notificationService.expire(notification);

    expect(controller.isDismissing()).to.equal(true);
    expect(notifications.length).to.equal(0);
  });
});
