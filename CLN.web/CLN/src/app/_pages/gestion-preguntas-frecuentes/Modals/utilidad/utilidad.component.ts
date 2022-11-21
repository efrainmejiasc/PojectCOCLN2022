import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-utilidad',
  templateUrl: './utilidad.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    './utilidad.component.scss']
})
export class UtilidadComponent implements OnInit {

  sendedData;
  typeData;
  dataReceive;
  form: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private preguntasService: PreguntasServiceService,
  ) { }
  formProperties = {
    descripcion: {
      maxCaracteres: 100,
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
    nombre: {
      maxCaracteres: 150,
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
  ngOnInit() {
    this.builderForm();
    this.verifyEditWorker();
  }
  private builderForm() {
    this.form = this.formBuilder.group({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.nombre.maxCaracteres)]),
    })
  }
  private editingGroup: boolean = null;
  private utilidadSelect: any;
  public adminView: boolean = false;
  private verifyEditWorker() {
    if (this.dataReceive != undefined && this.dataReceive != null) {
      this.editingGroup = true;
      this.utilidadSelect = JSON.parse(this.dataReceive)
      this.form.get("nombre").setValue(this.utilidadSelect.descripcion);
    }
  }
  @ViewChild('name', { static: false }) name: ElementRef;
  public activeValidator: boolean = false;
  save($event) {
    if (this.form.valid) {
      if(this.utilidadSelect) {
        this.utilidadSelect.descripcion = this.form.get("nombre").value;
        this.preguntasService.updateUtils(this.utilidadSelect)
          .subscribe(response => {
            this.modal.close(this.form.get("nombre").value);
          });
      } else {
        const utilidadObj = { descripcion: this.form.get("nombre").value };
        this.preguntasService.createUtils(utilidadObj)
        .subscribe(response => {
          this.modal.close();
        });
      }
    } else {
      this.activeValidator = true;
      this.name.nativeElement.placeholder = 'Por favor ingrese información en este campo';
    }
  }
}
