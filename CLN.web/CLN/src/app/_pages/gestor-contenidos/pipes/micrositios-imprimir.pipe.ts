import { Pipe, PipeTransform } from '@angular/core';
import { Micrositio } from 'src/app/_model/micrositios/micrositio.model';

@Pipe({
  name: 'micrositiosImprimir'
})
export class MicrositiosImprimirPipe implements PipeTransform {

  transform(micrositios: Micrositio[]): any {
    let elements = '';

    if (micrositios != null) {
      micrositios.forEach((item, i) => {
        elements += `${item.nombre}`;
        if (i < micrositios.length - 1) {
          elements += '; ';
        }
      });
    }
    return elements;
    
  }
}
