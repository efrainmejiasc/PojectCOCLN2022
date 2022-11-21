import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminWebService } from 'src/app/_services/admin-web/admin-web.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-data-migration',
  templateUrl: './data-migration.component.html',
  styleUrls: ['./data-migration.component.scss',
    "../../../../_shared/styles/tables.scss",
    "../../../../_shared/styles/modals.scss",]
})
export class DataMigrationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private adminWebService: AdminWebService,
    private modalService: NgbModal) { }

  public form: FormGroup;
  ngOnInit() {
    this.buildForm();
  }
  formProperties = {
    validarone: {
      maxCaracteres: 50,
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
    validartwo: {
      maxCaracteres: 10,
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

  titulo = [
    "E-mail para proceso de migración de datos",
    "Migrar componente",
    "Aquí podrá parametrizar la cuenta de correo electrónico al cual llegará el reporte de fallos del proceso de migración de datos para Power BI"
  ];

  public buildForm() {
    this.form = this.formBuilder.group({
      "email": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validarone.maxCaracteres), Validators.email]),
    })
    this.initDataPersist();
  }
  protected emailPersist: String = null;
  public initDataPersist() {
    this.adminWebService.getCorreoLogHistorico()
      .subscribe(data => {
        if (data.length > 0) {
          this.emailPersist = data[0].valor;
          this.form.get("email").setValue(data[0].valor);
        }
      })
  }

  public activeValidator: boolean = false;
  @ViewChild('email', { static: false }) email: ElementRef;
  save($event) {
    if (this.form.valid == false) {
      this.activeValidator = true;
      (this.form.get("email").valid) ? "" : this.email.nativeElement.placeholder = 'Por favor ingrese información en este campo';
    } else {

      if (this.emailPersist && this.emailPersist != this.form.get("email").value || !this.emailPersist) {
        this.buildAndSend();
      } else {
        const dialogRef = this.modalService.open(AlertModalComponent, {
          backdrop: false,
          keyboard: false,
          centered: true
        });
        dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>No puedes sobreescribir esta información</p>";
      }
    }
  }

  public buildAndSend() {
    const formReader = this.form.value;
    this.adminWebService.updateCorreoLogHistorico(formReader.email)
      .subscribe(res => {
        console.log(res)
        if (res.length > 0) {
          const dialogRef = this.modalService.open(AlertModalComponent, {
            backdrop: false,
            keyboard: false,
          });
          if (this.emailPersist) {
            dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>Se ha actualizado correctamente el E-mail para el envío de correos sobre el proceso de migración de datos.</p>";
          } else {
            dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>Se ha guardado correctamente el E-mail para el envío de correos sobre el proceso de migración de datos.</p>";
          }
          this.emailPersist = formReader.email;
        }
      })
  }

  patternValidation(e) {
    var phoneRGEX = /^[A-Za-z0-9@.]+$/g;
    if (phoneRGEX.test(e.key)) return true; else return false;
  }
}
