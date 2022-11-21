import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Validaciones } from "src/app/_shared/utils/validaciones";
import { GestionSecretariasService } from "src/app/_services/gestion-secretarias/gestion-secretarias";
import { GestionDepartamentoService } from "src/app/_services/gestion-secretarias/gestion-departamento";
import { GestionMunicipioService } from "src/app/_services/gestion-secretarias/gestion-municipio";
import { IntegranteFormViewComponent } from '../../modals/integrante-form-view/integrante-form-view.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrls: [
    '../../../../_shared/styles/tables.scss',
    '../../../../_shared/styles/modals.scss',
    './crear-editar.component.scss'
  ]
})
export class CrearEditarComponent implements OnInit {
  @ViewChild('secretario', { static: false }) secretario: ElementRef;
  activeValidator: boolean = false;
  
  id = 0;
  sendedData;
  form: FormGroup;
  secretaria: any = {};
  team: any[] = [];

  departamentos: any[] = [];
  municipios: any[] = [];

  formProperties = {
    departamento: {
      error: false,
    },
    municipio: {
      error: false,
    },
    secretario: {
      maxCaracteres: 100,
      validationMessages: {
        required: "El nombre es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (100)",
        state: true,
      },
      error: false,
    },
    direccion: {
      maxCaracteres: 100,
      validationMessages: {
        maxlength: "Se alcanzó el máximo de caracters permitido (100)",
        state: true,
      },
      error: false,
    },
    telefonoContacto: {
      maxCaracteres: 10,
      validationMessages: {
        pattern: 'Solo se permiten números',
        maxlength: "Se alcanzó el máximo de caracters permitido (10)",
        state: true,
      },
      error: false,
    },
    url: {
      maxCaracteres: 250,
      validationMessages: {
        maxlength: "Se alcanzó el máximo de caracters permitido (250)",
        state: true,
      },
      error: false,
    },
    correoInstitucional: {
      maxCaracteres: 30,
      validationMessages: {
        pattern: 'Correo invalido',
        maxlength: "Se alcanzó el máximo de caracters permitido (30)",
        state: true,
      },
      error: false,
    },
  };

  patternEmail = '^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$';

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private secretariaServices: GestionSecretariasService,
    private municipioServices: GestionMunicipioService,
    private departamentoServices: GestionDepartamentoService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.fetchDepartamentos();
    this.getContent();
    this.team = [];
  }

  getNombreBoton() {
    return this.team.length === 3 ? 'Gestionar integrantes' : 'Nuevo integrante secretaría';
  }

  getContent() {
    if(this.id !== 0) {
      this.secretariaServices.getContentDetail(this.id)
      .subscribe(response => {
        this.secretaria = response[0];
        this.fetchMunicipios(this.secretaria.departamento);
        if(this.secretaria.municipio === undefined || this.secretaria.municipio === null) {
          this.secretaria.municipio = 0;
        }
        this.form.patchValue(this.secretaria);        
      });
      this.secretariaServices.getSecretariaIntegrantes(this.id)
      .subscribe(response => {
        this.team = response;
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      idSecretaria: this.id,
      secretario: [
        this.secretaria.secretario,
        [
          Validators.required,
          Validators.maxLength(this.formProperties.secretario.maxCaracteres),
        ],
      ],
      direccion: [
        this.secretaria.direccion,
        [
          Validators.maxLength(this.formProperties.direccion.maxCaracteres),
        ],
      ],
      telefonoContacto: [
        this.secretaria.telefonoContacto,
        [
          Validators.maxLength(this.formProperties.telefonoContacto.maxCaracteres),
        ],
      ],
      correoInstitucional: [
        this.secretaria.correoInstitucional,
        [
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
          Validators.maxLength(this.formProperties.correoInstitucional.maxCaracteres),
        ],
      ],
      url: [
        this.secretaria.url,
        [
          Validators.maxLength(this.formProperties.url.maxCaracteres),
        ],
      ],
      departamento: ["", [Validators.required]],
      municipio: [0]
    });
  }

  fetchDepartamentos() {
    this.departamentoServices.getDepartamento()
    .subscribe((response) => {
      this.departamentos = response;
      this.fetchMunicipios(response[0].id);
    });
  }

  SelectedDepartamento(event) {
    this.fetchMunicipios(event.target.value);
  }

  fetchMunicipios(id: number) {
    this.municipioServices.getDepartamento(id)
    .subscribe(response => {
      this.municipios = response;
      if(this.id > 0) {
        this.municipios.push({ id: this.secretaria.municipio, nombre: this.secretaria.munNombre });
      }
    });
  }

  getEntidadTerritorial(): string {
    let entidad = '';
    if(this.form.value.departamento !== 0) {
      const depto = this.departamentos.find(c => c.id == this.form.value.departamento);
      entidad = depto.nombre;
      if(this.form.value.municipio !== 0) {
        const municipio = this.municipios.find(c => c.id == this.form.value.municipio);
        entidad += '/' + municipio.nombre; 
      }
    }
    return entidad;
  }

  teambuild() {
    const ref = this.modalService.open(IntegranteFormViewComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    ref.componentInstance.entidadTerritorial = this.getEntidadTerritorial();
    if(this.id > 0) {
      ref.componentInstance.secretariaId = this.id;
    }
    else {
      ref.componentInstance.integrantes = this.team;
    }
    ref.result.then(response => {
      this.team = response.integrantes;
      if(response.isUpdate) {
        this.openDialog('Se ha actualizado correctamente la información para los integrantes');
      }
    });
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const secretaria = this.form.value;
      if(secretaria.municipio === undefined || secretaria.municipio === 0) {
        const depto = this.departamentos.find(c => c.id == secretaria.departamento);
        secretaria.entidadTerritorial = depto.nombre; 
        secretaria.municipio = null;
      }
      else {
        const municipio = this.municipios.find(c => c.id == secretaria.municipio);
        secretaria.entidadTerritorial = municipio.nombre; 
      }
      if(this.id === 0) {
        secretaria.idEstado = 1;
        secretaria.equipo = this.team;
        this.secretariaServices.saveSecretaria(secretaria)
        .subscribe(response => {
          if(response.error != undefined && response.error) {
            let error = JSON.parse(response.message);
            this.openDialog(error[0].ErrorMessage);
            this.form.controls.departamento.setValue(0);
            this.form.controls.municipio.setValue(0);
          } else {
            this.modal.close(response[0]);
          }
        });
      }
      else {
        this.secretariaServices.updateSecretaria(secretaria)
        .subscribe(response => {
          this.modal.close(response);
        });
      }
    }
    else {
      (this.form.get("secretario").valid) ? "" : this.secretario.nativeElement.placeholder = 'Por favor ingrese información en este campo';
      this.activeValidator = true;
    }
  }
  
  validar(propiedad) {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
      if (rta.length === 1) {
        return rta[0];
      } else if (rta.length > 1) {
        let msg = '';
        rta.forEach(x => { msg += `${msg}\n`; });
        return msg;
      }
    }
  }

  validarCampo(propiedad) {
    return this.form.get(propiedad).status === 'INVALID';
  }

  openDialog(mensaje: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${mensaje}</p>`;
  }

  public numberValidate(event): boolean {
    return (event.key >= 0 && event.key != " ");
  }​​​​​​​​

  public emailValidator(event): boolean { 
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(event.target.value).toLowerCase());
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