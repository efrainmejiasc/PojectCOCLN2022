import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../environments/environment';
import { user } from 'src/app/_model/user-data/user.module';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
    @ViewChild('modalrestore', { static: false }) modalRestorePass;

    email: any;
    openModal: any;
    restoreMessage: any;
    restorePassEnabled = false;

    constructor(
        private auth: AuthenticationService,
        private router: Router,
        configModal: NgbModalConfig,
        private modalService: NgbModal) { }

    ngOnInit() {

    }

    do_closeModal() {
        this.openModal = false;
        this.modalService.dismissAll();
    }

    do_mailCheck() {
        var reg = /^[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,3}$/;
        var valid = reg.test(this.email);
        if (valid) {
            this.restorePassEnabled = true;
            console.log("mail valid");
        } else {
            this.restorePassEnabled = false;
            console.log("mail invalid");
        }
    }

   /*  do_restorePass() {
        var usuario: user = new user();
        usuario.correoElectronico = this.email;
        this.auth.recoverPasswordByEmail(usuario).subscribe(res => {
            const ref = this.modalService.open(AlertModalComponent, {
                centered: true,
                backdrop: 'static',
                keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Su solicitud para recuperar contraseña ha sido exitosa, por favor revise su correo electrónico</p>`;
            setTimeout(() => {
                this.router.navigate([""]);
            }, 2000);
        }, error => {
            console.log(error);
            console.log(error['error']['Message']);
            this.restoreMessage = error['error']['Message'];
            this.openModal = true;
            this.modalService.open(this.modalRestorePass, { size: 'lg', centered: true });
        });
    } */

}
