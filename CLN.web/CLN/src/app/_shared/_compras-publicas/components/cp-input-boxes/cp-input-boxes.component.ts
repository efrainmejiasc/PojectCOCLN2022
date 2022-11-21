import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-input-boxes',
  templateUrl: './cp-input-boxes.component.html',
  styleUrls: ['./cp-input-boxes.component.scss']
})
export class CpInputBoxesComponent{

  @Input() lista:any[];
  @Input() itemsS:any[];
  @Input() showAlert:boolean;
  @Input() showId:boolean = false;
  @Input() disabled = false;
  @Input() textoAlerta = 'Selecciona una o varias opción(es)';

  @Output() idValueEvent = new EventEmitter<number>();
  @Output() idRemoveEvent = new EventEmitter<number>();
  @Output() show = new EventEmitter<any>();

  @Input() wrapperActive:boolean = false;
  showAlertInfo:boolean = false;

  constructor() {};

  showOptions(){
    // this.wrapperActive = !this.wrapperActive;
    if( !this.disabled ) this.show.emit();
  };

  selectChangeHandler(id:number){
    this.idValueEvent.emit(id);
    this.wrapperActive = false;
  };

  removeItem(id:number){
    this.idRemoveEvent.emit(id);
    this.wrapperActive = false;
  }

  handleAlertInfo(){
    this.showAlertInfo = true;
  }

  closeAlertInfo(){
    this.showAlertInfo = false;
  }
};
