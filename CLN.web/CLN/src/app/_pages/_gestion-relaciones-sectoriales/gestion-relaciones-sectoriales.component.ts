import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-relaciones-sectoriales',
  templateUrl: './gestion-relaciones-sectoriales.component.html',
  styleUrls: ['./gestion-relaciones-sectoriales.component.scss']
})
export class GestionRelacionesSectorialesComponent implements OnInit {

  @Output() linkTo = "/panel";

  showHelp:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toogleHelp(){
    this.showHelp = !this.showHelp;
  }
}
