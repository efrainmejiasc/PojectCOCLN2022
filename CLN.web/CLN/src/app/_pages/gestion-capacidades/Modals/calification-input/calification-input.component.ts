import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { calificationLimit } from 'src/app/_model/capacidad/calificationLimit.model';

@Component({
  selector: 'app-calification-input',
  templateUrl: './calification-input.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './calification-input.component.scss']
})
export class CalificationInputComponent implements OnInit, OnChanges {

  public calificationAction: boolean = false;
  constructor() { }
  public valorNota: number;
  public indexInput: number;
  @Input() initInject: calificationLimit;  
  @Input() calification: number;
  @Input() closeActionByOutsideClick: any;
  @Input() index: number;
  ngOnChanges(changes: SimpleChanges) {
    const calification = changes["calification"];
    const changeEvent = changes["closeActionByOutsideClick"];
    const changeIndex = changes["index"];
    const changeInit = changes["initInject"];
    if (calification && calification.currentValue != undefined) {
      this.valorNota = calification.currentValue;
    }
    if (changeInit && changeInit.currentValue != undefined) {
      this.buildCalification(changeInit.currentValue);
    }
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (changeIndex && changeIndex.currentValue) {
      this.indexInput = changeIndex.currentValue;
    }
  }
  ngOnInit() {
  }
  public listCalifications: Array<any> = []
  private buildCalification(data: calificationLimit) {
    var init:number = 1;
    var final:number = 10;
    for (var i = init; i <= final; i++) {
      this.listCalifications.push(i)
    }
  }

  @Output() resultValue = new EventEmitter<number>();
  public selectValue(value) {
    this.calificationAction = false;
    this.resultValue.emit(value);
  }
  @ViewChild("loop", { static: false }) loop: ElementRef;
  openLoop() {
    (this.loop.nativeElement.style.display == "none" || this.loop.nativeElement.style.display == "") ? this.loop.nativeElement.style.display = "flex" : this.loop.nativeElement.style.display = "none";
  }

  public identifyClickOutSide(e) {
    var id = 'selectLoop' + this.indexInput;
    var b = document.getElementById(id);
    if(b) {
      if (!b.contains(e.target)) {
        this.calificationAction = false
      }
    }    
  }
}
