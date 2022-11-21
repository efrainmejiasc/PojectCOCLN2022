import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent {

  @Input() lista:any[];
  @Input() itemsS:any[];
  @Input() showAlert:boolean;

  @Output() changeState = new EventEmitter<number>();
  @Output() show = new EventEmitter<any>();

  @Input() wrapperActive:boolean = false;

  constructor() {};

  @HostListener('document:click', ['$event']) documentClickEvent($event: MouseEvent) {
    if (!document.getElementById('custom-select').contains($event.target as Node)) {
      this.wrapperActive = false;
    }
  }

  showOptions(): void 
  {
    this.show.emit();
  };

  selectChangeHandler(item: any): void 
  {
    console.log(item);
    
    if( !item.disabled ) this.changeState.emit(item.id);
  };

}
