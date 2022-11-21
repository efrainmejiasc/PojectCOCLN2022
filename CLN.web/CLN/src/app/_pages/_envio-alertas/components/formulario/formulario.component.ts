import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';
import { AlertasService } from 'src/app/_services/_alertas/alertas.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Time } from 'src/app/_shared/_compras-publicas/components/custom-date-picker/custom-date-picker.component';
import { buildDate } from 'src/utils/buildDate';
import { buildHour } from 'src/utils/buildHour';
import { replaceTexto } from 'src/utils/replaceTexto';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  linkTo = "/alerts-management";
  titulo = "PROGRAMAR ENVÍO DE ALERTAS";
  icono = "assets/imgs/iconos/iconoalertas.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  infoAyuda = "Bienvenido(a), acá podrás programar, editar, activar o inactivar alertas para los distintos tipos de notificación";

  @Input() dataAlerta: any;

  showAlertInfoDesde = false;
  showAlertInfoTime = false;
  showAlertInfoHasta = false;
  showAlertInfoNombre = false;

  formPlans: FormGroup;
  editorContent: any;
  disabledHasta: boolean = true;
  disabledSendButton: boolean;

  public textOptions: Object = {
    placeholderText: 'Edita el contenido aqui!',
    charCounterCount: false,
    toolbarButtons: [
      'bold', 
      'italic', 
      'underline', 
      'insertLink', 
      'fontFamily', 
      'fontSize', 
      'textColor',
      'alignLeft',
      'alignCenter',
      'alignRight',
      'justify'
    ],
    quickInsertTags: [],
  }

  listas = {
    tiposNotificaciones: [],
    tiposNotificacionesVisibles: [],
    tipoNotificacionSeleccionada: [],
    nombreAlerta: '',
    enviarAEmpresa: 'Si',
    enviarMicronegocios: 'Si',
    tipoIdentificacion: [],
    tipoIdentificacionSeleccionada: '',
    sectores: [],
    sectoresVisibles: [],
    sectoresSeleccionados: [],
    caracterizaciones: [],
    caracterizacionesVisibles: [],
    caracterizacionesSeleccionadas: [],
    informacionesComerciales: [],
    informacionesComercialesVisibles: [],
    informacionesComercialesSeleccionadas: [],
    frecuenciasEnvio: [],
    frecuenciasEnvioVisibles: [],
    frecuenciasEnvioSeleccionadas: [],
    diasEnvio: [
      {
        id: 1,
        name: 'Lunes'
      },
      {
        id: 2,
        name: 'Martes'
      },
      {
        id: 3,
        name: 'Miércoles'
      },
      {
        id: 4,
        name: 'Jueves'
      },
      {
        id: 5,
        name: 'Viernes'
      },
      {
        id: 6,
        name: 'Sábado'
      },
      {
        id: 7,
        name: 'Domingo'
      },
    ],
    diasEnvioVisibles: [
      {
        id: 1,
        name: 'Lunes'
      },
      {
        id: 2,
        name: 'Martes'
      },
      {
        id: 3,
        name: 'Miércoles'
      },
      {
        id: 4,
        name: 'Jueves'
      },
      {
        id: 5,
        name: 'Viernes'
      },
      {
        id: 6,
        name: 'Sábado'
      },
      {
        id: 7,
        name: 'Domingo'
      },
    ],
    diasEnvioSeleccionados: [],
    tipoEnvio: ''
  };

  notificationCambiosMessage = '¿Desea salir sin guardar los cambios?';
  showAlertOut = false;


  time: Time = {
    desde: '',
    hasta: '',
    hora: 0,
    minuto: 0
  }

  alerta = {
    tipoNotificacion: '',
    nombreAlerta: '',
    enviarAEmpresas: '',
    tipoEnvio: '',
    plantillaSeleccionada: '',
    textoSugerido: false
  }

  radios = {
    enviarAEmpresas: ['Si', 'No'],
    enviarAMicronegocios: ['Si', 'No'],
    tipoIdentificacion: ['Persona jurídica', 'Persona natural '],
    tipoEnvio: ['SMS', 'Correo electrónico'],
    plantillas: [
      {
        img: 'assets/imgs/iconos/plantilla_1.svg',
        value: 'plantilla_1',
        title: 'Plantilla 1'
      },
      {
        img: 'assets/imgs/iconos/plantilla_2.svg',
        value: 'plantilla_2',
        title: 'Plantilla 2'
      },
      {
        img: 'assets/imgs/iconos/plantilla_3.svg',
        value: 'plantilla_3',
        title: 'Plantilla 3'
      }
    ]
  }

  valoresSms = {
    sms: '',
    link: '',
    tituloLink: ''
  }

  valoresEmail = {
    primerTexto: '',
    segundoTexto: '',
    imagen: '',
    plantilla: '',
    enlace: ''
  }

  textoSugerido = false;

  showConfirmAlerta = false;
  notificationConfirmMessage: string = ''

  todaysdate=new Date().getFullYear()+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+('0' + (new Date().getDate() + 1)).slice(-2);
  
  horaMinima: number;
  minutoMinimo: number;

  actualizar = false;

  estadoInicial = { 
    "idAlert": 0,
    "nombre": '',
    "tipoNotificacion": '',
    "isActive": true,
    "frecuencia": '',
    "sendAll": true,
    "sendPimes": false,
    "tipoPersona": '',
    "sectores": '',
    "characterization": '',
    "infoComercial": '',
    "desde": '',
    "hasta": '',
    "dias": '',
    "hora": '',
    "sms": true,
    "image": "",
    "primerTexto": '',
    "segundoTexto": '',
    "tercerTexto": '',
    "tipoPlantilla": '',
    "fechaUltimoEnvio": "",
    "sended": false,
    "idUsuario": '',
    "enlace": ''
  }

  nuevoEstado = { 
    "idAlert": '',
    "nombre": '',
    "tipoNotificacion": '',
    "isActive": '',
    "frecuencia": '',
    "sendAll": false,
    "sendPimes": false,
    "tipoPersona": '',
    "sectores": '',
    "caracterizaciones": '',
    "infoComercial": '',
    "desde": '',
    "hasta": '',
    "dias": '',
    "hora": '',
    "sms": true,
    "image": "",
    "primerTexto": '',
    "segundoTexto": '',
    "tercerTexto": '',
    "tipoPlantilla": '',
    "fechaUltimoEnvio": "",
    "sended": false,
  }

  isSaving = false;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private alertasService: AlertasService,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {

    const alertId = this.activatedRoute.snapshot.params.id;

    if( alertId ){
      this.layoutService.showLoading();
      this.alertasService.getAlertaById( alertId ).subscribe(({ data }: any) => {
        
        if( data.length > 0 ){
          this.dataAlerta = data[0];
          this.listas.nombreAlerta = this.dataAlerta.nombre;
          this.listas.enviarAEmpresa = this.dataAlerta.sendAll ? 'Si' : 'No';
          this.listas.enviarMicronegocios = this.dataAlerta.sendPimes ? 'Si' : 'No';
          this.listas.tipoIdentificacionSeleccionada = this.dataAlerta.tipoPersona;
          
          let desde = new Date(this.dataAlerta.desde);
          let hasta = new Date(this.dataAlerta.hasta)
          desde.setDate(desde.getDate());
          hasta.setDate(hasta.getDate());
          
          
          this.time = {
            desde,
            hasta,
            hora: parseInt( this.dataAlerta.hora.split(':')[0] ),
            minuto: parseInt( this.dataAlerta.hora.split(':')[1] ),
          }

          if (this.time.hora.toString().length == 1) this.time.hora = `0${this.time.hora}`;
          if (this.time.minuto.toString().length == 1) this.time.minuto = `0${this.time.minuto}`;
          

          this.dataAlerta.enlace =  this.dataAlerta.enlace ? this.dataAlerta.enlace : '';

          if(this.dataAlerta && this.dataAlerta.dias){
            const dias = this.dataAlerta.dias.split(',');
            
            dias.forEach( (dia: string) => {
              const encontrado = this.listas.diasEnvio.find( tipo => tipo.name === dia.trim())
              encontrado && this.agregarDias(encontrado.id);
            });
            
          }

          this.listas.tipoEnvio = this.dataAlerta.sms ? 'SMS' : 'Correo electrónico';

          if( this.dataAlerta.sms ){
            this.valoresSms = {
              sms: this.dataAlerta.primerTexto,
              link: this.dataAlerta.tercerTexto,
              tituloLink: this.dataAlerta.segundoTexto
            }
          }else{
            this.valoresEmail = {
              primerTexto: this.dataAlerta.primerTexto,
              segundoTexto: this.dataAlerta.segundoTexto,
              imagen: `../../../../../../../${ this.dataAlerta.image }`,
              plantilla: this.dataAlerta.tipoPlantilla.toString(),
              enlace: this.dataAlerta.enlace
            }
            // localStorage.setItem("pTexto", this.dataAlerta.primerTexto);
            // localStorage.setItem("sTexto", this.dataAlerta.segundoTexto);
          }
  
          this.actualizar = true;

          this.estadoInicial = { ...this.dataAlerta }

          this.buildForm();
          this.layoutService.closeLoading();
        }else{
          this.layoutService.closeLoading();
          this.router.navigate([`alerts-form`]);
        }
        
      }, error => {
        console.log('error');
      });



    }else{
      this.buildForm();
      this.actualizar = false;
      this.disabledSendButton = true;
    }

    window.scrollTo({
      top: 0
    })
  }

  closePopupCambios( value: boolean ) {
    
    if( value ){
      this.router.navigate(['/alerts-management']);
    }
  
    this.showAlertOut = !this.showAlertOut;
  }

  onBlur(tipo: string = ''){
    let fecha = new Date();
    fecha = new Date();
    fecha.setMinutes(fecha.getMinutes());

    let valor = 0;
    if( tipo === 'hora' ){
      valor = parseInt( (<HTMLInputElement>document.getElementById('hora')).value );

      if( valor > 23 || valor < 0 ){
        this.time.hora = 0;
      }

      if (valor.toString().length == 1) this.time.hora = `0${this.time.hora}`;

    }else if( tipo === 'minuto' ){
      valor = parseInt( (<HTMLInputElement>document.getElementById('minuto')).value );

      if( valor > 59 || valor < 0 ){
        this.time.minuto = 0;
      }

      if (valor.toString().length == 1) this.time.minuto = `0${this.time.minuto}`;

    }

      this.validarFormulario();
  }

  buildForm(){

    this.alertasService.getTipoNotificaciones().subscribe(({ data }: any) => {

      data.map( (d: any) => {
        this.listas.tiposNotificaciones = [
          ...this.listas.tiposNotificaciones,
          {
            id: d.enumerator,
            name: d.notification
          }
        ];
      });

      this.listas.tiposNotificaciones = this.listas.tiposNotificaciones.filter(tipo => tipo.name != 'Procesos de compra pública')

      this.listas.tiposNotificacionesVisibles = [ ...this.listas.tiposNotificaciones ];

      if(this.dataAlerta && this.dataAlerta.tipoNotificacion){
        const encontrado = this.listas.tiposNotificaciones.find( tipo => tipo.name === this.dataAlerta.tipoNotificacion)
        encontrado.id && this.agregarTipoNotificacion(encontrado.id);
      }
      
    }, error => {
    });

    this.alertasService.getTipoIdentificacion().subscribe(({ data }: any) => {

      data.map( (d: any) => {
        this.listas.tipoIdentificacion = [
          ...this.listas.tipoIdentificacion, d.description
        ];
      });
      
    }, error => {
    });

    this.alertasService.getSectores().subscribe(({ data }: any) => {

      this.listas.sectores = [
        {
          id: '',
          name: 'Todos'
        }
      ]

      data.map( (d: any, index: number) => {
        this.listas.sectores = [
          ...this.listas.sectores, 
          {
            id: index,
            name: d.description
          }
        ];
      });

      this.listas.sectoresVisibles = [ ...this.listas.sectores ];

      if(this.dataAlerta && this.dataAlerta.sectores){
        
        this.listas.sectoresVisibles.forEach( sector => {
          const encontrado = this.dataAlerta.sectores.includes( sector.name );
          encontrado && this.agregarSector(sector.id);
        });
        
      }
      
    }, error => {
    });

    this.alertasService.getCaracterizaciones().subscribe(({ data }: any) => {

      data.map( (d: any) => {
        this.listas.caracterizaciones = [
          ...this.listas.caracterizaciones, 
          {
            id: d.id,
            name: d.description
          }
        ];
      });

      this.listas.caracterizacionesVisibles = [ ...this.listas.caracterizaciones ];

      if(this.dataAlerta && this.dataAlerta.characterization){

        this.listas.caracterizacionesVisibles.forEach( caracterizacion => {
          const encontrado = this.dataAlerta.characterization.includes( caracterizacion.name );
          encontrado && this.agregarCaracterizacion(caracterizacion.id);
        });
        
      }
      
    }, error => {
    });

    this.alertasService.getInformacionesComerciales().subscribe(({ data }: any) => {

      data.map( (d: any) => {
        this.listas.informacionesComerciales = [
          ...this.listas.informacionesComerciales, 
          {
            id: d.id,
            name: d.description
          }
        ];
      });

      this.listas.informacionesComercialesVisibles = [ ...this.listas.informacionesComerciales ];

      if(this.dataAlerta && this.dataAlerta.infoComercial){

        this.listas.informacionesComercialesVisibles.forEach( info => {
          const encontrado = this.dataAlerta.infoComercial.includes( info.name );
          encontrado && this.agregarInformacionesComerciales(info.id);
        });
        
      }
      
    }, error => {
    });

    this.alertasService.getFrecuenciasEnvio().subscribe(({ data }: any) => {

      data.map( (d: any) => {
        this.listas.frecuenciasEnvio = [
          ...this.listas.frecuenciasEnvio, 
          {
            id: d.id,
            name: d.description
          }
        ];
      });

      this.listas.frecuenciasEnvioVisibles = [ ...this.listas.frecuenciasEnvio ];

      if(this.dataAlerta && this.dataAlerta.frecuencia){
        const encontrado = this.listas.frecuenciasEnvio.find( tipo => tipo.name === this.dataAlerta.frecuencia)
        encontrado.id && this.agregarFrecuencia(encontrado.id);
      }
      
    }, error => {
    });

  }

  asignarValoresSms( valor: any ){
    this.valoresSms = { ...valor };
    this.validarFormulario();
  }

  asignarTextoSugerido(valor: any ){
    if(this.valoresEmail.plantilla == '2'){
      this.valoresEmail.primerTexto = valor;
      this.valoresEmail.segundoTexto = valor;
    }else{
      this.valoresEmail.primerTexto = valor;
    }
    this.validarFormulario();
  }

  asignarImagen( valor: any ){

    this.valoresEmail = { 
      ...this.valoresEmail,
      imagen: valor
    };

    this.validarFormulario();

  }

  asignarEnlace( valor: any ){

    this.valoresEmail = { 
      ...this.valoresEmail,
      enlace: valor
    };

  }

  asignarTextoOne( valor: any ){

    this.valoresEmail.primerTexto = valor;
    this.validarFormulario();

  }

  asignarTextoTwo( valor: any ){
    this.valoresEmail.segundoTexto = valor;
    this.validarFormulario();
  }

  asignarTipoPlantilla( valor: any ){

    this.valoresEmail = { 
      ...this.valoresEmail,
      plantilla: valor
    };

    this.validarFormulario();

  }

  validarFormulario(){

    const hora = parseInt( (<HTMLInputElement>document.getElementById('hora')).value );
    const minuto = parseInt( (<HTMLInputElement>document.getElementById('minuto')).value );
    const desde = (<HTMLInputElement>document.getElementById('fechaInicioProceso')).value;
    const hasta = (<HTMLInputElement>document.getElementById('fechaFinProceso')).value;
    
    if( this.listas.frecuenciasEnvioSeleccionadas.length > 0 && this.listas.frecuenciasEnvioSeleccionadas[0].name === 'Único envío' ){
      if( this.listas.tipoNotificacionSeleccionada.length > 0 && 
        this.listas.nombreAlerta && 
        this.listas.frecuenciasEnvioSeleccionadas.length > 0 &&
        desde && hora >= 0 && minuto >= 0){

          if( this.listas.tipoEnvio === 'SMS' ){

            if( this.valoresSms.sms ){
              this.disabledSendButton = false;
            }else{
              this.disabledSendButton = true;
            }

          }else if( this.listas.tipoEnvio === 'Correo electrónico' ){

            if(this.valoresEmail.plantilla == '2'){
              
              if( this.valoresEmail.imagen && this.valoresEmail.primerTexto && this.valoresEmail.segundoTexto ){
                this.disabledSendButton = false;
              }else{
                this.disabledSendButton = true;
              }

            }else{

              if( this.valoresEmail.imagen && this.valoresEmail.primerTexto ){
                this.disabledSendButton = false;
              }else{
                this.disabledSendButton = true;
              }

            }

          }
      
      }else{
        this.disabledSendButton = true;
      }

    }else{

      if( this.listas.tipoNotificacionSeleccionada.length > 0 && 
        this.listas.nombreAlerta && 
        this.listas.frecuenciasEnvioSeleccionadas.length > 0 &&
        desde && hasta && hora >= 0 && minuto >= 0){

          if( this.listas.tipoEnvio === 'SMS' ){

            if( this.valoresSms.sms ){
              this.disabledSendButton = false;
            }else{
              this.disabledSendButton = true;
            }

          }else if( this.listas.tipoEnvio === 'Correo electrónico' ){

            if(this.valoresEmail.plantilla == '2'){
              
              if( this.valoresEmail.imagen && this.valoresEmail.primerTexto && this.valoresEmail.segundoTexto ){
                this.disabledSendButton = false;
              }else{
                this.disabledSendButton = true;
              }

            }else{

              if( this.valoresEmail.imagen && this.valoresEmail.primerTexto ){
                this.disabledSendButton = false;
              }else{
                this.disabledSendButton = true;
              }

            }

          }
      
      }else{
        this.disabledSendButton = true;
      }

    }

  }

  agregarTipoNotificacion( id: any ){

    this.listas.tiposNotificacionesVisibles = [ ...this.listas.tiposNotificaciones ];
    this.listas.tipoNotificacionSeleccionada = [];

    const notificacion = this.listas.tiposNotificaciones.find( notificacion => notificacion.id === id );

    this.listas.tipoNotificacionSeleccionada = [ ...this.listas.tipoNotificacionSeleccionada, { ...notificacion } ];

    this.listas.tiposNotificacionesVisibles = this.listas.tiposNotificacionesVisibles.filter( notificacion => notificacion.id !== id );

    this.validarFormulario();

    this.textoSugerido = false;
  }

  removerTipoNotificacion( id: any ){

    this.listas.tiposNotificacionesVisibles = [ ...this.listas.tiposNotificaciones ];
    this.listas.tipoNotificacionSeleccionada = [];

    this.validarFormulario();

  }

  setNombreAlerta(nombre: string){
    this.listas.nombreAlerta = nombre;
    this.validarFormulario();
  }

  agregarSector( id: any ){

    const sector = this.listas.sectoresVisibles.find( sector => sector.id === id );

    if( id === '' ){
      this.listas.sectoresSeleccionados = [];
      this.listas.sectoresVisibles = [ ...this.listas.sectores ];
    }else{
      this.removerSector('');
    }

    this.listas.sectoresSeleccionados = [ ...this.listas.sectoresSeleccionados, { ...sector } ];
    this.listas.sectoresVisibles = this.listas.sectoresVisibles.filter( sector => sector.id !== id );

  }

  removerSector( id: any ){
    
    this.listas.sectoresSeleccionados = this.listas.sectoresSeleccionados.filter( sector => sector.id !== id );
    this.listas.sectoresVisibles = this.listas.sectores;

    this.listas.sectoresSeleccionados.map( sectorS => {
      this.listas.sectoresVisibles = this.listas.sectoresVisibles.filter( sectorV => sectorV.id !== sectorS.id );
    } );

  }

  agregarCaracterizacion( id: any ){

    const caracterizacion = this.listas.caracterizacionesVisibles.find( caracterizacion => caracterizacion.id === id );

    this.listas.caracterizacionesSeleccionadas = [ ...this.listas.caracterizacionesSeleccionadas, { ...caracterizacion } ];
    this.listas.caracterizacionesVisibles = this.listas.caracterizacionesVisibles.filter( caracterizacion => caracterizacion.id !== id );

  }

  removerCaracterizacion( id: any ){
    
    this.listas.caracterizacionesSeleccionadas = this.listas.caracterizacionesSeleccionadas.filter( caracterizacion => caracterizacion.id !== id );
    this.listas.caracterizacionesVisibles = this.listas.caracterizaciones;

    this.listas.caracterizacionesSeleccionadas.map( caracterizacionS => {
      this.listas.caracterizacionesVisibles = this.listas.caracterizacionesVisibles.filter( caracterizacionV => caracterizacionV.id !== caracterizacionS.id );
    } );

  }

  agregarInformacionesComerciales( id: any ){

    const informacion = this.listas.informacionesComercialesVisibles.find( informacion => informacion.id === id );

    this.listas.informacionesComercialesSeleccionadas = [ ...this.listas.informacionesComercialesSeleccionadas, { ...informacion } ];
    this.listas.informacionesComercialesVisibles = this.listas.informacionesComercialesVisibles.filter( informacion => informacion.id !== id );

  }

  removerInformacionesComerciales( id: any ){
    
    this.listas.informacionesComercialesSeleccionadas = this.listas.informacionesComercialesSeleccionadas.filter( informacion => informacion.id !== id );
    this.listas.informacionesComercialesVisibles = this.listas.informacionesComerciales;

    this.listas.informacionesComercialesSeleccionadas.map( informacionS => {
      this.listas.informacionesComercialesVisibles = this.listas.informacionesComercialesVisibles.filter( informacionV => informacionV.id !== informacionS.id );
    } );

  }

  agregarFrecuencia( id: any ){

    this.listas.frecuenciasEnvioVisibles = [ ...this.listas.frecuenciasEnvio ];
    this.listas.frecuenciasEnvioSeleccionadas = [];

    const frecuencia = this.listas.frecuenciasEnvio.find( frecuencia => frecuencia.id === id );

    this.listas.frecuenciasEnvioSeleccionadas = [ ...this.listas.frecuenciasEnvioSeleccionadas, { ...frecuencia } ];

    this.listas.frecuenciasEnvioVisibles = this.listas.frecuenciasEnvioVisibles.filter( frecuencia => frecuencia.id !== id );

    if( frecuencia.name !== 'Único envío' ) {
      this.disabledHasta = false;
    }else {
      this.disabledHasta = true;
      this.time.hasta = '';
      this.wrapperActiveDias = false;
      this.listas.diasEnvioSeleccionados = []
      this.listas.diasEnvioVisibles = [ ...this.listas.diasEnvio ]
    }

    this.validarFormulario();

  }

  removerFrecuencia( id: any ){

    this.listas.frecuenciasEnvioVisibles = [ ...this.listas.frecuenciasEnvio ];
    this.listas.frecuenciasEnvioSeleccionadas = [];

    this.disabledHasta = true;
    this.time.hasta = '';
    this.listas.diasEnvioSeleccionados = []
    this.listas.diasEnvioVisibles = [ ...this.listas.diasEnvio ]

    this.validarFormulario();

  }

  agregarDias( id: any ){

    this.listas.diasEnvioVisibles = [ ...this.listas.diasEnvio ];
    this.listas.diasEnvioSeleccionados = [];

    const dia = this.listas.diasEnvioVisibles.find( dia => dia.id === id );

    this.listas.diasEnvioSeleccionados = [ ...this.listas.diasEnvioSeleccionados, { ...dia } ];
    this.listas.diasEnvioVisibles = this.listas.diasEnvioVisibles.filter( dia => dia.id !== id );

    this.validarFormulario();

  }

  removerDias( id: any ){
    
    this.listas.diasEnvioSeleccionados = this.listas.diasEnvioSeleccionados.filter( dia => dia.id !== id );
    this.listas.diasEnvioVisibles = this.listas.diasEnvio;

    this.listas.diasEnvioSeleccionados.map( diaS => {
      this.listas.diasEnvioVisibles = this.listas.diasEnvioVisibles.filter( diaV => diaV.id !== diaS.id );
    } );

    if( this.listas.diasEnvioSeleccionados.length == 0 ){
      this.show('ninguno')
    }

    this.validarFormulario();

  }

  setValue(value: Time) {
    this.time = value;
    this.validarFormulario();
  }

  regresar(){

    this.show("ninguno");

    if( this.existenCambios() ){
      this.router.navigate(['/alerts-management']);
    }else{
      this.showAlertOut = true;
    }

  }

  existenCambios(): boolean{

    let nuevosDatos = this.buildPayload();

    this.estadoInicial.hora = nuevosDatos.hora;

    delete this.estadoInicial.sectores;
    delete this.estadoInicial.characterization;
    delete this.estadoInicial.infoComercial;
    delete this.estadoInicial.idAlert;
    delete this.estadoInicial.isActive;
    delete this.estadoInicial.tipoPersona;
    delete this.estadoInicial.dias;
    delete this.estadoInicial.idUsuario;

    delete nuevosDatos.sectores;
    delete nuevosDatos.characterization;
    delete nuevosDatos.infoComercial;
    delete nuevosDatos.idAlert;
    delete nuevosDatos.isActive;
    delete nuevosDatos.tipoPersona;

    if( this.estadoInicial.frecuencia === 'Único envío' ) {
      delete this.estadoInicial.hasta;
      delete this.estadoInicial.dias;

      delete nuevosDatos.hasta;
      // delete nuevosDatos.dias;
    }

    delete this.estadoInicial.tipoPlantilla;
    delete this.estadoInicial.fechaUltimoEnvio;
    delete this.estadoInicial.sended;

    delete nuevosDatos.tipoPlantilla;
    delete nuevosDatos.fechaUltimoEnvio;
    delete nuevosDatos.sended;
    delete nuevosDatos.idUsuario;

    if( nuevosDatos.sms ){

      nuevosDatos = {
        ...nuevosDatos,
        "image": "",
        "enlace": '',
        "primerTexto": this.valoresSms.sms,
        "segundoTexto": this.valoresSms.tituloLink,
        "tercerTexto": this.valoresSms.link,
      }

    }else{

      nuevosDatos = {
        ...nuevosDatos,
        "image": "",
        "primerTexto": this.valoresEmail.primerTexto,
        "segundoTexto": this.valoresEmail.segundoTexto,
        "tercerTexto": "",
        "enlace": this.valoresEmail.enlace,
      }

      if( typeof this.valoresEmail.imagen === 'string' ){
        nuevosDatos.image = this.valoresEmail.imagen.replace('../../../../../../../', '');
      }else{
        nuevosDatos.image = nuevosDatos.image;
      }

    }

    return JSON.stringify( this.estadoInicial ).length === JSON.stringify( nuevosDatos ).length;

  }

  guardar(){

    let data = this.buildPayload();

    var user = localStorage.getItem("userCas");

    if( data.sms ){

      data = {
        ...data,
        "image": "",
        "primerTexto": this.valoresSms.sms,
        "segundoTexto": this.valoresSms.tituloLink,
        "tercerTexto": this.valoresSms.link,
        "tipoPlantilla": '0',
        "enlace": '',
        "idUsuario": JSON.parse(user).id
      }
      this.layoutService.showLoading();
      this.isSaving = true;
      this.alertasService.setAlerta( data ).subscribe(( data: any) => {
  
        if( this.dataAlerta && this.dataAlerta.idAlert > 0 ){
          this.notificationConfirmMessage = 'La alerta ha sido guardada exitosamente';
        }else{
          this.notificationConfirmMessage = 'La alerta ha sido creada exitosamente';
        }
        
        this.showConfirmAlerta = true;

        this.layoutService.closeLoading();
        this.isSaving = false;
        
      }, error => {
        console.error(error);
        this.layoutService.closeLoading();
        this.isSaving = false;
      });

    }else{

      data = {
        ...data,
        "image": "",
        "primerTexto": this.valoresEmail.primerTexto,
        "segundoTexto": this.valoresEmail.segundoTexto,
        "tercerTexto": "",
        "tipoPlantilla":  this.valoresEmail.plantilla,
        "enlace": this.valoresEmail.enlace,
        "idUsuario": JSON.parse(user).id
      }

      data.primerTexto = replaceTexto(data.primerTexto);
      data.segundoTexto = replaceTexto(data.segundoTexto);

      const file = this.valoresEmail.imagen as any;

      if( typeof file === 'string' ){

        data.image = file.replace('../../../../../../../', '');

        this.layoutService.showLoading();
        this.isSaving = true;

        this.alertasService.setAlerta( data ).subscribe(( data: any) => {
  
          if( this.dataAlerta && this.dataAlerta.idAlert > 0 ){
            this.notificationConfirmMessage = 'La alerta ha sido guardada exitosamente';
          }else{
            this.notificationConfirmMessage = 'La alerta ha sido creada exitosamente';
          }

          this.showConfirmAlerta = true;

          this.layoutService.closeLoading();
          this.isSaving = false;
          
        }, error => {
          console.error(error);
          this.layoutService.closeLoading();
          this.isSaving = false;
        });

      }else{

        var formData: FormData = new FormData();
        formData.append("multimediaComponent", file, file.name);

        this.layoutService.showLoading();
        this.isSaving = true;
  
        this.alertasService.saveImage( file ).subscribe(( path: any) => {
          
          data.image = path;
          this.alertasService.setAlerta( data ).subscribe(( data: any) => {
    
            if( this.dataAlerta && this.dataAlerta.idAlert > 0 ){
              this.notificationConfirmMessage = 'La alerta ha sido guardada exitosamente';
            }else{
              this.notificationConfirmMessage = 'La alerta ha sido creada exitosamente';
            }
            
            this.showConfirmAlerta = true;

            this.layoutService.closeLoading();
            this.isSaving = false;
            
          }, error => {
            console.error(error);
            this.layoutService.closeLoading();
            this.isSaving = false;
          });
          
        }, error => {
          console.error(error);
          this.layoutService.closeLoading();
          this.isSaving = false;
        });

      }
      

    }
  
  }

  buildPayload(){

    let sectores = '';
    
    if( this.listas.sectoresSeleccionados.length > 0 && this.listas.sectoresSeleccionados[0].id === '' ){
      this.listas.sectores.map( (sector, index) => {
        if( sector.id !== '' ){
          if( index === 0 ) {
            sectores = sector.name
          }else{
            sectores = `${ sectores }, ${ sector.name }`;
          }
        }
      });
    }else{
      this.listas.sectoresSeleccionados.length > 0 && this.listas.sectoresSeleccionados.map( (sector, index) => {
        if( index === 0 ) {
          sectores = sector.name
        }else{
          sectores = `${ sectores }, ${ sector.name }`;
        }
      });
    }

    let caracterizaciones = '';
    this.listas.caracterizacionesSeleccionadas && this.listas.caracterizacionesSeleccionadas.map( (caracterizacion, index) => {
      if( index === 0 ) {
        caracterizaciones = caracterizacion.name
      }else{
        caracterizaciones = `${ caracterizaciones }, ${ caracterizacion.name }`;
      }
    });

    let infoComercial = '';
    this.listas.informacionesComercialesSeleccionadas && this.listas.informacionesComercialesSeleccionadas.map( (info, index) => {
      if( index === 0 ) {
        infoComercial = info.name
      }else{
        infoComercial = `${ infoComercial }, ${ info.name }`;
      }
    });

    let hora = '';

    hora = `${ (<HTMLInputElement>document.getElementById('hora')).value }:${ (<HTMLInputElement>document.getElementById('minuto')).value }`
    
    let data = { 
      "idAlert": this.dataAlerta ? this.dataAlerta.idAlert : 0,
      "nombre": this.listas.nombreAlerta,
      "tipoNotificacion": this.listas.tipoNotificacionSeleccionada.length > 0 ? this.listas.tipoNotificacionSeleccionada[0].name : '',
      "isActive": this.dataAlerta ? this.dataAlerta.isActive : true,
      "frecuencia": this.listas.frecuenciasEnvioSeleccionadas.length > 0 ? this.listas.frecuenciasEnvioSeleccionadas[0].name : '',
      "sendAll": this.listas.enviarAEmpresa === 'Si' ? true : false,
      "sendPimes": this.listas.enviarAEmpresa === 'Si' ? false : this.listas.enviarMicronegocios === 'Si' ? true : false,
      "tipoPersona": this.listas.tipoIdentificacionSeleccionada,
      sectores,
      "characterization": caracterizaciones,
      infoComercial,
      "desde": this.time.desde ? buildDate( new Date(this.time.desde), true, true ) : '',
      "hasta": this.time.hasta ? buildDate( new Date(this.time.hasta), true, true ) : '',
      // dias,
      hora,
      "sms": this.listas.tipoEnvio === 'SMS' ? true : false,
      "image": "",
      "primerTexto": "",
      "segundoTexto": "",
      "tercerTexto": "",
      "tipoPlantilla": '',
      "fechaUltimoEnvio": this.dataAlerta ? this.dataAlerta.fechaUltimoEnvio : "",
      "sended": this.dataAlerta ? this.dataAlerta.sended : false,
      "enlace": '',
      "idUsuario": '',
    }

    return data;

  }

  closePopup( value: any ){
    this.showConfirmAlerta = false;

    if( this.notificationConfirmMessage === 'La alerta ha sido creada exitosamente' || this.notificationConfirmMessage === 'La alerta ha sido guardada exitosamente' ){
      this.router.navigate(['/alerts-management']);
    }
          
  }

  wrapperActiveTipo = false;
  wrapperActiveSector = false;
  wrapperActiveCaracterizacion = false;
  wrapperActiveInformacion = false;
  wrapperActiveFrecuencia = false;
  wrapperActiveDias = false;

  show( tipo: string ){

    if( tipo == "ninguno"){
      this.wrapperActiveSector = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveFrecuencia = false;
      this.wrapperActiveDias = false;
      this.wrapperActiveTipo = false;
    }
  
    if( tipo === 'tipo' ){
      if( !this.wrapperActiveTipo ){
        this.wrapperActiveTipo = true;
      }else{
        this.wrapperActiveTipo = false;
      }

      this.wrapperActiveSector = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveFrecuencia = false;
      this.wrapperActiveDias = false;
      
    }

    if( tipo === 'sector' ){
      if( !this.wrapperActiveSector ){
        this.wrapperActiveSector = true;
      }else{
        this.wrapperActiveSector = false;
      }

      this.wrapperActiveTipo = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveFrecuencia = false;
      this.wrapperActiveDias = false;
      
    }

    if( tipo === 'caracterizacion' ){
      
      if( !this.wrapperActiveCaracterizacion ){
        this.wrapperActiveCaracterizacion = true;
      }else{
        this.wrapperActiveCaracterizacion = false;
      }

      this.wrapperActiveTipo = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveFrecuencia = false;
      this.wrapperActiveDias = false;
      
    }

    if( tipo === 'informacion' ){
      
      if( !this.wrapperActiveInformacion ){
        this.wrapperActiveInformacion = true;
      }else{
        this.wrapperActiveInformacion = false;
      }

      this.wrapperActiveTipo = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveFrecuencia = false;
      this.wrapperActiveDias = false;
      
    }

    if( tipo === 'frecuencia' ){
      
      if( !this.wrapperActiveFrecuencia ){
        this.wrapperActiveFrecuencia = true;
      }else{
        this.wrapperActiveFrecuencia = false;
      }

      this.wrapperActiveTipo = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveDias = false;
      
    }

    if( tipo === 'dias' ){
      
      if( !this.wrapperActiveDias ){
        this.wrapperActiveDias = true;
      }else{
        this.wrapperActiveDias = false;
      }

      this.wrapperActiveTipo = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveCaracterizacion = false;
      this.wrapperActiveInformacion = false;
      this.wrapperActiveFrecuencia = false;
      
    }


  }

  calcularMinimaFechaHasta(){

    let fecha = new Date(this.time.desde);
    fecha.setDate(fecha.getDate() + 1);
    return fecha;

  }

  limpiarOpcionesNoObligatorias(){
    this.listas.sectoresSeleccionados.forEach( sector => this.removerSector( sector.id ));
    this.listas.caracterizacionesSeleccionadas.forEach( caracterizacion => this.removerCaracterizacion( caracterizacion.id ));
    this.listas.informacionesComercialesSeleccionadas.forEach( informacionComercial => this.removerInformacionesComerciales( informacionComercial.id ));
  }

}
