import { Component, OnInit } from '@angular/core';

import { MicrositiosService } from 'src/app/_services/micrositios/micrositios.service';
import { Micrositio } from 'src/app/_model/micrositios/micrositio.model';

@Component({
  selector: 'app-miscrositios-banner',
  templateUrl: './miscrositios-banner.component.html',
  styleUrls: ['./miscrositios-banner.component.scss']
})
export class MiscrositiosBannerComponent implements OnInit {

  micrositios: Micrositio[] = [];
  slideMicrositiosInicialNumberToShow: number[] = [ 0, 1, 2, 3, 4, 5 ];
  NumberMicrositiosToShow = 6;
  quantityMicrositios: number;
  pages = 0;
  actualpage = 0;
  constructor(
    private micrositiosService: MicrositiosService
  ) { }

  ngOnInit() {
    this.fetchMicrositios();
  }

  fetchMicrositios() {
    this.micrositiosService.getMicrositiosPublicados()
    .subscribe( (micrositios: Micrositio[])  => {
      this.micrositios = micrositios;
      this.quantityMicrositios = micrositios.length;
      this.pages = Math.ceil(this.quantityMicrositios / this.NumberMicrositiosToShow);
    });
  }

  goback(indice: number) {
    this.actualpage = (((this.actualpage - 1) % this.pages) + this.pages) % this.pages;
    for (let i = 0; i < this.NumberMicrositiosToShow; i++) {
      this.slideMicrositiosInicialNumberToShow[i] = this.actualpage * 6 + i;
    }
  }

  goforward(indice: number) {
    this.actualpage = Math.abs((this.actualpage + 1) % this.pages);
    for (let i = 0; i < this.NumberMicrositiosToShow; i++) {
      this.slideMicrositiosInicialNumberToShow[i] = this.actualpage * 6 + i;
    }
  }
}
