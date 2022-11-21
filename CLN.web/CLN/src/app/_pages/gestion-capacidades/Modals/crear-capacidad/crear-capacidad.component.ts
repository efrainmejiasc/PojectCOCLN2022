import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { capacidad } from 'src/app/_model/capacidad/capacidad.model';
import { capacidadPadre } from 'src/app/_model/capacidad/capacidadPadre.model';
import { tipoCapacidad } from 'src/app/_model/capacidad/tipoCapacidad.model';
import { GestionCapacidadesService } from 'src/app/_services/gestion-capacidades/gestion-capacidades.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-crear-capacidad',
  templateUrl: './crear-capacidad.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './crear-capacidad.component.scss'
  ]
})
export class CrearCapacidadComponent implements OnInit {

  sendedData;
  dataReciber;
  public permits;
  form: FormGroup;
  formProperties = {
    capacidad: {
      maxCaracteres: 200,
      validacion: [
        {
          name: "required",
          message: "Por favor ingrese información en este campo",
          state: true,
        },
        {
          name: "maxlength",
          message: `Se alcanzó el máximo de caracters permitido (100)`,
          state: false,
        },
      ],
    },
    afirmacion: {
      maxCaracteres: 300,
      validacion: [
        {
          name: "required",
          message: "Por favor ingrese información en este campo",
          state: true,
        },
        {
          name: "maxlength",
          message: `Se alcanzó el máximo de caracters permitido (50)`,
          state: false,
        },
      ],
    },
  };
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private gestionService: GestionCapacidadesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      "capacidad": new FormControl(["0", [Validators.required]]),
      "capacidadestrategica": new FormControl(["0", [Validators.required]]),
      "capacidadescripcion": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.capacidad.maxCaracteres)]),
      "afirmacion": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.afirmacion.maxCaracteres)])
    });
    this.fetchAbilities();
  }
  public listCapacidades: Array<tipoCapacidad> = []
  private fetchAbilities() {
    this.gestionService.getAbilityTypesforListAbilites()
      .subscribe(data => {
        this.listCapacidades = data;
        this.editWorker();
      })
  }
  private capacidadEditing: any;
  private editWorker() {
    if (this.dataReciber != null) {
      var data = JSON.parse(this.dataReciber)
      this.form.get("capacidadescripcion").setValue(data.nombre)
      this.form.get("afirmacion").setValue(data.afirmacion)
      this.gestionService.getAbilityDetail(data.id)
        .subscribe(data => {
          this.form.get("capacidad").setValue(data[0].idTipo)
          this.form.get("capacidad").disable();
          this.capacidadEditing = data[0];
          this.validationCapacidad();
        })
    }
  }
  public listCapacidadesPadre: Array<capacidadPadre> = []
  public idPadre: capacidadPadre = new capacidadPadre();
  public valueTextCapacidad = ""
  public validationCapacidad() {
    this.listCapacidadesPadre = [];
    const formReader = this.form.value;
    var capacidad: tipoCapacidad = this.listCapacidades.filter(capac => capac.id == this.form.get("capacidad").value)[0];
    if (capacidad.tipoCapacidad == "Estratégicas" || capacidad.tipoCapacidad == "Personales") {
      this.valueTextCapacidad = "orientadora"
    } else {
      this.valueTextCapacidad = "estratégica"
    }
    (capacidad.capacidadPadre == undefined || capacidad.capacidadPadre.length < 1) ? this.listCapacidadesPadre = [] : this.listCapacidadesPadre = capacidad.capacidadPadre;
    if (this.dataReciber != null) {
      this.idPadre = this.listCapacidadesPadre.filter(padre => padre.id == this.capacidadEditing.idPadre)[0];
      this.form.get("capacidadestrategica").setValue(this.idPadre.id)
      this.form.get("capacidadestrategica").disable();
    }
  }

  public actionCapacidad($event) {
    this.form.get("capacidadestrategica").setValue($event);
  }

  public save($event) {
    if (this.form.valid) {
      this.spinner.show();
      const formReader = this.form.value;
      let cap: capacidad = new capacidad();
      cap.nombre = formReader.capacidadescripcion;
      cap.afirmacion = formReader.afirmacion;
      if (this.dataReciber == null) {
        cap.idTipo = formReader.capacidad;
        cap.idPadre = formReader.capacidadestrategica;
        this.gestionService.saveCapacidad(cap)
          .subscribe(data => {
            this.spinner.hide();
            if (data.length > 0) {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> La capacidad y su afirmación han sido creadas correctamente.</p>`;
              this.modal.close();
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;
            }
          }, error => {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;
          })
      } else {
        cap.id = this.capacidadEditing.id;
        this.gestionService.updateCapacidad(cap)
          .subscribe(data => {
            this.spinner.hide();
            if (data.length > 0) {
              this.modal.close();
            } else {
              const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
              });
              ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;
            }
          }, error => {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;
          })
      }
    }
  }
  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}
