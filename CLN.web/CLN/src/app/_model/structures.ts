export class IDictionary {
    [key: number]: string;
};

export class Item {
    name: any;
    value: any;
    type?: number|null;
    constructor(name: string, value: string){
        this.name = name;
        this.value = value;
    }
}

export enum NotificationType {
    Accept = 1,
    Fail = 2,
  }
  
export class Notification {
  
    public message: string;
    public type: NotificationType;
  
    constructor(message: string, type: NotificationType | null) {
      this.message = message;
      this.type = type;
    }
  }
  
  
export class Notifier {
  
    public notifications: Notification[] = [];
  
    public destroy(notification: Notification): void {
      this.notifications.splice(this.notifications.indexOf(notification), 1);
    }
  /**
   * Inserts new elements at the start of an array notifications
   * @param notification 
   */
    public add(notification: Notification): void {
      this.notifications.unshift(notification);
    }
}