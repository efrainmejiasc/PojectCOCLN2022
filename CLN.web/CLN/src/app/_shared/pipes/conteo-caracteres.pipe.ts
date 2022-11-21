import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conteoCaracteres'
})
export class ConteoCaracteresPipe implements PipeTransform {

  transform(value: any, max: number): any {
    if (value) {
      let mn = (value.length < 1) ? 0 : value.length;
      return max - mn;
    }

    return max;
  }
}
