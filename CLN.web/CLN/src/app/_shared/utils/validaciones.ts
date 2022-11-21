import { AbstractControl, ValidatorFn } from '@angular/forms';
import { addDays } from 'date-fns';

export class Validaciones {
    static validar(form: AbstractControl, propiedad: string, formProperties: any) {
      const obj = formProperties[propiedad].validationMessages;
      const errors = [];
      for (const prop in obj) {
        if (form.get(propiedad).hasError(prop)) {
          errors.push(obj[prop]);
        }
      }
      formProperties[propiedad].error = errors.length > 0;
      return errors.length > 0 ? errors : null;
    }

    static fecha(control: AbstractControl) {
      const value = addDays(new Date(control.value), 1);
      const today = new Date();
      const nextyear = new Date(today.getFullYear() + 1, 1, 1);
      if (value < today || value > nextyear) {
        return { fecha_invalida: true };
      }
      return null;
    }

    /// Compara una fecha con otra, si opc es '+' no puede ser menor,
    /// de lo contrario no puede ser mayor
    static rangoFecha(fecha: string, opc: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        switch (opc) {
          case '+':
            if (new Date(control.value) >= new Date(fecha)) {
              return { rango_invalido: true };
            }
            break;
          case '-':
            if (new Date(control.value) <= new Date(fecha)) {
              return { rango_invalido: true };
            }
            break;
          default:
            break;
        }
        return null;
      };
    }

    static hora(control: AbstractControl) {
      const value = control.value;
      if (value < '7:00 am' || value >= '9:00 pm') {
        return { hora_invalida: true };
      }
      return null;
    }

    /// Compara una fecha con otra, si opc es '+' no puede ser menor,
    /// de lo contrario no puede ser mayor
    static rangoHora(hora: string, opc: string): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        switch (opc) {
          case '+':
            if (control.value >= hora) {
              return { rango_invalido: true };
            }
            break;
          case '-':
            if (control.value <= hora) {
              return { rango_invalido: true };
            }
            break;
          default:
            break;
        }
        return null;
      };
    }
}
