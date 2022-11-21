import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  forwardRef
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Item } from 'src/app/_model/structures';

@Component({
  selector: 'drop-down-radio',
  templateUrl: './drop-down-radio.component.html',
  styleUrls: ['./drop-down-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownRadioComponent),
      multi: true,
    },
  ] ,
})

export class DropDownRadioComponent implements OnInit, OnChanges, ControlValueAccessor {
  disableDrop: boolean;
  @Input() itemList: Item[];
  @Input() invalid = false;
  @Input() color = '';
  @Input() placeholder = 'Seleccione';

  @Input()
  set disabledRadio(value: any) {
    this.disableDrop = Boolean(value);
  }

  @Output() onRadioSelectedItemChange = new EventEmitter();
  SelectedDRItem: any = undefined;

  @Input()
  set defaultValue(name: any|string) {
    this.SelectedDRItem = name;
    this.onChange(name);
  }

  onChange: any = () => { };
  onTouched: any = () => { };
  constructor() { }

  ngOnInit() {
    if (this.defaultValue) {
      this.SelectedDRItem = this.defaultValue;
      this.onChange(name);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const defaultValue: SimpleChange = changes.defaultValue;
    if (defaultValue) {
      this.assignText(defaultValue.currentValue);
      this.onChange(defaultValue.currentValue);
    }
  }

  private assignText(currentValue: any) {
    if (typeof currentValue === 'string' && this.itemList) {
      this.SelectedDRItem = this.itemList.find(obj => obj.value === currentValue || obj.name === currentValue);
    } else if (typeof currentValue === 'number' && this.itemList) {
      this.SelectedDRItem = this.itemList.find(obj => +obj.value === currentValue);
    } else if (typeof currentValue === 'boolean' && this.itemList) {
      this.SelectedDRItem = this.itemList.find(obj => Boolean(JSON.parse(obj.value)) === currentValue);
    } else {
      this.SelectedDRItem = currentValue;
    }
  }

  onItemChange(item) {
    this.SelectedDRItem = item ;
    this.assignText(item);
    this.onRadioSelectedItemChange.emit(item);
    this.onChange(item);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.defaultValue = obj;
    this.assignText(obj);
    // this.onChange(obj)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // setDisabledState?(isDisabled: boolean): void {
    //   throw new Error("Method not implemented.");
    // }

    // validate(control:AbstractControl): ValidationErrors {
    //   throw new Error("Method not implemented.");
    // }
    // registerOnValidatorChange?(fn: () => void): void {
    //   throw new Error("Method not implemented.");
    // }
    // setDisabledState?(isDisabled: boolean): void {
    //   throw new Error("Method not implemented.");
    // }
}
