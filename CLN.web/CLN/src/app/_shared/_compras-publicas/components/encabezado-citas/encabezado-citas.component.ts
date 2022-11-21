import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-encabezado-citas',
  templateUrl: './encabezado-citas.component.html',
  styleUrls: ['./encabezado-citas.component.scss']
})
export class EncabezadoCitasComponent implements OnInit {

  @Input() headerInput: string;
  header = 'assets/imgs/citas/header-gestionar-citas.png';
  constructor() { }

  ngOnInit() {
    if (this.headerInput)
      this.header = this.headerInput;
  }

}
