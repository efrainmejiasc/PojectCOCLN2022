import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TemasService } from 'src/app/_services/gestor-contenidos/temas.service';
import { Validaciones } from 'src/app/_shared/utils/validaciones';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-temas-edit',
  templateUrl: './temas-edit.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './temas-edit.component.scss'
  ]
})
export class TemasEditComponent implements OnInit {
  sendedData; //data sended from the parent, in this case is 0, but is necesary to declare it
  tema: any;
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

  constructor(
    public modal: NgbActiveModal,
    private temasService: TemasService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      descripcion: [this.tema.descripcion, [Validators.required, Validators.maxLength(this.formProperties.descripcion.maxCaracteres)]],
    });
  }

  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
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
      const descripcion = this.form.value;
      descripcion.id = this.tema.idTema;
      this.temasService.updateTopic(descripcion)
        .subscribe(response => {
          this.modal.close('Yes');
        });
    } else {
      (this.form.get('descripcion').invalid) ? this.descripcion.nativeElement.placeholder = 'Por favor ingrese información en este campo' : ""
      this.activeValidator = true;
    }
  }
}
