import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-text-input-search',
  templateUrl: './text-input-search.component.html',
  styleUrls: ['./text-input-search.component.scss']
})
export class TextInputSearchComponent implements OnInit {

  @Output() text = new EventEmitter<string>();
  @Output() selectValue = new EventEmitter<any>();
  @Input() lista: Array<any>;
  @Input() proceso: string;
  @Input() mostrar: boolean = true;

  data = '';
  mostrarLista = false;

  public search: FormControl = new FormControl('');

  constructor() {
  
  }

  ngOnInit() {
    this.data = '';
  }

  searchString( ){
    const value = this.proceso.trim();

    if( !value ) return;

    this.text.emit( value );
    this.data = 'encontrado';
    this.mostrarLista = true;
  };

  selectOption( value: string ){
    this.selectValue.emit( value );
    this.data = 'encontrado';
    this.mostrarLista = false;
  }

  limpiar(){
    if(!this.proceso){
      this.selectValue.emit( '' );
      this.lista = [];
      this.data = '';
    }
  }

}
