import { Component, Input, OnInit, ViewChild } from '@angular/core';
//import * as rasterizeHTML from 'rasterizehtml';

@Component({
  selector: 'app-render-html-to-an-image',
  templateUrl: './render-html-to-an-image.component.html',
  styleUrls: ['./render-html-to-an-image.component.scss']
})
export class RenderHtmlToAnImageComponent implements OnInit {
  @ViewChild('canvas', { static: true })

  @Input() html: string;
  @Input() css: string;

  constructor() { }

  ngOnInit() {
    this.render();
  }

  render(): void {
    const canvas = document.getElementById('canvas');
    //rasterizeHTML.drawHTML(`<style>${this.css}</style><div>${this.html}</div>`, canvas as HTMLCanvasElement);
  }
}
