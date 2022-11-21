import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {

  @Input() titulo = '';
  @Input() buttonText = '';
  @Input() icono = '';
  @Input() alertaIcono = "";
  @Input() infoAyuda = "";

  showHelp:boolean = false;

  constructor() {
    console.log(this.infoAyuda)
   }

  ngOnInit() {
  }

  toogleHelp(){
    this.showHelp = !this.showHelp;
  }
}
