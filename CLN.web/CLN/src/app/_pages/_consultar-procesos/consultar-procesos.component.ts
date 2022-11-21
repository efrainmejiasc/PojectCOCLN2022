import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ProcesosService } from 'src/app/_services/_procesos/procesos.service';

import { CompanyInterestCP, DepartamentoCP, CiudadCP, EntidadCP, StageCP, ModeCP } from 'src/app/_model/_compras-publicas/compraspublicas.interfaces';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { DetalleProcesoComponent } from './components/detalle-proceso/detalle-proceso.component';
import { currencyFormat } from 'src/utils/currencyFormat';


export interface Card {
  title: string;
  subtitle: string;
  text: string;
}


@Component({
  selector: 'app-consultar-procesos',
  templateUrl: './consultar-procesos.component.html',
  styleUrls: ['./consultar-procesos.component.scss']
})
export class ConsultarProcesosComponent implements OnInit {

  linkTo = "/panel";
  titulo = "CONSULTA PROCESOS DE CONTRATACIÓN PÚBLICA";
  icono = "assets/imgs/iconos/adquisicion.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  infoAyuda = "Bienvenido(a), acá podrás consultar los Procesos de Contratación Pública en SECOP I y SECOP II.";

  showHelp:boolean = false;
  formPlans: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Card> = new MatTableDataSource<Card>([]);
  resultados: number = 0;

  mensajeInformativo = {
    bienes: 'Si deseas realizar tu búsqueda de oportunidades a partir del clasificador de bienes y servicios de las Naciones Unidas',
    sectores: 'Si deseas realizar tu búsqueda de oportunidades a partir de la clasificación de sectores de Compra Lo Nuestro'
  }

  busquedaPorSectores = false;

  listas = {
    entidades: [],
    departamentos: [
      {
        id: '',
        name: 'Todos',
        municipalities: [
          {
            id: '',
            name: 'Todos',
          }
        ]
      }
    ],
    departamentosVisibles: [],
    departamentosSeleccionados: [],
    municipios: [
      {
        id: '',
        name: 'Todos',
      }
    ],
    municipiosVisibles: [],
    municipiosSeleccionados: [],
    proceso: '',
    entidad: '',
    objetoProceso: '',
    secopOne: '',
    modalidades: [
      {
        id: '',
        name: 'Todos',
      }
    ],
    modalidadesVisibles: [],
    modalidadesSeleccionadas: [],
    fasesEstados: [
      {
        id: '',
        name: 'Todos',
      }
    ],
    fasesEstadosVisibles: [],
    fasesEstadosSeleccionados: [],

    sectores: [],
    sectoresVisibles: [],
    sectoresSeleccionados: [],

    productos: [],
    productosVisibles: [],
    productosSeleccionados: [],

    valorMin: '',
    valorMax: ''
  };

  mostrar = true;

  showAlerta = false;
  notificationMessage = 'El valor mínimo no puede ser mayor que el valor máximo';

  longitud = {
    valorMin: 0,
    valorMax: 0
  }

  sumaProcesosContratacion = ''

  lista = [];
  listaEntidad = [];
  listaObjetoProceso = []

  productosSelected:any[] = [];

  totalProcesosContratacion = 0;

  companyInterest:CompanyInterestCP = {
    idCompanyInterest: 0,
    idCompanyProfile: 0,
    interestType: "",
    allDepartements: true,
    allMunicipalities: true,
    allStage: true,
    companies: "",
    allMode: true,
    allValues: true,
    minimumValues: 1,
    maximumValues: 10,
    includeValues: true,
    departments:[],
    municipalities:[],
    stages:[],
    modes:[],
    classifiers:[],
    months: []
  }

  objFiltro = {};
  consultado = false;
  vacio = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    private formBuilder: FormBuilder,
    private procesosService: ProcesosService,
    public dialog: MatDialog,
    private layoutService:LayoutService
  ) { }

  cambiarBusqueda() {
    this.busquedaPorSectores = !this.busquedaPorSectores;

    this.listas.sectoresVisibles = this.listas.sectores
    this.listas.sectoresSeleccionados = []

    this.listas.productosVisibles = this.listas.productos
    this.listas.productosSeleccionados = [];

    this.productosSelected = [];
    this.companyInterest.classifiers = [];

    this.wrapperActiveSector = false;
    this.wrapperActiveProducto = false;
  }

  ngOnInit() {
    this.buildForm();
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

    // construccion

    this.procesosService.getDepartamentos().subscribe(( response: any ) => {

      const { data } = response;

      this.listas.departamentos[0].municipalities = [{ id: '', name: 'Todos' }, ...this.listas.departamentos[0].municipalities];

      data.map( (data: any) => {
        let obj = {
          id: data.daneCode,
          name: data.territorialEntity,
          municipalities: data.municipalities,
        };
        this.listas.departamentos = [ ...this.listas.departamentos, obj ];

        const SortArrayDep = (x: any, y: any) => x.territorialEntity.localeCompare(y.territorialEntity);

        obj.municipalities = obj.municipalities.sort(SortArrayDep);
        obj.municipalities.map((d: any) => {
          this.listas.departamentos[0].municipalities = [ 
            ...this.listas.departamentos[0].municipalities, 
            { id: d.daneCode, name: `${obj.name} - ${d.territorialEntity}` } 
          ]
        });

      });

      this.listas.departamentosVisibles = this.listas.departamentos;

    });

    this.procesosService.getModalidades().subscribe(( response: any ) => {
      
      const { data } = response;

      data.map( (data: any, index: number) => {
        let obj = {
          id: data.enumerator || index,
          name: data.mode,
        };
        this.listas.modalidades = [ ...this.listas.modalidades, obj ];

      });

      this.listas.modalidadesVisibles = this.listas.modalidades;

    });

    this.procesosService.getFasesEstados().subscribe(( response: any ) => {

      const { data } = response;

      data.map( (data: any, index: number) => {
        let obj = {
          id: data.enumerator || index,
          name: data.stage,
        };
        this.listas.fasesEstados = [ ...this.listas.fasesEstados, obj ];

      });

      this.listas.fasesEstadosVisibles = this.listas.fasesEstados;

    });

    this.procesosService.getTotalProcesosContratacion().subscribe(( response: any ) => {

      this.totalProcesosContratacion = response[0].recordsNumbers;
      this.sumaProcesosContratacion = currencyFormat(response[0].suma).replace('COP', '').trim();

    });

    this.procesosService.getSectoresProductos().subscribe(( response: any ) => {

      const { data } = response;

      data.map( (data: any, index: number) => {
        let obj = {
          id: data.sectorCode,
          name: data.sectorName,
          correlativeProducts: data.correlativeProducts
        };
        this.listas.sectores = [ ...this.listas.sectores, obj ];

      });

      this.listas.sectoresVisibles = this.listas.sectores;

    });

    window.scrollTo({
      top: 0
    })
  };

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  setProducts(products: any){
    this.companyInterest.classifiers = [];

    for(var i=0; i<products.length; i++){
      let productObj = products[i];

      let classifier = {
        idCompanyInterestClassifier:0,
        idCompanyInterest:this.companyInterest.idCompanyInterest,
        classifierCode:productObj.code
      };

      this.companyInterest.classifiers.push(classifier);
    };
    
  };

  toogleHelp(){
    this.showHelp = !this.showHelp;
  };

  private buildForm() {
    this.formPlans = this.formBuilder.group(
      {
        modalidad: [''],
        fromVl: [''],
        untilVl: [''],
        fechaEvento: ['']
      }
    );
  }

  mostrarListaProceso = false;

  searchValue( value: string ){

    if( !this.listas.proceso.trim() ) return;

    this.layoutService.showLoading();
    this.procesosService.getProcesosByString( this.listas.proceso ).subscribe(( response: any ) => {

      const { data } = response;
      data.map((d: any) => {
        d.value = d.processNumber;
        delete d.processNumber;
      })

      this.lista = data;
      this.mostrarListaProceso = true;
      this.layoutService.closeLoading();

    }, error => {

      this.layoutService.closeLoading();

    });
  }

  selectValue( value: string ){
    this.listas.proceso = value;
    this.mostrarListaProceso = false;
  }

  limpiarProceso(){
    if( !this.listas.proceso ) this.mostrarListaProceso = false;
  }

  mostrarListaEntidad = false;

  searchValueEntidad( value: string ){

    if(!this.listas.entidad) return;

    this.layoutService.showLoading();
    this.procesosService.getEntidadesByString( this.listas.entidad ).subscribe(( response: any ) => {

      const { data } = response;
      data.map((d: any) => {
        d.value = d.entityName;
        delete d.entityName;
      })

      this.listaEntidad = data;
      this.mostrarListaEntidad = true;
      this.layoutService.closeLoading();

    }, error => {

      this.layoutService.closeLoading();

    });
  }

  selectValueEntidad( value: string ){
    this.listas.entidad = value;
    this.mostrarListaEntidad = false;
  }

  limpiarEntidad(){
    if( !this.listas.entidad ) this.mostrarListaEntidad = false;
  }

  mostrarListaObjeto = false;

  searchValueObjetoProceso( value: string ){

    if( !this.listas.objetoProceso ) return;

    this.layoutService.showLoading();
    this.procesosService.getObjetoByString( this.listas.objetoProceso ).subscribe(( response: any ) => {

      const { data } = response;
      data.map((d: any) => {
        d.value = d.objeto;
        delete d.objeto;
      })

      this.listaObjetoProceso = data;
      this.mostrarListaObjeto = true;
      this.layoutService.closeLoading();

    }, error => {

      this.layoutService.closeLoading();

    });
  }

  selectValueObjetoProceso( value: string ){
    this.listas.objetoProceso = value;
    this.mostrarListaObjeto = false;
  }

  limpiarObjeto(){
    if( !this.listas.objetoProceso ) this.mostrarListaObjeto = false;
  }

  agregarFase( id: any ){

    if( id === '' ) this.listas.fasesEstadosSeleccionados.map( fase =>  this.removerFase(fase.id))

    const fase = this.listas.fasesEstadosVisibles.find( fase => fase.id === id );
    this.listas.fasesEstadosSeleccionados = [ ...this.listas.fasesEstadosSeleccionados, { ...fase } ];
    this.listas.fasesEstadosVisibles = this.listas.fasesEstadosVisibles.filter( fase => fase.id !== id );

    if(id !== '') this.removerFase('')

  }

  removerFase( id: any ){

    this.listas.fasesEstadosSeleccionados = this.listas.fasesEstadosSeleccionados.filter( fase => fase.id !== id );
    this.listas.fasesEstadosVisibles = this.listas.fasesEstados;

    this.listas.fasesEstadosSeleccionados.map( faseS => {
      this.listas.fasesEstadosVisibles = this.listas.fasesEstadosVisibles.filter( faseV => faseV.id !== faseS.id );
    } );

  }

  agregarModalidad( id: any ){

    if( id === '' ) this.listas.modalidadesSeleccionadas.map( modalidad =>  this.removerModalidad(modalidad.id))

    const modalidad = this.listas.modalidadesVisibles.find( modalidad => modalidad.id === id );
    this.listas.modalidadesSeleccionadas = [ ...this.listas.modalidadesSeleccionadas, { ...modalidad } ];
    this.listas.modalidadesVisibles = this.listas.modalidadesVisibles.filter( modalidad => modalidad.id !== id );

    if(id !== '') this.removerModalidad('')
  }

  removerModalidad( id: any ){
    
    this.listas.modalidadesSeleccionadas = this.listas.modalidadesSeleccionadas.filter( modalidad => modalidad.id !== id );
    this.listas.modalidadesVisibles = this.listas.modalidades;

    this.listas.modalidadesSeleccionadas.map( modalidadS => {
      this.listas.modalidadesVisibles = this.listas.modalidadesVisibles.filter( modalidadV => modalidadV.id !== modalidadS.id );
    } );

  }
  
  banderaMunicipios = []
  agregarDepartamento( id: any ){

    const encontrado = this.listas.departamentosSeleccionados.find(d => d.id === '' )

    if( encontrado && id !== '' ) {

      this.listas.departamentos[0].municipalities.map( (p: any) => {
        this.removerMunicipio(p.id)
      })

      this.removerDepartamento('')

    }

    if(this.listas.departamentosSeleccionados.length > 0 && id === ''){

      this.listas.departamentosSeleccionados.map( (p: any) => {
        this.removerDepartamento(p.id)
      })

    }

    const departamento = this.listas.departamentosVisibles.find( departamento => departamento.id === id );

    this.listas.departamentosSeleccionados = [ ...this.listas.departamentosSeleccionados, { ...departamento } ];
    this.listas.departamentosVisibles = this.listas.departamentosVisibles.filter( departamento => departamento.id !== id );

    let departamentos = []
    this.listas.departamentosSeleccionados.map( departamento => {
      departamentos = [ ...departamentos, departamento ]
    } );

    this.listas.municipios = []

    const SortArrayDep = (x: any, y: any) => x.territorialEntity.localeCompare(y.territorialEntity);


    if( id === '' ) {
      this.listas.municipios = [ ...this.listas.departamentos[0].municipalities ]
    }else{

      departamentos && departamentos.map((dep: any) => {
        dep.municipalities = dep.municipalities.sort(SortArrayDep);
        dep.municipalities.map((d: any) => {
          if( departamentos.length === 1 ){
            this.listas.municipios = [ ...this.listas.municipios, { id: d.daneCode, name: d.territorialEntity } ]
          }else{
            this.listas.municipios = [ ...this.listas.municipios, { id: d.daneCode, name: `${dep.name} - ${d.territorialEntity}` } ]
          }
        })
      })

    }

    const SortArray = (x: any, y: any) => x.name.localeCompare(y.name);

    const mEncontrado = this.listas.municipiosSeleccionados.find(m => m.id === '');
    if( mEncontrado ){
      this.listas.municipiosVisibles = [ ...this.listas.municipios.sort(SortArray)];
    }else{
      this.listas.municipiosVisibles = [ { id: '', name: 'Todos' }, ...this.listas.municipios.sort(SortArray)];
    }

    this.listas.departamentos[0].municipalities = this.listas.departamentos[0].municipalities.filter(m => m.name !== 'Todos')


  }

  removerDepartamento( id: any ){

    const encontrado = this.listas.departamentosSeleccionados.filter( departamento => departamento.id === id );

    encontrado[0].municipalities.map( (p: any) => {

      const encontrado = this.listas.municipiosSeleccionados.find( municipio => municipio.id === p.daneCode );
    
      if(encontrado){  
        this.removerMunicipio(encontrado.id)
      }
    })
    
    this.listas.departamentosSeleccionados = this.listas.departamentosSeleccionados.filter( departamento => departamento.id !== id );
    this.listas.departamentosVisibles = this.listas.departamentos;

    this.listas.departamentosSeleccionados.map( departamentoS => {
      this.listas.departamentosVisibles = this.listas.departamentosVisibles.filter( departamentoV => departamentoV.id !== departamentoS.id );
    } );

    
    let ciudades = []
    this.listas.departamentosSeleccionados.map( departamento => {
      ciudades = [ ...ciudades, ...departamento.municipalities ]
    } )


    this.listas.municipios = []
    ciudades.map( ciudad => [
      this.listas.municipios = [ ...this.listas.municipios, { id: ciudad.daneCode, name: ciudad.territorialEntity } ]
    ])

    const encontrarTodos = this.listas.municipios.find( m => m.id === '')
    if( !encontrarTodos ){
      this.listas.municipios = [ { id: '', name: 'Todos' }, ...this.listas.municipios ]
    }

    this.listas.municipiosVisibles = this.listas.municipios;

    if( this.listas.departamentosSeleccionados.length === 0 ) {
      this.listas.municipiosSeleccionados = [];
      this.listas.municipiosVisibles = [];
    };

  }

  agregarMunicipio( id: any ){

    if( id === '' ) this.listas.municipiosSeleccionados.map( municipio =>  this.removerMunicipio(municipio.id))

    const encontrado = this.listas.municipiosSeleccionados.find( municipio => municipio.id === id);

    if( encontrado ){
      this.removerMunicipio(id)
    }else{
      const municipio = this.listas.municipiosVisibles.find( municipio => municipio.id === id );
      this.listas.municipiosSeleccionados = [ ...this.listas.municipiosSeleccionados, { ...municipio } ];
    }

    this.listas.municipiosVisibles = this.listas.municipiosVisibles.filter( municipio => municipio.id !== id );

    if(id !== '') this.removerMunicipio('')

  }

  removerMunicipio( id: any ){
    
    this.listas.municipiosSeleccionados = this.listas.municipiosSeleccionados.filter( municipio => municipio.id !== id );
    this.listas.municipiosVisibles = this.listas.municipios;
    this.listas.municipiosSeleccionados.map( municipioS => {
      this.listas.municipiosVisibles = this.listas.municipiosVisibles.filter( municipioV => municipioV.id !== municipioS.id );
    } );

    const encontrado = this.listas.municipiosSeleccionados.find(m => m.id === '');

    if(!encontrado){
      this.listas.municipiosVisibles = this.listas.municipiosVisibles.filter(m => m.id !== '')
      this.listas.municipiosVisibles = [ 
        { id: '', name: 'Todos' },
        ...this.listas.municipiosVisibles 
      ]
    }

  }

  agregarSector( id: any ){

    const sector = this.listas.sectoresVisibles.find( sector => sector.id === id );

    this.listas.sectoresSeleccionados = [ ...this.listas.sectoresSeleccionados, { ...sector } ];
    this.listas.sectoresVisibles = this.listas.sectoresVisibles.filter( sector => sector.id !== id );

    let productos = []
    this.listas.sectoresSeleccionados.map( sector => {
      productos = [ ...productos, ...sector.correlativeProducts ];
    } );

    productos.map( producto => [
      this.listas.productos = [ ...this.listas.productos, { id: producto.productCode, name: producto.productName } ]
    ])

    this.listas.productosVisibles = this.listas.productos;

    this.organizarEliminarDuplicados();

  }

  removerSector( id: any ){

    const encontrado = this.listas.sectoresSeleccionados.filter( sector => sector.id === id );
    encontrado[0].correlativeProducts.map( (p: any) => {

      const encontrado = this.listas.productosSeleccionados.find( producto => producto.id === p.productCode );
      if(encontrado){  
        this.removerProducto(p.productCode)
      }
    })
    
    this.listas.sectoresSeleccionados = this.listas.sectoresSeleccionados.filter( sector => sector.id !== id );
    this.listas.sectoresVisibles = this.listas.sectores;

    this.listas.sectoresSeleccionados.map( sectorS => {
      this.listas.sectoresVisibles = this.listas.sectoresVisibles.filter( sectorV => sectorV.id !== sectorS.id );
    } );

    let productos = []
    this.listas.sectoresSeleccionados.map( producto => {
      productos = [ ...productos, ...producto.correlativeProducts ]
    } )

    this.listas.productos = []
    productos.map( producto => [
      this.listas.productos = [ ...this.listas.productos, { id: producto.productCode, name: producto.productName } ]
    ])

    this.listas.productosVisibles = this.listas.productos;

    this.organizarEliminarDuplicados();

  }

  organizarEliminarDuplicados(){

    let hash = {};

    this.listas.productosVisibles = this.listas.productosVisibles.sort(((a, b) => a.id - b.id));
    this.listas.productosVisibles = this.listas.productosVisibles.filter(o => hash[o.id] ? false : hash[o.id] = true);

  }

  agregarProducto( id: any ){

    const producto = this.listas.productosVisibles.find( producto => producto.id === id );

    this.listas.productosSeleccionados = [ ...this.listas.productosSeleccionados, { ...producto } ];
    this.listas.productosVisibles = this.listas.productosVisibles.filter( producto => producto.id !== id );

  }

  removerProducto( id: any ){
    
    this.listas.productosSeleccionados = this.listas.productosSeleccionados.filter( producto => producto.id !== id );
    this.listas.productosVisibles = this.listas.productos;

    this.listas.productosSeleccionados.map( productoS => {
      this.listas.productosVisibles = this.listas.productosVisibles.filter( productoV => productoV.id !== productoS.id );
    } );

  }

  limpiar(){

    this.listas.departamentosSeleccionados = [];
    this.listas.departamentosVisibles = this.listas.departamentos;
    this.listas.municipiosSeleccionados = [];
    this.listas.municipiosVisibles = [];
    this.listas.proceso = '';
    this.productosSelected = [];
    this.listas.entidad = '';
    this.listas.objetoProceso = '';
    this.listas.secopOne = '';
    this.listas.modalidadesSeleccionadas = [];
    this.listas.modalidadesVisibles= this.listas.modalidades;
    this.listas.fasesEstadosSeleccionados = [];
    this.listas.fasesEstadosVisibles= this.listas.fasesEstados;
    this.listas.sectoresSeleccionados = [];
    this.listas.sectoresVisibles= this.listas.sectores;
    this.listas.productosSeleccionados = [];
    this.listas.productosVisibles= this.listas.productos;
    this.listas.valorMin = '';
    this.listas.valorMax = '';
    this.companyInterest.classifiers = [];

    this.vacio = false;
    this.dataSource = null;
    this.obs = null;
    this.resultados = 0;
    this.consultado = false

    this.wrapperActiveSector = false;
    this.wrapperActiveProducto = false;
    this.mostrar = false;
    this.mostrar = true;

  }

  buscar(){

    this.vacio = false;
    this.consultado = false;

    let codigosProductos = ''
    this.listas.productosSeleccionados && this.listas.productosSeleccionados.map((p, i) => {
      if(i == 0){
        codigosProductos = `${p.id}`
      }else{
        codigosProductos = `${codigosProductos}, ${p.id}`
      }
    })

    this.companyInterest.classifiers && this.companyInterest.classifiers.map((p, i) => {
      if(i == 0){
        codigosProductos = `${p.classifierCode}`
      }else{
        codigosProductos = `${codigosProductos}, ${p.classifierCode}`
      }
    })

    let fases = ''
    this.listas.fasesEstadosSeleccionados && this.listas.fasesEstadosSeleccionados.map((p, i) => {
      if(i == 0){
        fases = `${p.name}`
      }else{
        fases = `${fases}, ${p.name}`
      }
    })

    let modalidades = ''
    this.listas.modalidadesSeleccionadas && this.listas.modalidadesSeleccionadas.map((p, i) => {
      if(i == 0){
        modalidades = `${p.name}`
      }else{
        modalidades = `${modalidades}, ${p.name}`
      }
    })

    let departamentos = ''
    this.listas.departamentosSeleccionados && this.listas.departamentosSeleccionados.map((p, i) => {
      if(i == 0){
        departamentos = `${p.name}`
      }else{
        departamentos = `${departamentos}, ${p.name}`
      }
    })

    let municipios = ''
    this.listas.municipiosSeleccionados && this.listas.municipiosSeleccionados.map((p, i) => {

      const name = p.name.split('-')[ p.name.split('-').length - 1 ];

      if(i == 0){
        municipios = `${name.trim()}`
      }else{
        municipios = `${municipios}, ${name.trim()}`
      }

    });

    let scope = false;
    if(this.listas.secopOne === 'true'){
      scope = true;
    }else if(this.listas.secopOne === 'false'){
      scope = false;
    }else{
      scope = null;
    }

    let minValue = (<HTMLInputElement>document.getElementById('min')).value;
    minValue = minValue.replace(/[.*+?^${}()|[\]\\]/g, '');

    let maxValue = (<HTMLInputElement>document.getElementById('max')).value;
    maxValue = maxValue.replace(/[.*+?^${}()|[\]\\]/g, '');

    const data = {
      "processNumber": this.listas.proceso || null,
      "unspscCodes": codigosProductos || null,
      "entities": this.listas.entidad || null,
      "objectDescription": this.listas.objetoProceso || null,
      "stages": fases === 'Todos' ? null : fases || null,
      "modes": modalidades === 'Todos' ? null : modalidades || null,
      "minValue": minValue.trim() ? parseFloat(minValue) : null,
      "maxValue": maxValue.trim() ? parseFloat(maxValue) : null,
      "departments": departamentos === 'Todos' ? null : departamentos || null ,
      "municipalities": municipios === 'Todos' ? null : municipios || null,
      "secopOne": scope
    }

    this.objFiltro = data

    this.layoutService.showLoading();

    this.obs = null;
    this.dataSource = null;

    this.procesosService.getFiltroProcesos(data).subscribe(( response: any ) => {

      if( response.data.length === 0 ) {
        this.vacio = true;
        this.layoutService.closeLoading();
        this.consultado = true;
        this.obs = null;
        this.dataSource = null;
        return;
      }

      this.vacio = false;
      this.resultados = response.data.length;


      this.dataSource = new MatTableDataSource<any>(response.data);
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

      this.obs = this.dataSource.connect();

      this.consultado = true

      this.layoutService.closeLoading();
    }, error => {
      this.vacio = true;
      this.layoutService.closeLoading();
      this.consultado = true;
      this.obs = null;
      this.dataSource = null;
    });

  }

  descargarExcel(){

    const date = new Date();

      const year = date.getFullYear();
      const currentMonth = date.getMonth();
      const currentDay = date.getDate();

      const month = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1 ;
      const day = currentDay < 10 ? `0${currentDay}` : currentDay ;
    
      const fullDate = `${day}-${month}-${year}`;

    if(this.consultado){
      this.layoutService.showLoading();
      this.procesosService.getExcelProcesos2(this.objFiltro).subscribe(( response: any ) => {
        
        let name = response.filename;
        const fileName = name;
        const objectUrl: string = URL.createObjectURL(response.file);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName;
        //document.body.appendChild(a);
        a.click();
        //document.body.removeChild(a);
        //URL.revokeObjectURL(objectUrl);


       /*  const byteArray = new Uint8Array(atob(response.archivo).split('').map(char => char.charCodeAt(0)));
        const file = new Blob([byteArray], { type: 'application/vnd.ms-excel' });
        const fileURL = URL.createObjectURL(file);
        let anchor = document.createElement("a");
        anchor.download = `Ofertas de compra publica ${fullDate}.xlsx`;
        anchor.href = fileURL;
        anchor.click(); */
  
        this.layoutService.closeLoading();
      }, error => {
        this.layoutService.closeLoading();
      });
    }

  }

  verDetalles( card: any ){

    this.procesosService.getProcesoById(card.idHiringProcess).subscribe((datos: any) => {
      const info = datos.data;
      const data = {
        row: info.row,
        idHiringProcess: info.idHiringProcess,
        entityName: info.entityName,
        processNumber: info.processNumber,
        processObject: info.processObject,
        processStage: info.processStage,
        dateLoad: info.dateLoad,
        lastDateLoad: info.lastDateLoad,
        basePrice: info.basePrice,
        processMode: info.processMode,
        processDuration: info.processDuration,
        applicationsDeadline: info.applicationsDeadline,
        processLocation: info.processLocation,
        processMainCategory: info.processMainCategory,
        processAdditionalCategory: info.processAdditionalCategory,
        processContractType: info.processContractType,
        processUrl: info.processUrl
      };

      this.dialog.open(DetalleProcesoComponent, {
        width: '80%',
        height: '90%',
        data,
      });

    });
  }

  formaterarPrecio(valor: string){
    const newValor = parseInt(valor);
    const formato = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'COP' }).format(newValor);
    return formato
  }

  formatearFecha(fecha: string){
    
    if(fecha){
      return fecha.split('T')[0];
    }
      
    return ''
  }
  
  onBlur(): void {

    if(this.listas.valorMin !== '' && this.listas.valorMax !== ''){

      if( this.listas.valorMin > this.listas.valorMax ){
        (<HTMLInputElement>document.getElementById('min')).value = '';
        this.longitud.valorMin = (<HTMLInputElement>document.getElementById('min')).value.length - 1;
        this.showAlerta = true;
      }

    }

  }

  closePopup(e: any){
    this.showAlerta = false;
  };

  onChange( tipo: string ){

    if( tipo === 'valorMin' ){

      let value = (<HTMLInputElement>document.getElementById('min')).value;
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '');

      this.longitud.valorMin = value.length - 1;

    }else if( tipo === 'valorMax' ){

      let value = (<HTMLInputElement>document.getElementById('max')).value;
      value = value.replace(/[.*+?^${}()|[\]\\]/g, '');

      this.longitud.valorMax = value.length - 1;

    }

  }

  wrapperActiveFase = false;
  wrapperActiveModalidad = false;
  wrapperActiveDepartamento = false;
  wrapperActiveMunicipio = false;
  wrapperActiveSector = false;
  wrapperActiveProducto = false;

  show( tipo: string ){
  
    if( tipo === 'fase' ){
      if( !this.wrapperActiveFase ){
        this.wrapperActiveFase = true;
      }else{
        this.wrapperActiveFase = false;
      }

      this.wrapperActiveModalidad = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveMunicipio = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveProducto = false;
      
    }

    if( tipo === 'modalidad' ){
      if( !this.wrapperActiveModalidad ){
        this.wrapperActiveModalidad = true;
      }else{
        this.wrapperActiveModalidad = false;
      }

      this.wrapperActiveFase = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveMunicipio = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveProducto = false;
      
    }

    if( tipo === 'departamento' ){
      console.log(1);
      
      if( !this.wrapperActiveDepartamento ){
        this.wrapperActiveDepartamento = true;
      }else{
        this.wrapperActiveDepartamento = false;
      }

      this.wrapperActiveFase = false;
      this.wrapperActiveModalidad = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'municipio' ){
      if( !this.wrapperActiveMunicipio ){
        this.wrapperActiveMunicipio = true;
      }else{
        this.wrapperActiveMunicipio = false;
      }

      this.wrapperActiveFase = false;
      this.wrapperActiveModalidad = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveProducto = false;
      
    }

    if( tipo === 'sector' ){
      
      if( !this.wrapperActiveSector ){
        this.wrapperActiveSector = true;
      }else{
        this.wrapperActiveSector = false;
      }

      this.wrapperActiveFase = false;
      this.wrapperActiveModalidad = false;
      this.wrapperActiveMunicipio = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveProducto = false;
      
    }

    if( tipo === 'producto' ){
      if( !this.wrapperActiveProducto ){
        this.wrapperActiveProducto = true;
      }else{
        this.wrapperActiveProducto = false;
      }

      this.wrapperActiveFase = false;
      this.wrapperActiveModalidad = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveSector = false;
      this.wrapperActiveMunicipio = false;
      
    }

  }

}