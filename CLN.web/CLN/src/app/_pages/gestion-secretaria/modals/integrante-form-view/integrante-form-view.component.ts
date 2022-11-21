import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GestionSecretariasService } from 'src/app/_services/gestion-secretarias/gestion-secretarias';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-integrante-form-view',
  templateUrl: './integrante-form-view.component.html',
  styleUrls: [
    './integrante-form-view.component.scss',
    './../../../../_shared/styles/modals.scss',
    './../../../../_shared/styles/tables.scss'
  ]
})
export class IntegranteFormViewComponent implements OnInit {
  @ViewChild('nombre', { static: false }) nombre: ElementRef;
  @ViewChild('apellido', { static: false }) apellido: ElementRef;
  @ViewChild('cargo', { static: false }) cargo: ElementRef;
  activeValidator: boolean = false;

  secretariaId = 0;

  integrantes: any[] = [];
  index = -1;
  isUpdate = false;
  entidadTerritorial: string = '';

  formTeam: FormGroup;

  titulo = 'Nuevo integrante de una secretaría';

  formProperties = {
    nombre: {
      maxCaracteres: 50,
      validationMessages: {
        required: "El nombre es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (50)",
      },
      error: true,
    },
    apellido: {
      maxCaracteres: 50,
      validationMessages: {
        required: "El apellido es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (50)",
      },
      error: true,
    },
    cargo: {
      maxCaracteres: 50,
      validationMessages: {
        required: "El cargo es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (100)",
      },
      error: true,
    }
  }

  constructor(
    public _modal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private secretariaServices: GestionSecretariasService
  ) { 
    this.buildForm();
  }

  ngOnInit() {
    if(this.secretariaId > 0) {
      this.titulo = 'Gestionar integrantes de una secretaría';
      this.secretariaServices.getSecretariaIntegrantes(this.secretariaId)
      .subscribe(response => {
        this.integrantes = response;
      });
    }
  }

  eliminar(index: number) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = 
      `¿Esta segura/o de eliminar el integrante seleccionado?, recuerde que una 
      vez lo elimine no estará disponible en la información de la secretaría`;
    ref.componentInstance.buttonContent = ["Cancelar", "Aceptar"];
    ref.result.then((response) => {
      if(response){
        this.accionEliminar(index);
      }
    }, (cancel) => {
        console.log('Cancel Click');
    });
  }

  async accionEliminar(index: number) {
    if (index > -1) {
      if(this.secretariaId > 0) {
        this.secretariaServices.deleteSecretariaIntegrante(this.integrantes[index].id)
        .subscribe(response => { 
          if (response === 'OK') {
            this.alertModal(`Se ha eliminado correctamente el integrante`);
            this.integrantes.splice(index, 1);
          } else {
            this.alertModal(`No se pudo terminar la operación, intentelo mas tarde`);
          }
        });
      }
      else {
        this.alertModal(`Se ha eliminado correctamente el integrante`);
        this.integrantes.splice(index, 1);
      }
    }
  }

  editar(index: number) {
    this.index = index;
    this.formTeam.patchValue(this.integrantes[index]);
  }

  guardar() {
    this._modal.close({ integrantes: this.integrantes, isUpdate: this.isUpdate });
  }

  saveTeam(event: Event) {
    event.preventDefault();
    if (this.formTeam.valid){
      if (this.integrantes.length == 3 && this.index == -1) {
        this.alertModal('Solo se permiten 3 integrantes por secretaría');
      } else {
        const integrante = this.formTeam.value;
        if(this.secretariaId > 0) {
          integrante.idSecretaria = this.secretariaId;
          if(this.index > -1) {
            this.secretariaServices.updateSecretariaIntegrantes(integrante)
            .subscribe(response => {
              this.alertModal(`Se ha actualizado correctamente la información para el integrante ${response.nombre} ${response.apellido} para ${this.entidadTerritorial}`);
              this.integrantes[this.index] = response;
              this.index = -1;
            });
          }
          else {
            this.secretariaServices.saveSecretariaIntegrantes(integrante)
            .subscribe(response => {
              this.alertModal(`Se ha adicionado correctamente el integrante a la secretaría ${this.entidadTerritorial}`);
              this.integrantes.push(response);
            });
          }
        }
        else {
          if(this.index > -1) {
            this.alertModal(`Se ha actualizado correctamente la información para el integrante ${integrante.nombre} ${integrante.apellido}`);
            this.integrantes[this.index] = integrante;
            this.index = -1;
          }
          else {
            this.alertModal(`Se ha adicionado correctamente el integrante a la secretaría ${this.entidadTerritorial}`);
            this.integrantes.push(integrante);
          }
        }
        this.isUpdate = true;
        this.cleanFields();
      }
    }
    else {
      let msg = 'Por favor ingrese información en este campo';
      (this.formTeam.get("nombre").valid) ? "" : this.nombre.nativeElement.placeholder = msg;
      (this.formTeam.get("apellido").valid) ? "" : this.apellido.nativeElement.placeholder = msg;
      (this.formTeam.get("cargo").valid) ? "" : this.cargo.nativeElement.placeholder = msg;
      this.activeValidator = true;
    }
  }

  cleanFields() {
    this.formTeam.reset();
    this.formProperties.nombre.error = 
      this.formProperties.apellido.error = 
        this.formProperties.cargo.error = false;
  }

  alertModal(msg: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${msg}</p>`;    
  }

  private buildForm() {
    this.formTeam = this.formBuilder.group({
      id: 0,
      nombre: [ '',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.nombre.maxCaracteres),
        ],
      ],
      apellido: [ '',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.apellido.maxCaracteres),
        ],
      ],
      cargo: [ '',
      [
        Validators.required,
        Validators.maxLength(this.formProperties.cargo.maxCaracteres),
      ],
    ]
    });
  }

  patternValidation(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[A-Za-z0-9\s.:;,áéíóú]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }

  patternValidationPaste(event) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    var phoneRGEX = /^[A-Za-z0-9\s.:;,áéíóú]+$/g;
    return (phoneRGEX.test(pastedText)) ? true : false;
  }
}
