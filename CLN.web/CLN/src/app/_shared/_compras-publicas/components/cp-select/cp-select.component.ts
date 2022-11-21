import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-select',
  templateUrl: './cp-select.component.html',
  styleUrls: ['./cp-select.component.scss']
})
export class CpSelectComponent{

  @Input() lista:any[];
  @Input() itemS:any;

  @Output() idValueEvent = new EventEmitter<number>();

  wrapperActive:boolean = false;

  constructor() {};

  showOptions(){
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(id:number){
    this.idValueEvent.emit(id);
    this.wrapperActive = false;
  };
};

