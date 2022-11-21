import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  targetCostFields = [
    { field: 'fourYearTarget', name: 'Meta del Cuatrenio' },
    { field: 'unitValue', name: 'Costo Unitario' },
    { field: 'totalValue', name: 'Costo Total'},
    { field: 'value-0', name: 'Fuente 1' },
    { field: 'value-1', name: 'Fuente 2' },
    { field: 'value-2', name: 'Fuente 3' },
    { field: 'value-3', name: 'Fuente 4' },
    { field: 'value-4', name: 'Fuente 5' },
    { field: 'value-5', name: 'Fuente 6' },
  ];

  getSwalStyles() {
    return {
      container: 'container-class',
      popup: 'popup-class',
      header: 'header-class',
      title: 'title-class text-white',
      closeButton: 'close-button-class',
      icon: 'icon-class',
      image: 'image-class',
      content: 'content-class',
      input: 'input-class',
      actions: 'actions-class',
      confirmButton: 'btn-confirm-class',
      cancelButton: 'cancel-button-class',
      footer: 'footer-class'
    };
  }

  getSwalStylesNaranja(){
    return {
      container: 'container-class',
      popup: 'popup-class',
      header: 'header-class',
      title: 'title-class text-white',
      closeButton: 'close-button-class',
      icon: 'icon-class',
      image: 'image-class',
      content: 'content-class',
      input: 'input-class',
      actions: 'actions-class',
      confirmButton: 'btn-warning',
      cancelButton: 'btn-warning',
      footer: 'footer-class'
    };
  }

  public fireMessage(titleValue: string, textString: any, textButton?: string) {
    Swal.fire({
      title: titleValue,
      html: textString,
      showCancelButton: false,
      confirmButtonText: textButton ? textButton : 'Aceptar',
      buttonsStyling: false,
      customClass:  this.getSwalStyles()
    });
  }

  alertAndRedirect(textHtml: any, linkRoute: string, textButton: string){
    Swal.fire({
      title: '',
      html: textHtml,
      showCancelButton: false,
      confirmButtonText: textButton,
      buttonsStyling: false,
      customClass:  this.getSwalStyles()
    })
    .then((result) => {
      this.router.navigate([linkRoute]);
    });
  }

}
