import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() width: string;
  @Input() backgroundColor: string = '#0d3b8f';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {
  }

  public handleClick(event: MouseEvent) {
    this.onClick.emit(event);
}

}
