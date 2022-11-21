import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cp-values',
  templateUrl: './cp-values.component.html',
  styleUrls: ['./cp-values.component.scss']
})
export class CpValuesComponent implements OnInit {

  minValString:string;
  maxValString:string;

  @Input() set minValue(val:any){

    this.minValueLength = val.toString().length;
    this.minValString = this.formatValue(val.toString(), null);
  }

  get minValue(): any {
    return this.minValString;
  }

  @Input() set maxValue(val:any){
    this.maxValueLength = val.toString().length;
    this.maxValString = this.formatValue(val.toString(), null);
  };

  get maxValue():any{
    return this.maxValString;
  };

  @Input() maxValuePossible:number;
  @Input() allValues:boolean;
  @Input() includeValues:boolean;
  @Input() showIncludeValues:boolean = false;

  @Output() minimunValueS = new EventEmitter<number>();
  @Output() maximunValueS = new EventEmitter<number>();
  @Output() allValueS = new EventEmitter<boolean>();
  @Output() includeValueS = new EventEmitter<boolean>();

  showAlerta:boolean = false;
  notificationMessage = "El valor registrado no es válido";
  minValueLength:number;
  maxValueLength:number;

  minValueStr:string;

  constructor() {}

  ngOnInit() {};

  updateNumberOfCharateres(input:HTMLInputElement, span:HTMLSpanElement, type:any){

    let valueFormatted = this.formatValue(input.value, type);

    input.value = valueFormatted;

    let valueString = valueFormatted.replace(/\D/g,'');

    let length = valueString.length + "";

    if(type==="minValueType"){
      this.minValueLength = parseInt(length);
    }else{
      this.maxValue = valueFormatted;
      this.maxValueLength = parseInt(length);
    }
  }

  sendMinValue(value:any, input:HTMLInputElement){

    let inputEl = input;

    let valueString = value.replace(/\D/g,'');

    let maxValString = this.maxValue.replace(/\D/g,'');

    let valueInNumbers = parseInt(valueString);
    let maxValInNumbers = parseInt(maxValString);

    if(valueInNumbers < 0){
      inputEl.value = this.formatValue("1", "minValueType");
      this.minValueLength = 1;
      this.showAlerta = true;
      return;
    }else if(valueInNumbers > maxValInNumbers){
      inputEl.value = this.formatValue("1", "minValueType");
      this.minValueLength = 1;
      this.notificationMessage = `El valor no puede ser mayor que el valor máximo`;
      this.showAlerta = true;
      return;
    }
    else{
      this.minimunValueS.emit(valueInNumbers);
    };
  };

  sendMaxValue(value:any, input:HTMLInputElement){

    let inputEl = input;

    let valueString = value.replace(/\D/g,'');
    let minValueString = this.minValue.replace(/\D/g,'');

    let valueInNumbers = parseInt(valueString);
    let minValueInNumbers = parseInt(minValueString);

    if(!valueInNumbers){
      this.maximunValueS.emit(this.maxValuePossible);
      inputEl.value = this.formatValue(this.maxValuePossible.toString(), "maxValueType");
      this.maxValue = inputEl.value;
      this.notificationMessage = `El valor registrado no es válido`;
      this.showAlerta = true;
      this.maxValueLength = this.maxValuePossible.toString().length;
      return;
    }

    if(valueInNumbers > this.maxValuePossible){

      inputEl.value = this.formatValue(this.maxValuePossible.toString(), "maxValueType");
      this.maxValue = inputEl.value;
      let maxValuePossibleFormatted = this.formatValue(this.maxValuePossible.toString(), null);
      this.notificationMessage = `El valor registrado no es válido y supera el valor máximo de ${maxValuePossibleFormatted}`;
      this.showAlerta = true;
      this.maxValueLength = this.maxValuePossible.toString().length;
      return;

    }else if(valueInNumbers < minValueInNumbers || valueInNumbers < 1){

      inputEl.value = this.formatValue(this.maxValuePossible.toString(), "maxValueType");
      this.notificationMessage = `El valor registrado es menor al valor minimo`;
      this.showAlerta = true;
      this.maxValueLength = this.maxValuePossible.toString().length;
      return;
    }

    this.maximunValueS.emit(valueInNumbers);
  };

  handlerCheck(value:boolean){
    this.allValueS.emit(value);
  };

  handlerCheckInclude(value:boolean){
    this.includeValueS.emit(value);
  }

  closePopup(e){
    this.showAlerta = false;
  };

  formatValue(value:any, type:any){

    let typeValue = typeof(value);

    let valueString = value.replace(/\D/g,'');

    let valueNumber = parseInt(valueString);

    if(type === "minValueType"){
      //this.minimunValueS.emit(valueNumber);
    }else if(type === "maxValueType"){
      //this.maximunValueS.emit(valueNumber);
    }

    let arr = valueString.split('');

    if(arr.length==4){
      arr.splice(1, 0, ".");
    }else if(arr.length==5){
      arr.splice(2, 0, ".");
    }else if(arr.length==6){
      arr.splice(3, 0, ".");
    }else if(arr.length==7){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
    }else if(arr.length==8){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
    }else if(arr.length==9){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
    }else if(arr.length==10){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
    }else if(arr.length==11){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
    }else if(arr.length==12){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
      arr.splice(11, 0, ".");
    }else if(arr.length==13){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
      arr.splice(13, 0, ".");
    }else if(arr.length==14){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
      arr.splice(14, 0, ".");
    }else if(arr.length==15){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
      arr.splice(11, 0, ".");
      arr.splice(15, 0, ".");
    }else if(arr.length==16){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
      arr.splice(13, 0, ".");
      arr.splice(17, 0, ".");
    }else if(arr.length==17){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
      arr.splice(14, 0, ".");
      arr.splice(18, 0, ".");
    }else if(arr.length==18){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
      arr.splice(11, 0, ".");
      arr.splice(15, 0, ".");
      arr.splice(19, 0, ".");
    }else if(arr.length==19){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
      arr.splice(13, 0, ".");
      arr.splice(17, 0, ".");
      arr.splice(21, 0, ".");
    }else if(arr.length==20){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
      arr.splice(14, 0, ".");
      arr.splice(18, 0, ".");
      arr.splice(22, 0, ".");
    }else if(arr.length==21){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
      arr.splice(11, 0, ".");
      arr.splice(15, 0, ".");
      arr.splice(19, 0, ".");
      arr.splice(23, 0, ".");
    }else if(arr.length==22){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
      arr.splice(13, 0, ".");
      arr.splice(17, 0, ".");
      arr.splice(21, 0, ".");
      arr.splice(25, 0, ".");
    }else if(arr.length==23){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
      arr.splice(14, 0, ".");
      arr.splice(18, 0, ".");
      arr.splice(22, 0, ".");
      arr.splice(26, 0, ".");
    }else if(arr.length==24){
      arr.splice(3, 0, ".");
      arr.splice(7, 0, ".");
      arr.splice(11, 0, ".");
      arr.splice(15, 0, ".");
      arr.splice(19, 0, ".");
      arr.splice(23, 0, ".");
      arr.splice(27, 0, ".");
    }else if(arr.length==25){
      arr.splice(1, 0, ".");
      arr.splice(5, 0, ".");
      arr.splice(9, 0, ".");
      arr.splice(13, 0, ".");
      arr.splice(17, 0, ".");
      arr.splice(21, 0, ".");
      arr.splice(25, 0, ".");
      arr.splice(29, 0, ".");
    }else if(arr.length==26){
      arr.splice(2, 0, ".");
      arr.splice(6, 0, ".");
      arr.splice(10, 0, ".");
      arr.splice(14, 0, ".");
      arr.splice(18, 0, ".");
      arr.splice(22, 0, ".");
      arr.splice(26, 0, ".");
      arr.splice(30, 0, ".");
    }

    let text = "$ " + arr.join("");

    return text;
  }
};
