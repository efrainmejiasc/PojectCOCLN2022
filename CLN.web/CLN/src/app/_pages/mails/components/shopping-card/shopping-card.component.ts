import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

  @Input() card: {};

  constructor() { }

  ngOnInit() {
  }

}
