import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-empresa',
  templateUrl: './home-empresa.component.html',
  styleUrls: ['./home-empresa.component.scss']
})
export class HomeEmpresaComponent implements OnInit {

  esEmpresa:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
