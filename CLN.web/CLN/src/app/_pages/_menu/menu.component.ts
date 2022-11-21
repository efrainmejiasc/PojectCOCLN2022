import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Observable, Subscription } from 'rxjs';

import { UserCas, IcasResponse, ICasUrl } from 'src/app/_model/_compras-publicas/cas.interfaces';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, OnDestroy {

  @Input() childData: boolean;
  @Input() closeActionByOutsideClickPattern: any;

  //Variables temporales
  isUserAuth:boolean = false;
  isAdmin:boolean;
  userCas:UserCas;
  private userCasSubscription:Subscription;

  //
  dataFromUrl:any;
  iCasUrl:ICasUrl;
  showLoading:boolean = false;
  hideCloseSessionBox:boolean = false;
  hideLoginViewForAdmin = false;
  href:string = "";

  userAuthSubscription:Subscription;
  userInfoSubscription:Subscription;
  loadingSubscripcion:Subscription;

  showAlert: boolean= false;
  message: string = ""
  option:string = ""

  session: boolean;

  constructor(
    private router: Router,
    private authService:AuthenticationService,
    private layoutService:LayoutService) {}

  ngOnInit() {

    localStorage.removeItem("validations");

    this.layoutService.showLoading();

    this.href = this.router.url;

    this.loadingSubscripcion = this.layoutService.loadingEmisor.subscribe((valor:boolean) =>{
      this.showLoading = valor;
    });

    if(this.href === "/login-admin"){
      this.hideLoginViewForAdmin = true;
    }
    else{
      this.hideLoginViewForAdmin = false;
    }

    this.userAuthSubscription = this.authService.onLoginLogoutSubject.subscribe((valor:boolean) =>{
      this.hideLoginViewForAdmin = false;
    });

    this.userCasSubscription = this.authService.userBSubject.subscribe(data =>{
      this.userCas = data;

      if(data){
        this.isUserAuth = true;
      }else{
        this.isUserAuth = false;
      }

      this.layoutService.closeLoading();
    });
  };

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
    this.userCasSubscription.unsubscribe();
  }

  generateUrlForLogin(loginLocal = false){
    
    this.session = loginLocal

    this.layoutService.showLoading();

    this.authService.generateUrl().subscribe(data =>{

        let response:IcasResponse = data;

        if(response.succeeded){
          this.dataFromUrl = data;
          this.iCasUrl = response.data as ICasUrl;
          this.authService.iCasUrl = this.iCasUrl;
        }
        console.log(this.authService);
        
        this.authService.onReceivingDynamicUrl.next(this.authService.iCasUrl.url);
        this.authService.waitForLogin(this.authService.iCasUrl.id, loginLocal)

        this.layoutService.closeLoading();
    })
  }

  toogleCloseSession(){
    this.hideCloseSessionBox = !this.hideCloseSessionBox;
  }

  logout(){

    // this.authService.logoutCLN(window.location.origin).subscribe((data: any) => {
    //   this.hideCloseSessionBox = false;
    //   this.authService.logout();
    // }, error => {});
    
    this.hideCloseSessionBox = false;
    this.authService.logout()
  }

  navigateToPanel(){
    this.option = 'home';
    this.getLocalStorage();
  }

  navigateToRoot(){
    this.option = 'root';
    this.getLocalStorage();
  }

  closeAlert(close: boolean){

    if(close){
      this.showAlert = false;
      if(this.option === 'root'){
        localStorage.removeItem("validations"); 
        this.router.navigate([''])
      }else if(this.option === 'home'){
        localStorage.removeItem("validations");
        this.router.navigate(['panel'])
      }
      return;
    }

    this.showAlert = false;

  }

  getLocalStorage(){
    const localStorageStates = JSON.parse(localStorage.getItem('validations'))

    if( !localStorageStates ){
      if(this.option === 'root'){
        localStorage.removeItem("validations"); 
        this.router.navigate([''])
      }else if(this.option === 'home'){
        localStorage.removeItem("validations");
        this.router.navigate(['panel'])
      }
    }else{

      const encontrado = localStorageStates.find(local => local.valor);

      if(!encontrado){
        if(this.option === 'root'){
          localStorage.removeItem("validations"); 
          this.router.navigate([''])
        }else if(this.option === 'home'){
          localStorage.removeItem("validations");
          this.router.navigate(['panel'])
        }
        return;
      }

      this.message = encontrado.mensaje;
      this.showAlert = true;
      

    }
    
  }


  ngOnChanges(changes: SimpleChanges) {

  }
}


/*

import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AutodiagnosticoComponent } from '../diagnostico/autodiagnostico/autodiagnostico.component'
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import { DataServicio } from 'src/app/_services/data.service';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, OnDestroy {

  //Variables temporales

  usuarioAutenticado:boolean = false;
  esAdmin:boolean;

   // variables A Forero


   mostrarCerrarSesion:boolean = false;
   esconderLoginAdmin = false;
   href:string = "";

   loadingSubscripcion:Subscription;
   usuarioAutenticadoSubscripcion:Subscription;

  ///

  userlogged: any;
  autodiagnostico: any;
  home: number;
  quieroInformarme: number;
  quieroAprender: number;
  contacto: number;
  navShow: any;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private dataServicio:DataServicio,
    ) { }

  @Input() childData: boolean;
  @Input() closeActionByOutsideClickPattern: any;

  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["childData"];
    const closeEvent = changes["closeActionByOutsideClickPattern"];
    if (changeEvent && changeEvent.currentValue != undefined) {
      if (changeEvent.currentValue) {
        this.mainActive = true;
      } else {
        this.mainActive = false;
      }
    }
    if (closeEvent && closeEvent.currentValue != undefined) {
      this.identifyClickOutSide(closeEvent.currentValue);
    }
  }

  ngOnInit() {

    this.href = this.router.url;

    if(this.href === "/login-admin"){
      this.esconderLoginAdmin = true;
    }

    this.loadingSubscripcion = this.layoutService.loadingEmisor.subscribe((valor:boolean) =>{
      this.runLoading = valor;
    });

    this.usuarioAutenticadoSubscripcion = this.dataServicio.alAutenticarse.subscribe((valor:boolean) =>{
      this.usuarioAutenticado = valor;
    });

    this.esAdmin = this.auth.esAdmin;

    this.auth.actualUser$.subscribe(data => {

      this.userlogged = data;
      this.activeMainIcon(this.router.url);
      this.router.events.subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            this.activeMainIcon(event.url);
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscripcion.unsubscribe();
    this.usuarioAutenticadoSubscripcion.unsubscribe();
  }

  public mainActive: boolean = false;

  activeMainIcon(url) {
    if (url == "/menudinamico") {
      this.mainActive = false;
    } else {
      this.mainActive = true;
    }
  }

  do_Logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  activeMenu(menu: string) {
    console.log(menu);
    if (menu == 'home') {
      this.home = 1;
      this.autodiagnostico = 0;
      this.quieroInformarme = 0;
      this.quieroAprender = 0;
      this.contacto = 0;
    } else if (menu == 'autodiagnostico') {
      this.autodiagnostico = 1;
      this.home = 0;
      this.quieroInformarme = 0;
      this.quieroAprender = 0;
      this.contacto = 0;
    } else if (menu == 'quieroInformarme') {
      this.quieroInformarme = 1;
      this.autodiagnostico = 0;
      this.home = 0;
      this.quieroAprender = 0;
      this.contacto = 0;
    } else if (menu == 'quieroAprender') {
      this.quieroAprender = 1;
      this.quieroInformarme = 0;
      this.autodiagnostico = 0;
      this.home = 0;
      this.contacto = 0;
    } else if (menu == 'contacto') {
      this.contacto = 1;
      this.quieroAprender = 0;
      this.quieroInformarme = 0;
      this.autodiagnostico = 0;
      this.home = 0;
    }

  }

  @HostListener('window:location', ['$event'])
  onLocation(event) {
    console.log(event)
  }

  @Output() evento = new EventEmitter<boolean>();
  toHome() {
    if (localStorage.getItem('position') && localStorage.getItem('position') == "child") {
      this.evento.next(true)
    } else {
      this.router.navigate(["/menudinamico"]);
    }
  }

  public viewOption: boolean = false;

  activeOptions() {
    (this.viewOption) ? this.viewOption = false : this.viewOption = true;
  }

  public identifyClickOutSide(e) {
    var id = 'buttonOptions';
    var b = document.getElementById(id);
    if(b) {
      if (!b.contains(e.target)) {
        this.viewOption = false
      }
    }
  }

  palancaLogin(){
    this.dataServicio.generarUrl();
    this.layoutService.toogleLoading();
  }

  palancaCerrarSesion(){

    this.mostrarCerrarSesion = !this.mostrarCerrarSesion;
  }

  navegarAlHome(){
    this.router.navigate(['panel']);
  }

  navegarAlRoot(){
    this.router.navigate(['/']);
  }
}


*/
