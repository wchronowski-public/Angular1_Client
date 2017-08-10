import { Notification, Level } from './Notification';
import { NotificationService, NOTIFICATION_SERVICE } from './NotificationService';
import { Inject } from '../util/Inject';

interface INotificationScope {
  notification: Notification;
  onDismissed(f: () => void): void;
}

@Inject('$scope', NOTIFICATION_SERVICE)
export class NotificationController {
  public notification: Notification;
  private _isDismissing: boolean = false;

  constructor(private scope: INotificationScope, private notificationService: NotificationService) {
    this.notification = scope.notification;
    notificationService.onExpiration(scope.notification, this.dismiss.bind(this));
  }

  public dismiss(): void {
    this._isDismissing = true;
    this.scope.onDismissed(() => {
      this.notificationService.remove(this.notification);
    });
  }

  public isDismissing(): boolean {
    return this._isDismissing;
  }

  public isInfo(): boolean {
    return this.notification.level === Level.Info;
  }

  public isWarn(): boolean {
    return this.notification.level === Level.Warn;
  }

  public isError(): boolean {
    return this.notification.level === Level.Error;
  }
}
