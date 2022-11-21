import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlify'
})
export class UrlifyPipe implements PipeTransform {

  transform(value: string): any {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return value.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank"">${url}</a>`;
    });
  }
}
