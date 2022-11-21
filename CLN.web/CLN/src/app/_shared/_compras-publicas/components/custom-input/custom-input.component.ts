import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Output() setText = new EventEmitter<string>();
  @Input() text: string;
  @Input() placeholder: string  = '';
  @Input() icon: string;
  @Input() textIcon: string;
  @Input() type: string = 'text';
  @Input() maxLength: number;

  constructor() { }

  ngOnInit() {
  }

  typeText( ){
    if(this.text.replace(/\s+/g, "") == ''){
      this.setText.emit('');
    }else{
      this.setText.emit( this.text );
    }
  };

}
