import { Injectable, EventEmitter } from '@angular/core';
import Swal from "sweetalert2";
import { NotificationType, Notifier,Notification } from '../_model/structures';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  OnConfirmAnswer = new EventEmitter<boolean>();
  
  constructor() { }

  public notifier = new Notifier();

  public notify(message: string, notificationType: NotificationType, duration: number = 8000): void {

    const notification: Notification = new Notification(message, notificationType);

    const dismissWait = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };

    this.notifier.add(notification);

    dismissWait();
  }

  public fireMessage(titleValue: string, deletedResult: string) {
    Swal.fire({
      title: titleValue,
      text: `${deletedResult}`,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      buttonsStyling: false,
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        header: 'header-class',
        title: 'title-class text-white',
        closeButton: 'close-button-class',
        icon: 'icon-class',
        image: 'image-class',
        content: 'content-class',
        input: 'input-class',
        actions: 'actions-class',
        confirmButton: 'btn-confirm-class',
        cancelButton: 'cancel-button-class',
        footer: 'footer-class'
      }
    });
  }

  changeConfirm(){
    // this.theConfirm = true;
    // console.log(this.theConfirm);
    // this.changeOnConfirm.emit(this.theConfirm)
  }

  public fireMessageConfirm(msg : string){
    Swal.fire({
      title: "",
      html: msg,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      buttonsStyling: false,
      customClass: {
        container: 'container-class',
        popup: 'popup-class',
        header: 'header-class',
        title: 'title-class text-white',
        closeButton: 'close-button-class',
        icon: 'icon-class',
        image: 'image-class',
        content: 'content-class',
        input: 'input-class',
        actions: 'actions-class',
        confirmButton: 'btn-confirm-class',
        cancelButton: 'cancel-button-class',
        footer: 'footer-class'
      }
    })
    .then((result) => {
      this.OnConfirmAnswer.emit(result.value as boolean);        
    });
  }
}