import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cp-input-search',
  templateUrl: './cp-input-search.component.html',
  styleUrls: ['./cp-input-search.component.scss']
})
export class CpInputSearchComponent implements OnInit{

  @Input() lista:any[];
  @Input() itemsS:any[];
  @Input() listResult:any[];

  @Output() idValueEvent = new EventEmitter<string>();
  @Output() idRemoveEvent = new EventEmitter<string>();
  @Output() stringValueEvent = new EventEmitter<string>();
  @Output() itemsSValueEvent = new EventEmitter<any>();

  wrapperActive:boolean = false;
  timeout:number;
  irABuscar:boolean = false;
  wordForSerach:string = null;
  valueResult:string = " "

  constructor() {};

  ngOnInit(): void {}

  showOptions(){
    this.wrapperActive = !this.wrapperActive;
  };

  selectChangeHandler(name:string, input:HTMLInputElement){
    input.value = "";
    input.focus();
    this.idValueEvent.emit(name);
    this.wrapperActive = false;
  };

  removeItem(name:string, input:HTMLInputElement){
    input.value = "";
    input.focus();
    this.idRemoveEvent.emit(name);
    this.wrapperActive = false;
  };

  searchItem(e:any, input:HTMLInputElement){
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(()=>{

      if(e.which===188 || e.which===13){
        let mystring = e.target.value.replace(',', '');
        input.value = "";
        input.focus();
        let wordToSend = mystring.trim();
        this.idValueEvent.emit(wordToSend);
      }else{
        let wordToSearch = e.target.value.trim();

        if(wordToSearch !== ""){
          this.stringValueEvent.emit(wordToSearch);
          this.wrapperActive = true;
        }else{
          this.wrapperActive = false;
          input.value = "";
        }
      }
    }, 800);
  };

  handleChange(e:any, preValue:any){

    for(var i=0; i<this.itemsS.length; i++){
      let name = this.itemsS[i].name;

      if(name === preValue.name){
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

  focusInInput(input){
    this.wrapperActive = false;
    input.focus();
  }
};
