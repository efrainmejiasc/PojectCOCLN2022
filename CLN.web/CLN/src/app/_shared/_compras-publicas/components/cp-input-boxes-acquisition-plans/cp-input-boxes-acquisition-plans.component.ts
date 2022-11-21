import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-input-boxes-acquisition-plans',
  templateUrl: './cp-input-boxes-acquisition-plans.component.html',
  styleUrls: ['./cp-input-boxes-acquisition-plans.component.scss']
})
export class CpInputBoxesAcquisitionPlansComponent {

  @Input() lista: any[];
  @Input() itemsS: any[];

  @Output() idValueEvent = new EventEmitter<number>();
  @Output() idRemoveEvent = new EventEmitter<number>();

  wrapperActive: boolean = false;

  constructor() { };

  showOptions() {
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(id: number) {
    this.idValueEvent.emit(id);
    this.wrapperActive = false;
  };

  removeItem(id: number) {
    this.idRemoveEvent.emit(id);
    this.wrapperActive = false;
  }
}
