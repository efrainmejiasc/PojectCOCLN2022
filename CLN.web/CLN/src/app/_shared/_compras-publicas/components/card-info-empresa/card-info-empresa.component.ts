import { Component, Input, OnInit } from '@angular/core';
import { EmpresaCP } from './../../../../_model/_compras-publicas/compraspublicas.interfaces';

@Component({
  selector: 'app-card-info-empresa',
  templateUrl: './card-info-empresa.component.html',
  styleUrls: ['./card-info-empresa.component.scss']
})
export class CardInfoEmpresaComponent implements OnInit {

  @Input() empresa:EmpresaCP;

  constructor() { }

  ngOnInit() {

    console.log(this.empresa);
    
  }

}
