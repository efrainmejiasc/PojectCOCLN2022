import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hiring-card',
  templateUrl: './hiring-card.component.html',
  styleUrls: ['./hiring-card.component.scss']
})
export class HiringCardComponent implements OnInit {

  @Input() card: {};

  constructor() { }

  ngOnInit() {
  }

}
