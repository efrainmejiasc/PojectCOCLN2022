import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Time {
  desde: string | Date;
  hasta: string | Date;
  hora: string | number;
  minuto: string | number;
}

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss']
})
export class CustomDatePickerComponent implements OnInit {

  @Output() setValue = new EventEmitter<Time>();
  @Input() value: Time;
  @Input() disabledHasta: boolean;
  desde: any;
  hasta: any;

  todaysdate: any;

  constructor() { }

  ngOnInit() {
    this.todaysdate=new Date().getFullYear()+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+('0' + new Date().getDate()).slice(-2);
  }

  asignarValor(){
    this.value.desde = this.desde;
    this.value.hasta = this.hasta;
    this.setValue.emit( this.value );
  }

  borrar(){
    this.value.desde = this.desde;
    this.value.hasta = '';
    this.hasta = '';
    this.setValue.emit( this.value );
    return this.hasta;
  }

}

document.querySelectorAll('input[type=number]')
  .forEach((e: HTMLInputElement) => e.oninput = () => {
    // Always 2 digits
    if (e.value.length >= 2) e.value = e.value.slice(0, 2);
    // 0 on the left (doesn't work on FF)
    if (e.value.length === 1) e.value = '0' + e.value;
    // Avoiding letters on FF
    if (!e.value) e.value = '00';
});
