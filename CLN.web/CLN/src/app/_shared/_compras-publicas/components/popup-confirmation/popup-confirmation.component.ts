import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-confirmation',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.scss']
})
export class PopupConfirmationComponent implements OnInit {

  @Input() message:string;
  @Input() title:string = 'ACEPTAR';
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closePopup(){
    this.close.emit(true);
  }
}
