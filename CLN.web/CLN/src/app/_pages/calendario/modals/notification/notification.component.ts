import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { notification } from 'src/app/_model/calendario/notification.model';
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { NotificacionBuild, TipoMensaje } from '../../utils/notificacion-build';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private calendarioService: CalendarioService
  ) { }
  id: any;
  form: FormGroup;
  ngOnInit() {
    this.spinner.show();
    this.buildForm();
  }

  formProperties = {
    msjSaludo: {
      maxCaracteres: 50
    },
    msjDespedida: {
      maxCaracteres: 50
    },
    msjCuerpoCorreo: {
      maxCaracteres: 300
    },
    msjEvento: {
      maxCaracteres: 300
    },
  };

  private buildForm() {
    this.form = this.formBuilder.group({
      'msjSaludo': new FormControl('Cordial saludo', [Validators.required, Validators.maxLength(this.formProperties.msjSaludo.maxCaracteres)]),
      'msjDespedida': new FormControl('Cordialmente', [Validators.required, Validators.maxLength(this.formProperties.msjDespedida.maxCaracteres)]),
      'msjCuerpoCorreo': new FormControl("Mensaje a comunicar", [Validators.maxLength(this.formProperties.msjCuerpoCorreo.maxCaracteres)]),
      'msjEvento': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(this.formProperties.msjEvento.maxCaracteres)]),
      "typelink": new FormControl(0),
    });
    this.getContent();
  }

  getContent() {
    if (this.id !== '0') {
      this.calendarioService.getSettingsbyParameter("MsjSaludoEvento")
        .subscribe(responseOne => {
          this.form.get("msjSaludo").setValue(responseOne[0].valor);
          this.calendarioService.getSettingsbyParameter("MsjDespedidaEvento")
            .subscribe(responseTwo => {
              this.form.get("msjDespedida").setValue(responseTwo[0].valor);
              this.calendarioService.getSettingsbyParameter("MsjCuerpoCorreoEvento")
                .subscribe(responseThree => {
                  this.form.get("msjCuerpoCorreo").setValue(responseThree[0].valor);
                  this.calendarioService
                    .getEventDetail(this.id.toString())
                    .subscribe((response) => {
                      this.spinner.hide();
                      console.log(response)
                      if (!response[0].privado) {
                        this.openAlert("El evento no tiene permitido enviar correos");
                        this.modal.close();
                      }
                      this.form.get("msjEvento").setValue(NotificacionBuild.getTemaSelected(response[0]));
                    })
                })
            })
        })
    }
  }

  patternValidation(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[A-Za-z0-9\s,.:;áéíóú]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }

  patternValidationPaste(event) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    var phoneRGEX = /^[A-Za-z0-9\s,.:;áéíóú]+$/g;
    return (phoneRGEX.test(pastedText)) ? true : false;
  }


  public save($event) {
    if (this.form.valid) {
      this.spinner.show();
      let notificationBody: notification = new notification();
      notificationBody = this.form.value;
      notificationBody.idEvento = this.id;
      console.log
      if (this.form.get("typelink").value == 1) {
        notificationBody.msjEvento = "";
      } else {
        notificationBody.msjEvento = this.form.get("msjEvento").value;
      }
      console.log(notificationBody)
      this.calendarioService.sendEmailEvent(notificationBody)
        .subscribe(response => {
          this.spinner.hide();
          if (response != true && response != false) {
            this.openAlert(response);
          } else {
            (response == true) ? this.openAlert("Se ha enviado la notificación a los correos electrónicos asociados") : this.openAlert("No se pudo enviar la notificación a los correos electrónicos asociados");;
            this.modal.close();
          }
        }, error => {
          this.spinner.hide();
          this.openAlert("Parece que estamos teniendo problemas para enviar tu notificación, por favor vuelve a intentarlo");
          this.modal.close();
        })
    }
  }

  openAlert(message: string) {
    const alert = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    alert.componentInstance.message = message;
  }
}
