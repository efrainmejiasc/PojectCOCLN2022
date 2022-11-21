import { Component, OnInit } from '@angular/core';
import { isThisWeek } from 'date-fns';
import { GestionarDisponibilidadService } from 'src/app/_services/_gestionar-disponibilidad/gestionar-disponibilidad.service';
import { filter } from 'rxjs/operators';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar-disponibilidad',
  templateUrl: './gestionar-disponibilidad.component.html',
  styleUrls: ['./gestionar-disponibilidad.component.scss']
})
export class GestionarDisponibilidadComponent implements OnInit {

  empresaSeleccionada: any = [
    {
      companyIdentifier: null
    }
  ];

  opciones: any[] = [
    {
      title: 'CÓMO FUNCIONAN LAS CITAS',
      defaultImage: 'assets/imgs/iconos/como_funciona.svg',
      whiteImage: 'assets/imgs/iconos/como_funciona_blanco.svg',
      onClick: (option: string) => this.selectOption(option),
      disabled: false
    },
    {
      title: 'ESTABLECER DISPONIBILIDAD',
      defaultImage: 'assets/imgs/iconos/establecer_disponibilidad.svg',
      whiteImage: 'assets/imgs/iconos/establecer_disponibilidad_blanco.svg',
      onClick: (option: string) => this.selectOption(option),
      disabled: true
    },
    {
      title: 'CITAS PROGRAMADAS',
      defaultImage: 'assets/imgs/iconos/citas_programadas.svg',
      whiteImage: 'assets/imgs/iconos/citas_programadas_blanco.svg',
      onClick: (option: string) => this.selectOption(option),
      disabled: true
    },
  ];

  listadoEmpresas: any = [];
  listadoEmpresasVisibles: any = [];

  selectedOption: string = this.opciones[0].title;
  wrapperActiveEmpresa: boolean = false;
  companyId: any = null;
  estaDisponibilidadCambiada = false
  isPopupCambios = false;
  mensajePopupCambios = '¿Desea salir sin guardar los cambios?';

  url: any;

  constructor(
    private gestionarDisponibilidadService: GestionarDisponibilidadService,
    private layoutService: LayoutService,
    private router: Router,) { 
    this.url = this.router.parseUrl(this.router.url);
    }

  ngOnInit() {
    this.companyId = new URLSearchParams(window.location.search).get('companyId');

    this.promise.then(s => {
      this.obtenerEmpresas();
      this.layoutService.closeLoading();
    }, e => {
      alert('La sesión del usuario no pudo ser encontrada');
      this.router.navigate(["/"]);
      this.layoutService.closeLoading();
    })

  }

  promise = new Promise((resolve, reject) => {
    let usuarioDetectado: any;
    let i = 0
    let interval: any;

    interval = setInterval(() => {
      usuarioDetectado = JSON.parse(localStorage.getItem('userCas'));
      this.layoutService.showLoading();
      if(i < 10){
        if(usuarioDetectado) {
          resolve(usuarioDetectado)
          clearInterval(interval);
        }
      }else{
        reject(usuarioDetectado);
        clearInterval(interval);
      }

      i++;
    }, 1000);
  });

  obtenerEmpresas(): void {
    this.layoutService.showLoading();
    this.gestionarDisponibilidadService.getEmpresas().subscribe(({ data }) => {
      
      let existeEmpresaAdministrada: boolean = false;
      this.listadoEmpresas = data.map((data: any) => {
        let empresa = { 
          ...data,
          id: data.companyId,
          name: data.companyName
        }

        if (this.url.queryParams['idcompany'] && data.companyId.toString() == this.url.queryParams['idcompany']) {
          existeEmpresaAdministrada = true;
        }

        delete empresa.companyId;
        delete empresa.companyName;

        return empresa;
      });

      this.listadoEmpresasVisibles = [ ...this.listadoEmpresas ];
      
      if( this.companyId ){
        const encontrado = this.listadoEmpresasVisibles.find( empresa => empresa.id == this.companyId);
        
        if(encontrado) this.agregarEmpresa( encontrado.id );
      
      }

      if (this.listadoEmpresasVisibles.length === 1) this.agregarEmpresa(this.listadoEmpresasVisibles[0].id);
      else if (existeEmpresaAdministrada) {
        this.agregarEmpresa(parseInt(this.url.queryParams['idcompany']));
      }
      if (this.url.queryParams['tab']) {
        if (this.url.queryParams['tab'] === "host-scheduled-appointments") {
          this.selectedOption="CITAS PROGRAMADAS";
        }else{
          this.selectedOption="CITAS PROGRAMADAS";
        }
      }

      this.layoutService.closeLoading();
      
    }, error => {
      this.layoutService.closeLoading();
    });
  }

  posibleNuevaOpcion = '';
  opcionCambio = '';

  selectOption(option: string): void{

    if( this.estaDisponibilidadCambiada ) {
      this.opcionCambio = 'menu';
      this.isPopupCambios = true;
      this.posibleNuevaOpcion = option;
      return;
    }

    this.selectedOption = option;
  }

  closePopupConfirmation(value: boolean) {

    if( this.opcionCambio === 'menu' ){

      if(!value){
        this.isPopupCambios = false;
        return;
      }
  
      this.isPopupCambios = false;
      this.estaDisponibilidadCambiada = false;
      this.actualizarLocalStorage(this.estaDisponibilidadCambiada);
      this.selectedOption = this.posibleNuevaOpcion;

    }else if(this.opcionCambio === 'empresas'){

      if(!value){
        this.isPopupCambios = false;
        return;
      }

      this.isPopupCambios = false;
      this.estaDisponibilidadCambiada = false;
      this.actualizarLocalStorage(this.estaDisponibilidadCambiada);
      this.cambiarEmpresa();
      
    }
    
  }

  actualizarLocalStorage(valor: boolean){
    let localStorageStates = JSON.parse(localStorage.getItem('validations'))

    if(localStorageStates){
      
      localStorageStates.map( local => {
        if( local.tipo === 'disponibilidad' ) local.valor = valor;
      });

      const estados = [ ...localStorageStates ];
      localStorage.setItem('validations', JSON.stringify(estados));

    }else{
      const estados = [
        {
          tipo: 'disponibilidad',
          valor,
          mensaje: '¿Desea salir sin guardar los cambios?'
        }
      ];
      localStorage.setItem('validations', JSON.stringify(estados));
    }
  }

  show(): void{
    this.wrapperActiveEmpresa = !this.wrapperActiveEmpresa;
  }

  idEmpresaASeleccionar: number = 0;

  agregarEmpresa( id: number ): void{

    this.idEmpresaASeleccionar = id;

    if( this.empresaSeleccionada.length > 0 && this.estaDisponibilidadCambiada){
      this.opcionCambio = 'empresas';
      this.isPopupCambios = true;
  
      return;
    }

    this.cambiarEmpresa();

    
  }

  cambiarEmpresa(){

    this.empresaSeleccionada = this.listadoEmpresas.filter( (empresa: any) => empresa.id === this.idEmpresaASeleccionar  );
    
    this.listadoEmpresasVisibles = [ ...this.listadoEmpresas ];
    this.listadoEmpresasVisibles = this.listadoEmpresas.filter( (empresa: any) => empresa.id !== this.idEmpresaASeleccionar  );

    this.empresaSeleccionada.length > 0 && this.opciones.map( (opcion, index) => {
      if( index > 0 && this.empresaSeleccionada.companyIdentifier ) opcion.disabled = true
      else if( index > 0 && !this.empresaSeleccionada.companyIdentifier ) opcion.disabled = false
    });

    if(this.empresaSeleccionada.length > 0){
      if(this.empresaSeleccionada[0].isOwner) this.opciones[1].disabled = false
      else this.opciones[1].disabled = true
    }

    this.restaurarOpciones();

  }

  removerEmpresa( valor: any ){

    if( this.listadoEmpresasVisibles.length === 0 && this.empresaSeleccionada.length === 1 ) return;

    this.empresaSeleccionada = [];
    this.listadoEmpresasVisibles = [ ...this.listadoEmpresas ];

    this.empresaSeleccionada.length === 0 && this.opciones.map( (opcion, index) => {
      if( index > 0 ) opcion.disabled = true
    });

    if(this.empresaSeleccionada.length === 0){
      this.restaurarOpciones();
    }

  }

  restaurarOpciones(){
    this.selectedOption = this.opciones[0].title;
  }

  estilosModificados(): void{
    $("footer").css("margin-top", "60%");
  }

  validarCambiosDisponibilidad(valor: boolean){

    this.estaDisponibilidadCambiada = valor;

    this.actualizarLocalStorage(this.estaDisponibilidadCambiada);
    
  }



}
