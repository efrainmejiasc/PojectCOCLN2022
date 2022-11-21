import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captative',
  templateUrl: './captative.component.html',
  styleUrls: ['./captative.component.scss']
})
export class CaptativeComponent implements OnInit {

  url: string;

  constructor() { }

  ngOnInit() {
    this.url = `${location.origin}/simulator/`
  }

}
