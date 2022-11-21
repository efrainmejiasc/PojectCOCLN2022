import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { report } from 'src/app/_model/reports/report.model';
import { GestionReportesService } from 'src/app/_services/gestion-reportes/gestion-reportes.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  sendedData;
  dataReciber;
  public permits;
  form: FormGroup;
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
    bigtext: {
      maxCaracteres: 500,
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
      maxCaracteres: 50,
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
  roles: any[] = [];
  rolesSelected: any[] = [];
  ddRolesSettings = {
    singleSelection: false,
    idField: 'idRol',
    textField: 'nombre',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar',
  };
  public activeValidator: boolean = false;
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('report', { static: false }) report: ElementRef;
  @ViewChild('group', { static: false }) group: ElementRef;
  private ReportEdit: any;
  public rolDisabled: boolean = true;
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private reportesService: GestionReportesService
  ) { }


  ngOnInit() {
    this.buildForm();
  }
  private initRolesList() {
    this.reportesService.getRolesforListReports()
      .subscribe(response => {
        if (response.length > 0) {
          this.roles = response;
          this.rolDisabled = false;
          if (this.dataReciber != undefined && this.dataReciber != null) {
            this.buildEditInformation();
          }
        } else {
          this.modal.close("no-roles");
        }
      })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.nombre.maxCaracteres)]),
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.descripcion.maxCaracteres)]),
      'groupIdPBI': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.bigtext.maxCaracteres)]),
      'reportIdPBI': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.bigtext.maxCaracteres)]),
      'selectedItems': new FormControl([], [Validators.required]),
    });
    this.initRolesList();
  }

  private buildEditInformation() {
    this.reportesService.getReportDetail(JSON.parse(this.dataReciber).id)
      .subscribe(report => {
        this.ReportEdit = report[0];
        this.form.patchValue(this.ReportEdit);
        this.rolesSelected = this.ReportEdit.roles;
        this.form.get("selectedItems").setValue(this.rolesSelected);
      })
  }

  public disabledButton: boolean = true;
  save($event) {
    if (this.form.valid == false) {
      (this.form.get("nombre").valid) ? "" : this.name.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("descripcion").valid) ? "" : this.description.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("groupIdPBI").valid) ? "" : this.report.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("reportIdPBI").valid) ? "" : this.group.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      this.activeValidator = true;
    } else {
      this.reportesService.validateReportExistence(this.form.get("nombre").value)
        .subscribe(data => {
          (data.length > 0 && data[0].repetido == "true") ? (this.ReportEdit != undefined && this.ReportEdit.nombre == this.form.get("nombre").value) ? this.buildAndSend() : this.modalData("El nombre del reporte ya esta en uso, por favor modifique el nombre e intente nuevamente") : this.buildAndSend();
        })
    }
  }

  private modalData(message) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${message}</p>`;

  }

  private buildAndSend() {
    if (this.disabledButton == true) {
      this.disabledButton = false;
      const formReader = this.form.value;
      let reportBuild: report = new report();
      reportBuild = formReader;
      reportBuild.roles = [];
      this.rolesSelected.forEach((element) => {
        reportBuild.roles.push(element.idRol);
      });
      if (this.dataReciber != undefined) {
        reportBuild.id = this.ReportEdit.id;
        this.reportesService.updateReport(reportBuild)
          .subscribe(data => {
            var back: Array<any> = [reportBuild.nombre, false];
            this.modal.close(back);
          })
      } else {
        this.reportesService.saveReport(reportBuild)
          .subscribe(data => {
            var back: Array<any> = [reportBuild.nombre, false];
            this.modal.close(back);
          }, error => {
            this.disabledButton = true;
          })
      }
    }
  }

  patternValidation(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[A-Za-z0-9\s,.:;áéíóúñÑ]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }
  patternValidationPaste(event) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    var phoneRGEX = /^[A-Za-z0-9\s,.:;áéíóúñÑ]+$/g;
    return (phoneRGEX.test(pastedText)) ? true : false;
  }
  patternValidationBasic(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[a-z0-9-]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }
  patternValidationBasicPaste(event) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    var phoneRGEX = /^[a-z0-9-]+$/g;
    return (phoneRGEX.test(pastedText)) ? true : false;
  }
}
