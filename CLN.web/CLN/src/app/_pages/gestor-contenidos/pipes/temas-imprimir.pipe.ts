import { Pipe, PipeTransform } from '@angular/core';
import { Tema } from 'src/app/_model/contenidos/tema.model';

@Pipe({
  name: 'temasImprimir'
})
export class TemasImprimirPipe implements PipeTransform {

  transform(temas: Tema[]): any {
    let elements = '';
    temas.forEach((tema, i) => {
      elements += `${tema.tema}`;
      if (i < temas.length - 1) {
        elements += '; ';
      }
    });
    return elements;
  }

}
