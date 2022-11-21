import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaCP } from './../../_model/_compras-publicas/compraspublicas.interfaces';
import { OfertasService } from './../../_services/_ofertas/ofertas.service';
import {MatDialog} from '@angular/material/dialog';
import { DetallesComponent } from './components/detalles/detalles.component';

import { DetallesAdquisicionesComponent } from './components/detalles-adquisiciones/detalles-adquisiciones.component';
import id from 'date-fns/esm/locale/id/index.js';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { Observable } from 'rxjs';
import { buildDate } from 'src/utils/buildDate';
import { buildExcel } from 'src/utils/buildExcel';
import { currencyFormat } from 'src/utils/currencyFormat';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { environment } from 'src/environments/environment';

type TDepartamento = {
  daneCode: string;
  territorialEntity: string;
  municipalities: TMunicipio[];
}

type TMunicipio = {
  daneCode: string;
  territorialEntity: string;
  municipalities: any;
}

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  totalOfertas: number = 0;
  totalValorOfertas: number = 0;

  linkTo = "/panel";
  titulo = "CONOCE LAS OFERTAS DISPONIBLES";
  icono = "assets/imgs/iconos/adquisicion.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  buttonText = "COMPRAS PÚBLICAS";
  infoAyuda = `Selecciona tu empresa y luego da clic en ‘Procesos de Compras Públicas’ y utiliza los filtros para consultar las oportunidades de negocio de acuerdo con tus intereses y el perfil de tu empresa.`

  notificationMessage = 'El valor mínimo dentro del rango de precios no puede ser mayor que el valor máximo';

  isPlansAcquisition: boolean = environment.isPlansAcquisition;

  showPopUp = true;

  empresas: EmpresaCP[];
  empresaSelected: any = {
    id: null,
    name: "",
    identifier: "",
    country:"",
    city: "",
    sector:"",
    email:"",
    phone:null,
    industries:[],
  };

  departamentos: TDepartamento[];
  municipios: TMunicipio[] = [];
  data: any = [];
  entidades: any[];
  modalidades: any[];

  showAlerta = false;  
  showEmpresaSelected = false;

  infoAyudaSecundaria = ''

  opciones: any[] = [
    {
      title: 'PROCESOS DE COMPRAS PÚBLICAS',
      defaultImage: 'assets/imgs/iconos/procesos.svg',
      whiteImage: 'assets/imgs/iconos/procesosenblanco.svg',
      onClick: (option: string) => this.selectOption(option),
    },
    {
      title: 'PLANES ANUALES DE ADQUISICIONES',
      defaultImage: 'assets/imgs/iconos/plan_anual_azul.svg',
      whiteImage: 'assets/imgs/iconos/planesenblanco.svg',
      onClick: (option: string) => this.selectOption(option),
    },
  ];
  
  elegirMenu() {
    if (!this.isPlansAcquisition) {
      this.opciones = [
        {
          title: 'PROCESOS DE COMPRAS PÚBLICAS',
          defaultImage: 'assets/imgs/iconos/procesos.svg',
          whiteImage: 'assets/imgs/iconos/procesosenblanco.svg',
          onClick: (option: string) => this.selectOption(option)
        }
      ];
    }
  }

  closeInitPopup(){
    this.showPopUp = false;
  }

  selectedOption = '';

  listas: any = {
    fecha: {
      id: '1',
      name: 'Fecha',
      visible: false,
      values: []
    },
    entidad: {
      id: '1',
      name: 'Entidad',
      visible: false,
      values: [],
      limitedValues: [],
      limit: 8
    },
    modalidad: {
      id: '2',
      name: 'Modalidad',
      visible: false,
      values: [],
      limitedValues: [],
      limit: 8
    },
    departamento: {
      id: '3',
      name: 'Departamento',
      visible: false,
      values: [],
      limitedValues: [],
      limit: 8
    },
    ciudad: {
      id: '4',
      name: 'Ciudad',
      visible: false,
      values: [],
      limit: 8
    },
    rangoPrecio: {
      id: '3',
      name: 'Rango de Precios',
      visible: false,
      values: {
        min: '',
        max: '',
      }
    },
  };

  filtro = {
    fechaInicial: '',
    fechaFinal: '',
    entidades: [],
    modalidades: [],
    departamentos: [],
    ciudades: [],
    precioMenor: '',
    precioMayor: '',
    objeto: '',
    numeroProceso : '',
  }

  cadenaFiltro = '';

  mostrarAlert = false;

  dateSent: any;
  dateReceived: any;
  todaysdate: any;

  headers = {
    compras: [
        'N°', 
        'Entidad',
        'Número de Proceso', 
        'Objeto del Proceso',
        'Fase/Estado',
        'Fecha de publicación del proceso',
        'Cuantía del proceso', // $ 1.000.000
        'Modalidad de contratación',
        'Duración',
        'Fecha de recepción de respuestas', // No existe
        'Ciudad unidad de contratación',
        'Producto o servicio asociado',
        'Producto o servicio adicional asociado',
        'Tipo de contrato',
        'URL proceso'
    ],
    adquisiciones: [
      'N°',
      'Entidad',
      'Descripción',
      'Duración estimada',
      'Valor adquisición',
      'Clasificador de bienes y servicios',
      'Fecha inicio proceso de contratación',
      'Modalidad',
      'Ubicación'
    ],
  }

  dataEmpresa = false;

  empresaActual = {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ofertas: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private ofertasService: OfertasService, 
    public dialog: MatDialog,
    private layoutService:LayoutService,
    private changeDetectorRef:ChangeDetectorRef) { }

  openDialog({idHiringProcessCompanyOffers}: { idHiringProcessCompanyOffers: number }) {
  
    if( this.selectedOption === this.opciones[0].title ){
      this.ofertasService.getOfertaById(idHiringProcessCompanyOffers).subscribe((datos: any) => {
        const info = datos[0];
        const data = {
          entityName: info.entityName,
          processNumber: info.processNumber,
          phase: info.phase,
          dateLoadSecop: info.dateLoadSecop,
          lastPublicationDate: info.lastPublicationDate,
          basePrice: info.basePrice,
          contractingModality: info.contractingModality,
          dateReceiptResponses: info.dateReceiptResponses,
          duration: info.duration,
          unitDuration: info.unitDuration,
          city: info.city,
          mainCategoryCode: info.product,
          additionalCategories: info.additionalproducts,
          urlProcess: info.urlProcess,
          detailObjectToHired: info.detailObjectToHired,
          typeContract: info.typeContract,
        };
  
        this.dialog.open(DetallesComponent, {
          width: '80%',
          height: '90%',
          data,
        });
  
      });
    }

  }

  openAdquisitionDialog({ idAcquisitionPlansCompanyOffers }: { idAcquisitionPlansCompanyOffers: number }) {

    this.ofertasService.getAdquisicionesById(idAcquisitionPlansCompanyOffers).subscribe((datos: any) => {
      const info = datos[0];

      const data = {
        entityName: info.entityName,
        description: info.description,
        product: info.product,
        codigoProducto: info.codigoProducto,
        modality: info.modality,
        initDate: info.initDate,
        location: info.location,
        contactName: info.contactInfo,
        contactEmail: info.contactEmail,
        contactPhone: info.contactPhone,
        duration: info.duration
      };

      this.dialog.open(DetallesAdquisicionesComponent, {
        width: '80%',
        height: '90%',
        data,
      });

    });

  }

  limpiar() {
    this.filtro = {
      fechaInicial: '',
      fechaFinal: '',
      entidades: [],
      modalidades: [],
      departamentos: [],
      ciudades: [],
      precioMenor: '',
      precioMayor: '',
      objeto: '',
      numeroProceso: '',
    };

    this.listas.ciudad.limitedValues = [];
    this.listas.ciudad.values = []

    this.mostrarAlert = false;

    this.data = [];
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.dataSource.paginator._intl.firstPageLabel = 'Ir al inicio';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.paginator._intl.lastPageLabel = 'Ir al final';

    this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 de ${length}`; }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length} elementos | Página ${Math.ceil(endIndex / 8)} de ${Math.ceil(length / 8)}`;
    }


    this.ofertas = this.dataSource.connect();

    $("input[type=checkbox]").prop('checked', false);

    this.filtrarOfertas();

  }

  ngOnInit(): void {
    this.elegirMenu();
    this.layoutService.showLoading();
    
    this.ofertasService.getEmpresas().subscribe((data: any) => {
      this.empresas = data.data;
      this.layoutService.closeLoading();
    }, error => {
      this.layoutService.closeLoading();
    });

    this.ofertasService.getDepartamentos().subscribe((data: any) => {
      const SortArray = (x: any, y: any) => x.territorialEntity.localeCompare(y.territorialEntity);
      let departamentos = data.data.sort(SortArray)
      this.listas.departamento.values = departamentos;
      this.limitList('departamento');
    });

    this.todaysdate=new Date().getFullYear()+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+('0' + new Date().getDate()).slice(-2);
  }

  changeDate(){

    this.dateSent=new Date(this.dateSent).getFullYear()+'-'+('0' + new Date(this.dateSent).getMonth()).slice(-2)+'-'+('0' + new Date(this.dateSent).getDate()).slice(-2);
     
    this.dateReceived=this.dateSent
    
  }

  idSelected(empresa: any) {
    this.empresaSelected = empresa;

    this.layoutService.showLoading();

    this.ofertasService.infoEmpresa(empresa.companyId).subscribe((datos: any) => {

      this.empresaActual = datos.data;

      this.empresaSelected = { ...this.empresaSelected, ...this.empresaActual}

      this.empresaSelected.industryMainSector = this.empresaSelected.industries;
      this.showEmpresaSelected = true;
  
      this.selectedOption = '';

      this.data = [];
      this.ofertas = null;
      this.mostrarAlert = false;
      this.dataEmpresa = false;

      this.layoutService.closeLoading();

    }, error => {
      this.layoutService.closeLoading();
    });

  };

  limitList(key: string): void{
    let values = [];

    this.listas[key].values.map((data: any, index: number) => {
      if( index <= this.listas[key].limit - 1 ){
        values = [ ...values, data ];
      }
    });

    this.listas[key].limitedValues = values;

  }

  aumentarLista(key: string): void {
    const aumento = this.listas[key].limit + 10;
    this.listas[key].limit = aumento;
    this.limitList(key);

    if( key === 'ciudad'){
      this.filtro.ciudades.map(ciudad => {
        setTimeout(() => {
          $(`#${ciudad}`).prop('checked', true);
        }, 500);
      });
    }
  };

  selectOption(option: string) {

    this.layoutService.showLoading();

    this.selectedOption = option;
    

    this.ofertasService.getPlanes('', this.empresaSelected.companyName, option).subscribe((info: any) => {
      if(info) {
        this.dataEmpresa = true;

        // Entidades
        this.ofertasService.getEntidadesPorEmpresa(this.empresaSelected.companyProfileId, option).subscribe((data: any) => {
          const SortArray = (x: any, y: any) => x.entityName.localeCompare(y.entityName);
          if(data){
            let entidades = data.sort(SortArray)
            this.listas.entidad.values = entidades
            this.limitList('entidad');
          }
        });

        // Modalidades
        this.ofertasService.getModalidadesPorEmpresa(this.empresaSelected.companyProfileId, option).subscribe((data: any) => {
          const SortArray = (x: any, y: any) => x.modality.localeCompare(y.modality);
          if(data){
            let modalidades = data.sort(SortArray)
            this.listas.modalidad.values = modalidades;
            this.limitList('modalidad');
          }
        });

      }else{
        this.dataEmpresa = false;
      }
      this.layoutService.closeLoading();
    }, error => {
      this.layoutService.closeLoading();
      this.selectedOption = option;
      this.dataEmpresa = false;
    });
          
    this.limpiar();
    // this.mostrarAlert = false;
  }

  filtrarMunicipios(data: any): void {

    let ciudades = [];
    const SortArray = (x: any, y: any) => x.territorialEntity.localeCompare(y.territorialEntity);

    const encontrado = this.filtro.departamentos.find( departamento => departamento === data.territorialEntity );
    if( !encontrado ){
      this.filtro.departamentos = [ ...this.filtro.departamentos, data.territorialEntity ];
    }else{
      const newArray = this.filtro.departamentos.filter( departamento => departamento !== data.territorialEntity );
      this.filtro.departamentos = [ ...newArray ];
    }


    this.listas.departamento.values.map(d => {
      if( this.filtro.departamentos.find(df => df === d.territorialEntity )){
        ciudades = [ ...ciudades, ...d.municipalities ]
      }
    });

    let filtro = []
    this.filtro.ciudades.map(ciudad => {
      if(ciudades.find( c => c.territorialEntity === ciudad)){
        filtro = [ ...filtro, ciudad ]
      }
    })

    
    ciudades = ciudades.sort(SortArray);

    this.filtro.ciudades = filtro;
    this.listas.ciudad.values = ciudades;

    this.filtro.ciudades.map(ciudad => {
      setTimeout(() => {
        $(`#${ciudad}`).prop('checked', true);
      }, 500);
    });

    this.limitList('ciudad');

  }

  descargarOfertas() {

    this.layoutService.showLoading();

    const date = buildDate();
    let nombreArchivo = '';
    let data = [];

    if(this.selectedOption === 'PROCESOS DE COMPRAS PÚBLICAS'){

      nombreArchivo = `Mis ofertas de compra publica ${date}`;

      this.data.map(( oferta: any, index: number ) => { 
        
        const newdata = {
          id:                   index + 1,
          entityName:           oferta.entityName,
          processNumber:        oferta.processNumber,
          detailObjectToHired:  oferta.detailObjectToHired,
          phase:                oferta.phase,
          dateLoadSecop:        oferta.dateLoadSecop ? oferta.dateLoadSecop.split('T')[0] : '',
          basePrice:            oferta.basePrice ? `$ ${ oferta.basePrice }` : '',
          contractingModality:  oferta.contractingModality,
          duration:             `${ oferta.duration } ${ oferta.unitDuration }`,
          dateReceiptResponses: oferta.dateReceiptResponses ? oferta.dateReceiptResponses.split('T')[0] : '',
          municipio:            oferta.municipio,
          mainCategoryCode:     oferta.mainCategoryCode,
          additionalCategories: oferta.additionalCategories,
          typeContract:         oferta.typeContract,
          urlProcess:           oferta.urlProcess,
        };

        data = [ ...data, newdata ];
      
      });
  
      buildExcel(this.headers.compras, data, nombreArchivo, 'Ofertas');
    
    }else if(this.selectedOption === 'PLANES ANUALES DE ADQUISICIONES'){
    
      nombreArchivo = `Adquisiciones ${date}`;

      this.data.map(( oferta: any, index: number ) => { 

        const newdata = {
          id:           index + 1,
          entityName:   oferta.entityName,
          description:  oferta.description,
          duration:     `${ oferta.duration ? oferta.duration : '' } ${ oferta.unitDuration ? oferta.unitDuration : '' }`,
          basePrice:    oferta.basePrice ? `$ ${ oferta.basePrice }` : '',
          idPaa:        oferta.idPaa,
          createdDate:  buildDate( new Date(oferta.createdDate) ),
          modality:     oferta.modality,
          location:     `${ oferta.municipio || '' } ${ oferta.dpto || '' }`
        };

        data = [ ...data, newdata ];
      
      });

      buildExcel(this.headers.adquisiciones, data, nombreArchivo, 'Adquisiciones');
    
    }

    this.layoutService.closeLoading();
    
  }

  filtrarOfertas(): void {

    this.dataSource = null;
    this.ofertas = null;
    this.data = [];

    let cadena = '';
    let divisorEntidad = '';
    let divisorModalidad = '';
    let divisorDepartamento = '';
    let divisorCiudad = '';
    let divisorPrecioMenor = '';
    let divisorPrecioMayor = '';
    let divisorObjeto = '';
    let divisorFechaInicial = '';
    let divisorFechaFinal = '';

    if( this.filtro.entidades.length > 0 ){
      this.filtro.entidades.map((entidad, index) => {
        if(index > 0) cadena = cadena + `,'${entidad}'`;
        else cadena = cadena + `entity='${entidad}'`;
      });
      divisorEntidad = '&'
    }

    if( this.filtro.modalidades.length > 0 ){
      this.filtro.modalidades.map((modalidad, index) => {
        if(index > 0) cadena = cadena + `,'${modalidad}'`;
        else cadena = cadena + `${divisorEntidad}modality='${modalidad}'`;
      });
      divisorModalidad = '&'
    }

    if( this.filtro.departamentos.length > 0 ){
      this.filtro.departamentos.map((departamento, index) => {
        if(index > 0) cadena = cadena + `,'${departamento}'`;
        else cadena = cadena + `${divisorEntidad || divisorModalidad}dept='${departamento}'`;
      });
      divisorDepartamento = '&'
    }

    if( this.filtro.ciudades.length > 0 ){
      this.filtro.ciudades.map((ciudad, index) => {
        if(index > 0) cadena = cadena + `,'${ciudad}'`;
        else cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento}munic='${ciudad}'`;
      });
      divisorCiudad = '&'
    }
    
    if( this.filtro.precioMenor ){
      let value = (<HTMLInputElement>document.getElementById('min')).value;
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '');
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad}minValue=${value.trim()}`;
      divisorPrecioMenor = '&';
    }

    if( this.filtro.precioMayor ){
      let value = (<HTMLInputElement>document.getElementById('max')).value;
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '');
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad || divisorPrecioMenor}maxValue=${value.trim()}`;
      divisorPrecioMayor = '&';
    }

    if( this.filtro.objeto ){
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad || divisorPrecioMenor || divisorPrecioMayor}objContratar=${this.filtro.objeto}`;
      divisorObjeto = '&';
    }

    if( this.filtro.fechaInicial ){
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad || divisorPrecioMenor || divisorPrecioMayor || divisorObjeto}dateInicial=${this.filtro.fechaInicial}`;
      divisorFechaInicial = '&';
    }

    if( this.filtro.fechaFinal ){
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad || divisorPrecioMenor || divisorPrecioMayor || divisorObjeto || divisorFechaInicial}dateFin=${this.filtro.fechaFinal}`;
      divisorFechaFinal = '&';
    }

    if( this.filtro.numeroProceso ){
      cadena = cadena + `${divisorEntidad || divisorModalidad || divisorDepartamento || divisorCiudad || divisorPrecioMenor || divisorPrecioMayor || divisorObjeto || divisorFechaInicial || divisorFechaFinal}processNumber=${this.filtro.numeroProceso}`;
    }

    this.cadenaFiltro = cadena;

    this.layoutService.showLoading();

    this.ofertasService.getPlanes(cadena, this.empresaSelected.companyName, this.selectedOption).subscribe((info: any) => {

      if( !info ) {
        if(!this.dataEmpresa && this.selectedOption !== ''){
          this.mostrarAlert = false;
        }else{
          this.mostrarAlert = true;
        }
        this.layoutService.closeLoading();
        return;
      }

      this.totalValorOfertas = 0;

      let data = [];
      info.map( (d: any) => {
        data = [ 
          ...data, 
          { 
            ...d, 
            dateLoadSecop: buildDate(new Date(d.dateLoadSecop)), 
            basePrice: currencyFormat(d.basePrice) 
          } 
        ];
        this.totalValorOfertas += parseInt(d.basePrice);
        
      });

      this.totalOfertas = info.length;
      this.infoAyudaSecundaria = `Actualmente existen <b>${this.totalOfertas}</b> ofertas disponibles que son de interés para tu empresa, por un valor total de <b>$ ${currencyFormat(this.totalValorOfertas).replace('COP', '').trim()}</b>. Consúltalos aquí.`

      const filtro = data.sort((a: any, b: any) => b.dateLoadSecop - a.dateLoadSecop)

      this.data = filtro;

      this.dataSource = new MatTableDataSource<any>( this.data);

      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.ofertas = this.dataSource.connect();

      if(!data) this.mostrarAlert = true;
      else this.mostrarAlert = false;

      this.layoutService.closeLoading();
    }, error => {
        this.mostrarAlert = true;
        this.layoutService.closeLoading();
    });
  }

  showOptions(opcion: string): void {
    this.listas[opcion].visible = !this.listas[opcion].visible;
  };

  addFilter(opcion: string, data: any): void {
    if( opcion === 'entidad' ){
      const encontrado = this.filtro.entidades.find( entidad => entidad === data.entityName );
      if( !encontrado ){
        this.filtro.entidades = [ ...this.filtro.entidades, data.entityName ];
      }else{
        const newArray = this.filtro.entidades.filter( entidad => entidad !== data.entityName );
        this.filtro.entidades = [ ...newArray ];
      }
    }

    if( opcion === 'modalidad' ){
      const encontrado = this.filtro.modalidades.find( modalidad => modalidad === data.modality );
      if( !encontrado ){
        this.filtro.modalidades = [ ...this.filtro.modalidades, data.modality ];
      }else{
        const newArray = this.filtro.modalidades.filter( modalidad => modalidad !== data.modality );
        this.filtro.modalidades = [ ...newArray ];
      }
    }

    if( opcion === 'ciudad' ){
      const encontrado = this.filtro.ciudades.find( ciudad => ciudad === data.territorialEntity );
      if( !encontrado ){
        this.filtro.ciudades = [ ...this.filtro.ciudades, data.territorialEntity ];
      }else{
        const newArray = this.filtro.ciudades.filter( ciudad => ciudad !== data.territorialEntity );
        this.filtro.ciudades = [ ...newArray ];
      }
    }

  }

  onBlur(): boolean {

    if(this.filtro.precioMenor && this.filtro.precioMayor){

      if( this.filtro.precioMenor > this.filtro.precioMayor ){
        (<HTMLInputElement>document.getElementById('min')).value = '';
        this.filtro.precioMenor = '';
        this.showAlerta = true;
        return true;
      }

      return false;

    }

    return true;

  }

  closePopup(e: any){
    this.showAlerta = false;
  };

}
