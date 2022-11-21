import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extensionArchivo'
})
export class ExtensionArchivoPipe implements PipeTransform {

  transform(value: string): any {
    const array = value.split('.');
    return array[array.length - 1];
  }
}
