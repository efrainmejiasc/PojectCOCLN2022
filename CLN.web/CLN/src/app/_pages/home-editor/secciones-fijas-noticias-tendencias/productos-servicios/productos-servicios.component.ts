import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos-servicios',
  templateUrl: './productos-servicios.component.html',
  styleUrls: ['./productos-servicios.component.scss']
})
export class ProductosServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isRedesSocuales: boolean = false;
  verRedesSociales() {
    this.isRedesSocuales = true;
  }
}
