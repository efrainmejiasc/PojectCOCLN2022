import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitedList'
})
export class LimitedListPipe implements PipeTransform {

  transform(value: any): any {

    let values = [];

    value.values.map((data: any, index: number) => {
      if( index <= value.limit - 1 ){
        values = [ ...values, data ];
      }
    })
    return values;
  }

}
