import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/_services/helper.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { DataService } from 'src/app/_services/_compras-publicas/data.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() isLocalSession: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private layoutService:LayoutService,
    private sanitizer: DomSanitizer,
    private router:Router
  ) { }

  /* public loginForm: FormGroup;

  ngOnInit() {
    this.auth.actualUser$.subscribe((data) => {
      (data === null) ? "" : this.router.navigate(["/menudinamico"]);
    });
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.alertModal(`<p class='mt-2 py-4 col-sm-12 text-center'>Completa el formulario.</p>`);
      return;
    }
    this.authenticationService.login(this.loginForm.value.Email, this.loginForm.value.Password).
      pipe(first()).subscribe(dep => {
        this.res = dep;
        if(this.res.idUsuario === undefined || this.res.idUsuario === null) {
          if(this.res === 'El usuario y/o la contraseña no son válidos.') {
            if(this.countInvalido >= 3) {
              let url = window.location.href;
              url = url.replace('login', 'restorePassword');
              this.res = `Su usuario y/o contraseña continúa siendo inválidos, para autenticarse le sugerimos <b><a href="${url}">Restablecer su contraseña</a></b>.`;
            }
            this.countInvalido++;
          }
          this.alertModal(`<p class='mt-2 py-4 col-sm-12 text-center'>${this.res}</p>`);
        } else {
          localStorage.setItem('loginUser', '1');
          if (this.res.cambioClave) {
            this.router.navigate(['/changepassword'], {});
          } else {
            this.router.navigate(['/menudinamico'], {});
          }
          this.authenticationService.reloadSession()
        }
      }, err => {
        this.alertModal(`<p class='mt-2 py-4 col-sm-12 text-center'>${err.error.Message}</p>`);
      });
  }

  navigateHome() {
    this.router.navigate(['/login']);
  }

  do_LookMyPass(param?: string) {
    (this.lookpass) ? this.lookpass = false : this.lookpass = true;
  }

  alertModal(message: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = message;
  } */

  activeLogin:boolean = false;
  loginForAdmin:boolean = false;
  loginSubscription:Subscription;
  usuarioAutenticadoSuscripcion:Subscription;
  dynamicIdSubscription:Subscription;
  idDinamico:String;
  dynamicUrl:string;
  casUrl:string = environment.casUrl;
  iFrameUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl("");
  formularioEnviado:boolean = false;
  recuperarPassword:boolean = false;
  recuperarForm:FormGroup;
  mostrarMensajeSatisfactorio:boolean = false;
  showUsuarioInvalido:boolean = false;
  formEmail:string = "";
  sendingMail:boolean = false;
  showTimerMessage:boolean = false;

  ngOnInit(): void {

    this.isLocalSession = JSON.parse(localStorage.getItem('isLocalSession'));

    this.dynamicIdSubscription = this.auth.onReceivingDynamicUrl.subscribe(dynamicUrl =>{
      this.layoutService.cerrarLoading();
      this.dynamicUrl = dynamicUrl;
      this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.casUrl}${this.dynamicUrl}`)
      this.activeLogin = true;
    });

    this.usuarioAutenticadoSuscripcion = this.auth.onLoginLogoutSubject.subscribe((valor:boolean) =>{
      this.activeLogin = false;
    })

    this.recuperarForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

    if(this.router.url === "/login-admin"){
      this.loginForAdmin = true;
    }
  }

  ngOnDestroy(){
    this.dynamicIdSubscription.unsubscribe();
    this.usuarioAutenticadoSuscripcion.unsubscribe();
    //this.loginSubscription.unsubscribe();
  }

  palancaLogin(){

    this.formularioEnviado = false;
    this.activeLogin = false;
    this.recuperarPassword = false;
    this.mostrarMensajeSatisfactorio = false;
    this.showUsuarioInvalido = false;
  }

  onSubmit(){
    this.formularioEnviado = true;
  }

  onRecuperarPassword(){
    this.recuperarPassword = true;
  }

  onClickRecuperar(){

    this.layoutService.showLoading();

    this.formEmail = this.recuperarForm.value.email;

    this.auth.recoverPasswordByEmail(this.formEmail).subscribe( (data:any) =>{

      let response= data;

      if(response.succeeded){
        this.mostrarMensajeSatisfactorio = true;
        this.mostrarMensajeSatisfactorio = true;
        this.sendingMail = true;

        setTimeout(()=>{
          this.sendingMail = false;
          this.showTimerMessage = false;
        }, 10000);
      }else{

        this.showUsuarioInvalido = true;
      }
      this.layoutService.cerrarLoading();
    })
  }

  onVolverAEnviar(){
    if(this.sendingMail){

      this.showTimerMessage = true;

      return;
    }
    this.mostrarMensajeSatisfactorio = false;
  }
}
