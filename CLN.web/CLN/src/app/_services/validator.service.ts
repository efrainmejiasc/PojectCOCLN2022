import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  items: any;
  emails: any;

  constructor() { }

  public Validate(param: any, type: any, prm_max: number, event: any) {
    let max = prm_max - 1;
    let regexAnyChar = new RegExp('.{0,' + prm_max + '}$');
    let regexString = new RegExp('^[A-Za-z0-9 ñÑÀ-áéíóúÉÍÓÚÁ_.,-]{0,' + prm_max + '}$');
    let regexAlphaNumeric = new RegExp('^[A-Za-z0-9 ñÑÀ-áéíóúÉÍÓÚÁ]{0,' + prm_max + '}$');
    let regexDocument = new RegExp('^[A-Za-z ñÑÀ-áéíóúÉÍÓÚÁ_%&$.()-]{0,' + prm_max + '}$');
    let regexNumber = new RegExp('^[0-9]{0,' + prm_max + '}$');

    let newValue = event.target.value;

    if (type === 'anychar') {
      let result = newValue.match(regexAnyChar);
      console.log(result);
      event.target.value = result;
      if (!result || result == null) {
        return event.target.value = newValue.slice(0, -1);
      }
    }
    if (type === 'string') {

      let result = newValue.match(regexString);
      console.log(result);
      event.target.value = result;
      if (!result || result == null) {
        return event.target.value = newValue.slice(0, -1);
      }

    } else if (type === 'document') {
      let result = newValue.match(regexDocument);
      console.log(result);
      event.target.value = result;
      if (!result || result == null) {
        return event.target.value = newValue.slice(0, -1);
      }

    } else if (type === 'number') {
      const result = newValue.match(regexNumber);
      event.target.value = result;
      if (!result || result == null) {
        return event.target.value = newValue.slice(0, -1);
      }
    } else if (type === 'email') {
      this.emails = param;
      let reg = /^[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,3}$/;
      this.items = this.emails.split(';');
      if (this.items.length <= 5 && this.items.filter(function(x) { return reg.test(x); }).length === this.items.length) {
        return 'email_ok';
      } else {
        return 'email_not';
      }
    }
    if (max - param.length <= 0  ) {
      return 0;
    } else {
      return max - param.length;
    }
  }
}
