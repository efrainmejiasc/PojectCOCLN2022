import { AbstractControl } from '@angular/forms';


export function Validarbiblioteca(control: AbstractControl) {
  if (control.value === 0 || control.value === null ){
    return { validAssociatedLibray: true };
  }
  return null;
}
