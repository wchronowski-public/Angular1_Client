import { NotificationService, NOTIFICATION_SERVICE } from './NotificationService';
import { Notification } from './Notification';
import { Inject } from '../util/Inject';
import { LifecycleController, ILifecycleControllerScope } from '../util/LifecycleController';

@Inject('$scope', NOTIFICATION_SERVICE, '$timeout')
export class NotificationsController extends LifecycleController {
  public notifications: Notification[] = [];
  private subscription: string;

  constructor(private $scope: ILifecycleControllerScope, private notificationService: NotificationService, private timeout: Timeout) {
    super($scope);
    this.subscription = notificationService.subscribe(this.update.bind(this));
  }

  public teardown(): void {
    this.notificationService.unsubscribe(this.subscription);
  }

  private update(notifications: Notification[]): void {
    this.timeout(() => {
      this.notifications = notifications;
    });
  }
}
