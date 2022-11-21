import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-select-empresas',
  templateUrl: './cp-select-empresas.component.html',
  styleUrls: ['./cp-select-empresas.component.scss']
})
export class CpSelectEmpresasComponent {

  @Input() lista:any[];
  @Input() itemS:string;

  @Output() idValueEvent = new EventEmitter<string>();

  wrapperActive:boolean = false;

  constructor() {};

  showOptions(){
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(empresa: any){
    this.idValueEvent.emit(empresa);
    this.wrapperActive = false;
  };

}
