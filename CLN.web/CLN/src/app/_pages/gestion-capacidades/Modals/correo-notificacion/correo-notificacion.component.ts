import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-correo-notificacion',
  templateUrl: './correo-notificacion.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './correo-notificacion.component.scss'
  ]
})
export class CorreoNotificacionComponent implements OnInit {

  message: string;
  form: FormGroup
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.form = this.formBuilder.group({
      "correos": new FormControl('', [Validators.minLength(5), Validators.required]),
    })
  }

  send() {
    if (this.activeEmailData) {
      this.modal.close(this.form.get("correos").value);
    }
  }

  continue() {
    if (!this.activeEmailData) {
      this.modal.close("");
    }
  }

  closeAction() {
    this.modal.close("no");
  }
  public activeEmailData: boolean = false;
  public validatingEmail() {
    const formReader = this.form.value;
    var emailData = formReader.correos;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var allFine: boolean = true;
    emailData.split(",").forEach(correo => {
      (!allFine) ? "" : (re.test(String(correo.trim()).toLowerCase())) ? allFine = true : allFine = false;
    });
    (!allFine) ? this.activeEmailData = false : this.activeEmailData = true;
  }

}
