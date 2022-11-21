import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  message: string;
  buttons: Array<String>;
  buttonContent: Array<String> = ["No", "Si"];

  constructor(
    public modal: NgbActiveModal
  ) { }
  
  ngOnInit() {
    if (this.buttons != undefined) {
      this.buttonContent = this.buttons;
    }
  }

  cancelar() {
    this.modal.close(false);
  }

  aceptar() {
    this.modal.close(true);
  }
}