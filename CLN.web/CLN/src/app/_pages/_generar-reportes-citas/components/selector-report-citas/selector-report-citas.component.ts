import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selector-report-citas',
  templateUrl: './selector-report-citas.component.html',
  styleUrls: ['./selector-report-citas.component.scss']
})
export class SelectorReportCitasComponent{

  @Input() lista:any[];
  @Input() itemS: any;

  
  @Output() idValueEvent = new EventEmitter<string>();

  wrapperActive:boolean = false;

  constructor() {};

  showOptions(){
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(id: string) {
    this.idValueEvent.emit(id);
    this.wrapperActive = false;
  };
}
