import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-select-editor',
  templateUrl: './cp-select-editor.component.html',
  styleUrls: ['./cp-select-editor.component.scss']
})
export class CpSelectEditorComponent{

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
};

