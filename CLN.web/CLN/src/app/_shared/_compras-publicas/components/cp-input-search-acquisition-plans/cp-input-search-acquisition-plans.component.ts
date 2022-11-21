import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-input-search-acquisition-plans',
  templateUrl: './cp-input-search-acquisition-plans.component.html',
  styleUrls: ['./cp-input-search-acquisition-plans.component.scss']
})
export class CpInputSearchAcquisitionPlansComponent implements OnInit {
  
  @Input() lista: any[];
  @Input() itemsS: any[];
  @Input() listResult: any[];
  @Input() placeholderText = "";

  @Output() idValueEvent = new EventEmitter<string>();
  @Output() idRemoveEvent = new EventEmitter<string>();
  @Output() stringValueEvent = new EventEmitter<string>();
  @Output() itemsSValueEvent = new EventEmitter<any>();

  wrapperActive: boolean = false;
  timeout: number;
  irABuscar: boolean = false;
  wordForSerach: string = null;
  valueResult: string = " "

  constructor() { };

  ngOnInit(): void { }

  showOptions() {
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(name: string, input: HTMLInputElement) {

    input.value = "";
    input.focus();
    this.idValueEvent.emit(name);
    this.wrapperActive = false;
  };

  removeItem(name: string, input: HTMLInputElement) {
    input.value = "";
    input.focus();
    this.idRemoveEvent.emit(name);
    this.wrapperActive = false;
  };

  searchItem(e: any, input: HTMLInputElement) {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {

      if (e.which === 188 || e.which === 13) {
        let mystring = e.target.value.replace(',', '');
        input.value = "";
        input.focus();
        this.idValueEvent.emit(mystring);
      } else {
        if (e.target.value !== "") {
          this.stringValueEvent.emit(e.target.value);
          this.wrapperActive = true;
        } else {
          this.wrapperActive = false;
        }
      }
    }, 800);
  };

  handleChange(e: any, preValue: any) {

    for (var i = 0; i < this.itemsS.length; i++) {
      let name = this.itemsS[i].name;

      if (name === preValue.name) {
        let nameFinal = this.cleanChar(e.target.value, ',');
        this.itemsS[i].name = nameFinal;
      }
    }

    this.itemsSValueEvent.emit(this.itemsS);
  }

  cleanChar(str, char) {

    while (true) {
      var result_1 = str.replace(char, '');
      if (result_1 === str) {
        break;
      }
      str = result_1;
    }
    return str;
  }
};