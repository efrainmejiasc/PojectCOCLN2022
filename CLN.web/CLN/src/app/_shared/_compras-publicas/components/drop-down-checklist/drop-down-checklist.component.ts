import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down-checklist',
  templateUrl: './drop-down-checklist.component.html',
  styleUrls: ['./drop-down-checklist.component.scss']
})
export class DropDownCheckListComponent {

  @Input() lista:any[];
  @Input() itemsS:any[];
  @Input() title:string;
  @Input() onClick:string;

  @Output() idValueEvent = new EventEmitter<number>();
  @Output() idRemoveEvent = new EventEmitter<number>();

  wrapperActive:boolean = false;

  constructor() {};

  showOptions(){
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(id:number){
    this.idValueEvent.emit(id);
    // this.wrapperActive = false;
  };

  removeItem(id:number){
    this.idRemoveEvent.emit(id);
    this.wrapperActive = false;
  }

}
