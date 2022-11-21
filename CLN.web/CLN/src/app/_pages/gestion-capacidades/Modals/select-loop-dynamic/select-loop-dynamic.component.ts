import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { capacidadPadre } from 'src/app/_model/capacidad/capacidadPadre.model';

@Component({
  selector: 'app-select-loop-dynamic',
  templateUrl: './select-loop-dynamic.component.html',
  styleUrls: [
    "../../../../_shared/styles/select-loop.scss",
    './select-loop-dynamic.component.scss'
  ]
})
export class SelectLoopDynamicComponent implements OnInit, OnChanges {

  constructor() { }
  public CapacidadesPadre: Array<capacidadPadre> = []
  public idPadreSelected = null
  public emptyMessage = "No se encontraron capacidades";
  @Input() listCapacidadesPadre: capacidadPadre;
  @Input() idPadre: number;
  @Input() closeActionByOutsideClick: any;
  ngOnChanges(changes: SimpleChanges) {
    const changePrint = changes["listCapacidadesPadre"];
    const changeId = changes["idPadre"];
    const changeEvent = changes["closeActionByOutsideClick"];
    if (changePrint && changePrint.currentValue) {
      this.select = "Selecciona";
      this.loopStatus = false;
      this.CapacidadesPadre = changePrint.currentValue;
      if (changeId && changeId.currentValue) {
        this.idPadreSelected = changeId.currentValue;
        (this.CapacidadesPadre.filter(padre => padre.id == this.idPadreSelected.id)[0]) ? this.select = this.CapacidadesPadre.filter(padre => padre.id == this.idPadreSelected.id)[0].nombre : "";
      } else {
        this.idPadreSelected = null;
        this.select = "Selecciona"
      }
    }
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }

  }
  ngOnInit() {
  }
  private cont = 0;
  public loopStatus: boolean = false;
  public openBox() {
    if (!this.isAction) {
      (!this.loopStatus) ? this.loopStatus = true : this.loopStatus = false;
    }
  }
  //@ViewChild('loopAction1', {static: false}) tableElement: ElementRef
  private beforeValue: number = null;
  public activeMoreInfo(type, value) {
    switch (type) {
      case 0:
        var element = "loop" + this.beforeValue;
        a = document.getElementById(element)
        a.style.display = "none";
        break;
      case 1:
        var a;
        var b;
        if (this.beforeValue != null) {
          var element = "loop" + this.beforeValue;
          a = document.getElementById(element)
          a.style.display = "none";
        }
        var c = document.getElementById("loop")
        var elementAction = "loopAction" + value;
        b = document.getElementById(elementAction)
        var top = b.getBoundingClientRect().top - c.getBoundingClientRect().top + 15;
        var element = "loop" + value;
        a = document.getElementById(element)
        a.style.display = "flex";
        a.style.top = top + "px";
        this.beforeValue = value;
        break;
    }
  }
  public select: String = "Selecciona"
  @Output() buildAction = new EventEmitter<number>();
  private isAction: boolean = false;
  public selectLoopItem(loop) {
    this.isAction = true;
    this.loopStatus = false;
    this.select = loop.nombre;
    this.buildAction.emit(loop.id);
    setTimeout(() => {
      this.isAction = false;
    }, 1);
  }

  public identifyClickOutSide(e) {
    var b = document.getElementById('selectLoop');
    if (!b.contains(e.target)) {
      this.loopStatus = false
    }
  }
}
