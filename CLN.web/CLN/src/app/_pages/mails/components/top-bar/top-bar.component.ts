import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  images = [
    {
      title: 'Mincomercio',
      path: 'assets/img/mails/logomincomercio.svg',
    },
    {
      title: 'Colombia Productiva',
      path: 'assets/img/mails/logocolombiaproductiva.svg',
    },
    {
      title: 'Compra Lo Nuestro',
      path: 'assets/img/mails/compralonuestro.svg',
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
