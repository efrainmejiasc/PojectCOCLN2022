import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-popup-cambios',
  templateUrl: './popup-cambios.component.html',
  styleUrls: ['./popup-cambios.component.scss']
})
export class PopupCambiosComponent implements OnInit {

  @Input() message:string;
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closePopup(){
    this.close.emit(true);
  }

  closePopupCancelar(){
    this.close.emit(false);
  }
}
