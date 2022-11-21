import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Validaciones } from 'src/app/_shared/utils/validaciones';
import { TemasService } from 'src/app/_services/gestor-contenidos/temas.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-temas-form',
  templateUrl: './temas-form.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './temas-form.component.scss'
  ]
})
export class TemasFormComponent implements OnInit {
  sendedData; //data sended from the parent, in this case is 0, but is necesary to declare it
  constructor(
    public modal: NgbActiveModal,
    private temasService: TemasService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  form: FormGroup;
  formProperties = {
    descripcion: {
      maxCaracteres: 150,
      validationMessages: {
        required: 'El nombre es requerido',
        maxlength: `Se alcanzó el máximo de caracters permitido (150)`
      },
      error: false
    }
  };

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.maxLength(this.formProperties.descripcion.maxCaracteres)]],
    });
  }

  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    console.log(rta);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
    }
    return rta;
  }
  public activeValidator = false;
  @ViewChild('descripcion', { static: false }) descripcion: ElementRef;
  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const tema = this.form.value;
      this.temasService.createTopic(tema)
        .subscribe(response => {
          this.modal.close('Yes');
          let buttons: Array<model> = [];
          let first = "El tema ";
          let bold = tema.descripcion;
          let third = "ha sido creado correctamente";
          buttons[0] = {
            class: "modal-button modal-button-primary",
            messsage: "Cerrar",
            action: "cancel",
          };
          this.render(first, bold, third, buttons);
        });
    } else {
      (this.form.get('descripcion').invalid) ? this.descripcion.nativeElement.placeholder = 'Por favor ingrese información en este campo' : ""
      this.activeValidator = true;
    }
  }

  render(first: string, bold: string, third: string, buttons: Array<model>): void {

    const ref = this.modalService.open(ConfirmacionComponent, {
      size: "lg",
      centered: true,
    });
    ref.componentInstance.message[0] = first;
    ref.componentInstance.message[1] = bold;
    ref.componentInstance.message[2] = third;
    ref.componentInstance.buttons = buttons;

    ref.result.then(
      (yes) => { },
      (cancel) => { }
    );
  }
}

class model {
  class: string;
  messsage: string;
  action: string;
}
