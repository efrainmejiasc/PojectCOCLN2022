import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { capacidadListType } from 'src/app/_model/capacidad/capacidadListType.model';

@Component({
  selector: 'app-content-capacidades',
  templateUrl: './content-capacidades.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './content-capacidades.component.scss']
})
export class ContentCapacidadesComponent implements OnInit, OnChanges {

  constructor() { }
  public show: boolean = false;
  ngOnInit() {
  }
  @Input() showContent: any;
  @Input() capacidadesList: Array<capacidadListType>;
  public capacidades: Array<capacidadListType> = [];
  ngOnChanges(changes: SimpleChanges) {
    const showCapacidad = changes["showContent"];
    const capacidadType = changes["capacidadesList"];
    if (showCapacidad && showCapacidad.currentValue != undefined) {
      this.show = true
      this.actionIn = false;
    }
    if (capacidadType && capacidadType.currentValue != undefined) {
      this.capacidades = capacidadType.currentValue;
    }
  }
  public toTop() {
    var valuue = window.scrollY;
    for (var i = valuue; i > 0; i--) {
      this.toTopFunction(i);
    }
  }
  private toTopFunction(i) {
    setTimeout(() => {
      window.scroll(0, i);
    }, 1);
  }
  @Output() closeCapacidades = new EventEmitter<boolean>();
  public actionIn: boolean = false;
  public close() {
    this.closeCapacidades.emit(false);
    this.actionIn = true;
    setTimeout(() => {
      this.show = false;
    }, 900);
  }

}