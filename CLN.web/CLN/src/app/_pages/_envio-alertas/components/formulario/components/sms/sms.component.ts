import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  @Output() setValues = new EventEmitter<any>();

  @Input() textoSms = '';
  @Input() vinculo = '';
  @Input() sms = '';
  longitud = 160;
  maxLength = 160;

  constructor() { }

  ngOnInit() {
  }

  setSms(nombre: string){
    this.sms = nombre;
    this.longitud = 160 - this.vinculo.length - nombre.length;

    this.setValues.emit( {
      sms: this.sms,
      link: this.vinculo,
      tituloLink: this.textoSms
    } );
  }

  setTextoSms(nombre: string){
    this.textoSms = nombre;
    this.setValues.emit( {
      sms: this.sms,
      link: this.vinculo,
      tituloLink: this.textoSms
    } );
  }

  setVinculo(texto: string){
    this.vinculo = texto;

    this.longitud = 160 - this.sms.length - texto.length;

    this.setValues.emit( {
      sms: this.sms,
      link: this.vinculo,
      tituloLink: this.textoSms
    } );
  }

  limpiar(){
    this.sms = '';
    this.textoSms = '';
    this.vinculo = '';
  }
}
