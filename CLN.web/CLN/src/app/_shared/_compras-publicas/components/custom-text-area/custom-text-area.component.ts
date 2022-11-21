import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-text-area',
  templateUrl: './custom-text-area.component.html',
  styleUrls: ['./custom-text-area.component.scss']
})
export class CustomTextAreaComponent implements OnInit {

  @Output() setText = new EventEmitter<string>();
  @Input() text: string;
  @Input() placeholder: string  = '';
  @Input() icon: string;
  @Input() textIcon: string;
  @Input() maxLength: string;
  @Input() link: string;
  @Input() textoVinculo: string;

  enlace: string;

  constructor() { }

  ngOnInit() {
  }

  typeText( ){
    this.setText.emit( this.text );
  };

  buildLink(){
    const isHttp = this.link.substring(0, 7) === 'http://';
    const isHttps = this.link.substring(0, 8) === 'https://';

    if( !isHttp && !isHttps && this.link ){
      this.enlace = `https://${ this.link }`;
    }else{
      this.enlace = this.link;
    }

    return this.enlace;
  }

}
