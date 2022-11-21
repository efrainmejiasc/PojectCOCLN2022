import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-options',
  templateUrl: './offer-options.component.html',
  styleUrls: ['./offer-options.component.scss']
})
export class OfferOptionsComponent implements OnInit {

  @Input() opciones!: any[];
  @Input() selectedOption: string;

  constructor() { }

  ngOnInit() {

  }



}
