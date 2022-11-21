import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';
import { flushMicrotasks } from '@angular/core/testing';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { user } from 'src/app/_model/user-data/user.module';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('modalrestore', { static: false }) modalCambioPass;

  userlogged: any;
  lookpass1: boolean = false;
  lookpass2: boolean = false;
  changePassEnabled: boolean = false;
  openModal: boolean = false;
  messageCambioPass: any;

  passOK: boolean = false;
  passNOT: boolean = false;
  passIQUAL: boolean = false;
  password: any;
  confirmpassword: any;

  constructor(private auth: AuthenticationService, private router: Router, configModal: NgbModalConfig, private modalService: NgbModal) { }
  ngOnInit() {
    this.password = '';
    this.confirmpassword = '';

    this.auth.actualUser$.subscribe(data => {
      console.log("login data");
      console.log(data);
      this.userlogged = data;
    });


    if (this.userlogged == null) {
      this.router.navigate(['/login']);
    }

  }

  do_Main() {
    if (this.userlogged.idRol == 2) {
      this.router.navigate(['/autodiagnostico'])
    } else if (this.userlogged.idRol == 1) {
      this.router.navigate(['/admin'])
    }
  }

  do_LookMyPass(param: String) {
    if (param == "1") {
      (this.lookpass1) ? this.lookpass1 = false : this.lookpass1 = true;

    } else if (param == "2") {
      (this.lookpass2) ? this.lookpass2 = false : this.lookpass2 = true;
    }
  }

  checkPass(event) {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{7,}$/gm;
    let found = this.password.match(regex);
    console.log(found);
    if (found != null) {
      this.passOK = true;
      this.passNOT = false;
    } else {
      this.passOK = false;
      this.passNOT = true;
    }

    if (this.password != this.confirmpassword) {
      this.passIQUAL = true;
    } else {
      this.passIQUAL = false;
    }
    if (!this.passIQUAL && this.passOK) {
      this.changePassEnabled = true;
    } else {
      this.changePassEnabled = false;
    }

  }

  do_SaveNewPass() {
   /*  if (this.changePassEnabled) {
      this.userlogged.clave = this.password;
      var usuario: user = new user();
      usuario.idUsuario = this.userlogged.idUsuario;
      usuario.clave = this.password;
      this.auth.changePass(usuario).subscribe(res => {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Su contraseña ha sido modificada correctamente</p>`;
        setTimeout(() => {
          this.router.navigate(["/menudinamico"]);
        }, 2000);
      }, error => {
        console.log(error);
      });
    } */
  }

  closeModal() {
    this.openModal = false;
    this.password = '';
    this.confirmpassword = '';
    this.modalService.dismissAll();
    this.router.navigate(['/admin']);
  }

}
