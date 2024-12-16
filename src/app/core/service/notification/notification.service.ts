import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this._notifications$.asObservable();

  constructor() {}

  addNotification(message: string, type: 'success' | 'error'): void {
    const newNotification: Notification = { message, type };
    const currentNotifications = this._notifications$.getValue();
    this._notifications$.next([newNotification,...currentNotifications ]);

    setTimeout(() => {
      this.removeNotification(newNotification);
    }, 7000);
  }

  removeNotification(notificationToRemove: Notification): void {
    const updatedNotifications = this._notifications$
      .getValue()
      .filter(notification => notification !== notificationToRemove);
    this._notifications$.next(updatedNotifications);
  }
}

export interface Notification {
  message: string;
  type: 'success' | 'error';
}