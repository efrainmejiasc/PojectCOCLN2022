import { Component, OnInit } from '@angular/core';
import { GestionMisInteresesService } from 'src/app/_services/_gestion-mis-intereses/gestion-mis-intereses.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Subscription } from 'rxjs';
import { UserCas } from 'src/app/_model/_compras-publicas/cas.interfaces';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seleccion-empresa',
  templateUrl: './seleccion-empresa.component.html',
  styleUrls: ['./seleccion-empresa.component.scss']
})
export class SeleccionEmpresaComponent implements OnInit {

  empresaSelected:any = {
    companyProfileId:null,
    name: "",
    identifier: "",
    country:"",
    city: "",
    sector:"",
    email:"",
    phone:null,
    industries:[]
  };

  empresaSelectedSubscription:Subscription;
  empresas:any[] = [];
  showEmpresaSelected:boolean = false;
  salir:boolean = true;
  showAlertOut:boolean = false;
  notificationCambiosMessage = "¿Desea salir sin guardar los cambios?";

  isPlansAcquisition: boolean = environment.isPlansAcquisition;

  opciones: any[] = [
    {
      title: 'PROCESOS DE COMPRAS PÚBLICAS',
      defaultImage: 'assets/imgs/iconos/procesos.svg',
      whiteImage:'assets/imgs/iconos/procesosenblanco.svg',
      onClick:(option:string)=>this.selectOption(option)
    },
    {
      title: 'PLANES ANUALES DE ADQUISICIONES',
      defaultImage: 'assets/imgs/iconos/planes.svg',
      whiteImage:'assets/imgs/iconos/planesenblanco.svg',
      onClick:(option:string)=>this.selectOption(option)
    },
    {
      title: 'NOTIFICACIONES',
      defaultImage: 'assets/imgs/iconos/campana.svg',
      whiteImage:'assets/imgs/iconos/campanaenblanco.svg',
      onClick:(option:string)=>this.selectOption(option)
    }
  ];
  
  elegirMenu() {
    if (!this.isPlansAcquisition) {
      this.opciones = [
        {
          title: 'PROCESOS DE COMPRAS PÚBLICAS',
          defaultImage: 'assets/imgs/iconos/procesos.svg',
          whiteImage: 'assets/imgs/iconos/procesosenblanco.svg',
          onClick: (option: string) => this.selectOption(option)
        },
        {
          title: 'NOTIFICACIONES',
          defaultImage: 'assets/imgs/iconos/campana.svg',
          whiteImage: 'assets/imgs/iconos/campanaenblanco.svg',
          onClick: (option: string) => this.selectOption(option)
        }
      ];
    }
  }

  selectedOption = "";
  selectedOptionOnWait = "";


  showProcesos:boolean = false;
  showAdquisiciones:boolean = false;
  showAlertas:boolean = false;

  userCasSubscription:Subscription;
  userCas:UserCas;
  cambioSubscription:Subscription;

  constructor(private dataService:GestionMisInteresesService,
              private authService:AuthenticationService,
              private layoutService:LayoutService) {}

  ngOnInit() {
    this.elegirMenu();
    this.layoutService.showLoading();

    window.scrollTo(0, 0);

    this.userCasSubscription = this.authService.userBSubject.subscribe(data =>{
      this.userCas = data;
      this.layoutService.closeLoading();
      this.getEmpresas();
    });

    this.cambioSubscription = this.layoutService.cambiosEmisor.subscribe(data =>{
      this.salir = data;
    });
  };

  getEmpresas(){

    this.layoutService.showLoading();

    let mail = this.userCas.email;

    this.dataService.getEmpresas(mail).subscribe((response:any)=>{

       const empresasData = response.data;
       

      for(var i=0; i<empresasData.length; i++){
        const empresaData = empresasData[i];

        const empresa ={
          id:(empresaData.companyProfileId) ? empresaData.companyProfileId : null,
          casId:(empresaData.companyId) ? empresaData.companyId : null,
          name: (empresaData.companyName) ? empresaData.companyName : "",
          identifier: (empresaData.companyId) ? empresaData.companyId : 0,
          country:(empresaData.country) ? empresaData.country : "",
          city: (empresaData.city) ? empresaData.city : "",
          sector:(empresaData.sector) ? empresaData.sector : "",
          email:(empresaData.email) ? empresaData.email : "",
          phone:(empresaData.phone) ? empresaData.phone : "",
          industries:(empresaData.industries) ? empresaData.industries : []
        };

        this.empresas.push(empresa);

        this.layoutService.closeLoading();
      };
    });
  };


  selectOption(option:string){

    if(this.salir){
      this.selectedOption = option;
    }else{
      this.selectedOptionOnWait = option;
      this.showAlertOut = true;
    }
  }

  /* changeOption(){

    if(this.selectedOption === "PROCESOS DE COMPRA PÚBLICA"){
      this.showProcesos = !this.showProcesos;
      this.showAdquisiciones = false;
      this.showAlertas = false;

    }else if(this.selectedOption === "PLANES ANUALES DE ADQUISICIONES"){
      this.showAdquisiciones = !this.showAdquisiciones;
      this.showProcesos = false;
      this.showAlertas = false;

    }else if(this.selectedOption === "NOTIFICACIONES"){
      this.showAlertas = !this.showAlertas;
      this.showProcesos = false;
      this.showAdquisiciones = false;
    }
  } */

  /* toogleProcesos(){
    this.showProcesos = !this.showProcesos;
    this.showAdquisiciones = false;
    this.showAlertas = false;
  };

  toogleAdquisiciones(){
    this.showAdquisiciones = !this.showAdquisiciones;
    this.showProcesos = false;
    this.showAlertas = false;
  };

  toogleAlertas(){
    this.showAlertas = !this.showAlertas;
    this.showProcesos = false;
    this.showAdquisiciones = false;
  }; */

  idEmpresaSelected(id:number) {

    this.showEmpresaSelected = false;
    this.layoutService.showLoading();

    setTimeout(()=>{
      this.empresaSelected = null;

      for(var i=0; i<this.empresas.length; i++){
        const empresa = this.empresas[i];
        if(empresa.id === id){
          this.empresaSelected = empresa;
          this.showEmpresaSelected = true;
        };
      };

      this.selectedOption = '';

      this.layoutService.closeLoading();
    }, 700);

    this.dataService.setIdCompanyProfile(id);
  };

  closePopupCambios(valor){

    this.showAlertOut = false;

    if(valor){
      this.selectedOption = this.selectedOptionOnWait;
    }
  }
};
