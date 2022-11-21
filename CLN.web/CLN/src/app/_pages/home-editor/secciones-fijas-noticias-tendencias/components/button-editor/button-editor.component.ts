import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-editor',
  templateUrl: './button-editor.component.html',
  styleUrls: ['./button-editor.component.scss']
})
export class ButtonEditorComponent implements OnInit {

  @Input() text: string;
  @Input() width: string;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit() {
  }

  public handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
