import { ChangeDetectorRef, Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { CiudadCP, DepartamentoCP, EntidadCP, ModeCP } from 'src/app/_model/_compras-publicas/compraspublicas.interfaces';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { PlanesAdquisicionService } from 'src/app/_services/_planes-adquisicion.service/planes-adquisicion.service';
import { currencyFormat } from 'src/utils/currencyFormat';

export interface AcquisitionPlans {
  idAcquisitionPlans: number;
  categoriesCodes: string;
  entityName: string;
  acquisitionValue: null;
  modality: string;
  location: string;
  contactInfo: string;
  contactEmail: string;
  contactPhone: string;
}
export interface AcquisitionPlan {
  idAcquisitionPlans: number;
  idPaa: string;
  entityName: string;
  year: string;
  createdDate: Date;
  lastEditDate: string;
  department: string;
  city: string;
  location: string;
  contactInfo: string;
  contactEmail: null;
  contactPhone: string;
  description: null;
  acquisitionValue: null;
  categoriesCodes: null;
  initDate: null;
  modality: null;
  duration: null;
  uid: null;
  isSecopOne: boolean;
  uploadDate: Date;
  codigoProducto: null;
  product: string;
}

@Component({
  selector: 'app-consultar-planes',
  templateUrl: './consultar-planes.component.html',
  styleUrls: ['./consultar-planes.component.scss']
})
export class ConsultarPlanesComponent implements OnInit, OnDestroy {
  @Output() linkTo = "/panel";
  @Output() titulo = "CONSULTA PLANES DE ADQUISICIÓN";
  @Output() buttonText = "COMPRAS PÚBLICAS";
  @Output() icono = "assets/imgs/iconos/adquisicion.svg";
  @Output() alertaIcono = "assets/imgs/home-editor/alerta.svg";
  @Output() infoAyuda = "Bienvenido(a), acá podrás consultar los planes anuales de adquisición publicados por las entidades territoriales.";

  acquisitionPlansTotalCount = 0;
  acquisitionPlanMinimumValue: any;
  acquisitionPlanMaximumValue: any;
  isOcultarCards = true;
  isOcultarPaginacion = true;
  isOcultarMsgNoRegistros = true;
  isOcultarMsgDisponibles = false;
  isOcultarMsgErrorRespuesta = true;

  closePopup(e: any) {
    this.showAlerta = false;
  };
  showAlerta = false;
  notificationMessage = 'El valor mínimo (Desde) no puede ser mayor que el valor máximo (Hasta)';

  contador(valor: any) {
    if (valor == null)
      return 0;
    else {
      return (1 + parseInt(valor.toString().split("+")[1])) || valor.toString().length;
    }
  }

  detallePlanAdquisicion: AcquisitionPlan;

  showHelp: boolean = false;
  formPlans: FormGroup;

  DATA: AcquisitionPlans[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<AcquisitionPlans> = new MatTableDataSource<AcquisitionPlans>(this.DATA);

  //Productos
  productosSelected: any[] = [];

  //mode
  modeSelected: ModeCP;
  modesSelected: ModeCP[] = [];
  idModesSelected: any[] = [];
  modes: ModeCP[] = [];
  modesNoSelected: ModeCP[] = [];
  allModeSelected = false;

  //Entidades
  entidadSelected: EntidadCP;
  entidadesSelected: any[] = [];
  entidadesEmpresaSubscription: Subscription;
  entidadesSearchSubscription: Subscription;
  entidades: EntidadCP[];
  entidadesNoSelected: EntidadCP[] = [];
  entidadesFoundList: EntidadCP[] = [];
  entidadesString = "";

  planesObj = new InterestObj();

  //Departamentos
  departamentosNoSelected: DepartamentoCP[] = [];
  departamentosSelected: DepartamentoCP[] = [];
  departamentoSelected: DepartamentoCP;
  idDepartamentosSelected: any[] = [];
  departamentos: any[] = [];
  departamentosData: any[] = [];
  allDepartmentsSelected = false;
  idDepRemoved: number = null;
  departamentosSObj = {};

  //Ciudades
  ciudadSelected: CiudadCP;
  ciudadesSelected: CiudadCP[] = [];
  idMunicipalitiesSelected: any[] = [];
  ciudades: CiudadCP[] = [];
  ciudadesNoSelected: CiudadCP[] = [];
  allMunicipalitiesSelected = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private _dataService: PlanesAdquisicionService,
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getModes();
    this.getDepartamentos();
    this.getAcquisitionPlansTotalCount();
    this.getAcquisitionPlanMaximumValue();

    this.planesObj.parentObj = this;
  };

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  toogleHelp() {
    this.showHelp = !this.showHelp;
  };

  buildForm() {
    this.formPlans = this.formBuilder.group(
      {
        rangoDesde: new FormControl(this.acquisitionPlanMinimumValue),
        rangoHasta: new FormControl(this.acquisitionPlanMaximumValue),
        fechaInicioProceso: new FormControl(''),
      }
    );
  }

  wrapperActiveModalidad = false;
  wrapperActiveDepartamento = false;
  wrapperActiveMunicipio = false;

  show( tipo: string ){

    if( tipo === 'modalidad' ){
      if( !this.wrapperActiveModalidad ){
        this.wrapperActiveModalidad = true;
      }else{
        this.wrapperActiveModalidad = false;
      }

      this.wrapperActiveDepartamento = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'departamento' ){
      
      if( !this.wrapperActiveDepartamento ){
        this.wrapperActiveDepartamento = true;
      }else{
        this.wrapperActiveDepartamento = false;
      }

      this.wrapperActiveModalidad = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'municipio' ){
      if( !this.wrapperActiveMunicipio ){
        this.wrapperActiveMunicipio = true;
      }else{
        this.wrapperActiveMunicipio = false;
      }

      this.wrapperActiveModalidad = false;
      this.wrapperActiveDepartamento = false;
      
    }

  }

  rangoDesdeValidate(): boolean {
    if (this.formPlans.controls["rangoHasta"].value) {
      if (this.formPlans.controls["rangoDesde"].value == null) {
        return true;
      }
      if (this.formPlans.controls["rangoDesde"].value > this.formPlans.controls["rangoHasta"].value) {
        return true;
      }
    }
    return false;
  }
  rangoHastaValidate(): boolean {
    return (
      (!this.formPlans.controls["rangoHasta"].value && this.formPlans.controls["rangoDesde"].value)
      || this.formPlans.controls["rangoDesde"].value > this.formPlans.controls["rangoHasta"].value
    )
  }

  onBlurRango(): void {
    const valorMin = document.querySelector("#rangoDesde")["value"].replace(/[$. ]/g, '');
    const valorMax = document.querySelector("#rangoHasta")["value"].replace(/[$. ]/g, '');

    if (valorMin !== '' && valorMax !== '') {
      if (parseInt(valorMin) > parseInt(valorMax)) {
        this.notificationMessage = 'El valor mínimo (Desde) no puede ser mayor que el valor máximo (Hasta)';
        this.showAlerta = true;
        this.formPlans.value.rangoDesde = 0;

        this.acquisitionPlanMinimumValue = this.numberFormatColombia(0);
        this.formPlans = this.formBuilder.group(
          {
            rangoDesde: new FormControl(0),
            rangoHasta: new FormControl(this.acquisitionPlanMaximumValue.replace(/[$. ]/g, '')),
            fechaInicioProceso: new FormControl(this.formPlans.value.fechaInicioProceso),
          }
        );
      }
    }
  }

  classifiers = [];
  setProducts(products) {
    this.classifiers = [];

    for (var i = 0; i < products.length; i++) {
      let productObj = products[i];

      let classifier = {
        id: 0,
        name: productObj.code
      };
      this.classifiers.push(classifier);
    };
  };

  // modalidad inicio**********************************************
  getModes() {
    this.layoutService.showLoading();

    this.modesNoSelected = [];
    this.modesSelected = [];
    this.modes = [];

    this._dataService.getAcquisitionPlansModalities().subscribe(
      (response: any) => {
        const mode = {
          id: -1,
          name: "Todos",
        }
        this.modes.push(mode);

        if (response.data) {
          const modesData = response.data;

          for (var i = 0; i < modesData.length; i++) {
            const modeData = modesData[i];
            const mode = {
              id: modeData.enumerator,
              name: modeData.mode,
            }
            this.modes.push(mode);
          };

          for (var i = 0; i < this.modes.length; i++) {
            const mode = this.modes[i];
            const indexOf = this.idModesSelected.indexOf(mode.id);
            if (indexOf < 0) {
              this.modesNoSelected.push(mode);
            } else {
              this.modesSelected.push(mode);
            };
          };
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  };

  idModeSelected(id: number) {

    if (id === -1) {
      this.allModeSelected = true;
      this.idModesSelected = [];
    } else {

      for (let i = 0; i < this.idModesSelected.length; i++) {
        let modeId = this.idModesSelected[i];

        if (modeId === -1) {
          this.idModesSelected.splice(i, 1);
          break;
        };
        this.allModeSelected = false;
      };
    };

    this.idModesSelected.push(id);
    this.getModes();
  };

  idModeRemove(id: number) {
    for (var i = 0; i < this.idModesSelected.length; i++) {
      const modeId = this.idModesSelected[i];
      if (modeId === id) {
        this.idModesSelected.splice(i, 1);
      };
    };
    this.getModes();
  };

  // modalidad fin

  // Entidad inicio ********************************************
  idEntidadSelected(name: string) {
    let entidad = {
      id: null,
      name: name
    }
    this.entidadesString += name;
    this.entidadesSelected.push(entidad);
  };

  idEntidadRemove(name: string) {

    for (let i = 0; i < this.entidadesSelected.length; i++) {
      let entidad = this.entidadesSelected[i];

      if (entidad.name === name) {
        this.entidadesSelected.splice(i, 1);
      };
    };
  };

  stringEntidad(word: string) {
    this.layoutService.showLoading();
    this.entidadesFoundList = [];
    this._dataService.getEntitiesNamesWithAcquisitionPlansByPhrase(word.trim()).subscribe(
      (response: any) => {
        if (response.data) {
          const dataList = response.data;
          for (var i = 0; i < dataList.length; i++) {
            const item = dataList[i];
            let wordS = {
              name: item.entityName,
              id: null
            }
            this.entidadesFoundList.push(wordS);
          };
        }
        this.layoutService.closeLoading();
      }
      , (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  };

  handleEntidadesList(list: any) {
    this.entidadesSelected = list;
  }
  // Entidad fin

  // Departamentos y ciudades *****************************
  getDepartamentos() {
    this.layoutService.showLoading();

    this.planesObj.departamentos = [];
    this.planesObj.departamentosById = {};
    this.planesObj.departamentosByName = {};

    const departamentoObj = new DepartamentoObj();
    departamentoObj.id = "all";
    departamentoObj.name = "Todos"
    departamentoObj.municipalities = [];
    this.planesObj.addDepartamento(departamentoObj);

    this._dataService.getTerritorialEntitiesInHiringProcess().subscribe((response: any) => {
      if (response.data) {
        const departamentosData = response.data;
        departamentosData.sort(function (a, b) {
          return a.territorialEntity > b.territorialEntity ? 1 : a.territorialEntity < b.territorialEntity ? -1 : 0;
        });
        this.departamentosData = departamentosData;
        for (var i = 0; i < departamentosData.length; i++) {
          let departamentoData = departamentosData[i];
          let departamentoObj = new DepartamentoObj();
          departamentoObj.id = departamentoData.daneCode;
          departamentoObj.name = departamentoData.territorialEntity
          departamentoObj.municipalities = departamentoData.municipalities;
          this.planesObj.addDepartamento(departamentoObj);
        };
        this.planesObj.updateLists();
      }
      this.layoutService.closeLoading();
    });
  };

  idDepSelected(id: number) {
    this.planesObj.selectDepartamento(id);
  };

  idDepRemove(id: number) {
    this.planesObj.unselectDepartamento(id);
  };

  idCiudadSelected(id: number) {
    this.planesObj.selectMunicipality(id);
  };

  idCiudadRemove(id: number) {
    this.planesObj.unselectMunicipality(id);
  };
  // fin departamentos y ciudades

  onSearch() {
    const query = this.getQueryOfForm();
    this.getAcquisitionPlansByFilter(query);
  }

  onClear() {
    this.acquisitionPlansTotalCount = 0;
    this.formPlans.reset();
    this.productosSelected = [];
    this.classifiers = [];
    this.entidadesSelected = [];

    for (let index = 0; index < this.planesObj.departamentosSelected.length; index++) {
      this.idDepRemove(this.planesObj.departamentosSelected[index].id);
    }

    for (let index = 0; index < this.planesObj.municipalitiesSelected.length; index++) {
      this.idCiudadRemove(this.planesObj.municipalitiesSelected[index].id);
    }

    for (let index = 0; index < this.modesSelected.length; index++) {
      this.idModeRemove(this.modesSelected[index].id);
    }

    this.isOcultarCards = true;
    this.isOcultarPaginacion = true;
    this.isOcultarMsgNoRegistros = true;
    this.isOcultarMsgErrorRespuesta = true;

    this.getAcquisitionPlansTotalCount();
    this.isOcultarMsgDisponibles = false;

  }

  getAcquisitionPlansTotalCount() {
    this.layoutService.showLoading();
    this._dataService.getAcquisitionPlansTotalCount().subscribe(
      (response: any) => {
        if (response[0].cantidadTotal) {
          this.acquisitionPlansTotalCount = response[0].cantidadTotal;
        }
        else {
          this.acquisitionPlansTotalCount = 0;
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  }

  getAcquisitionPlanMaximumValue() {
    this.layoutService.showLoading();
    this._dataService.getAcquisitionPlanMaximumValue().subscribe(
      (response: any) => {
        if (response.data.maximunValue) {
          this.acquisitionPlanMinimumValue = this.numberFormatColombia(0);
          this.acquisitionPlanMaximumValue = this.numberFormatColombia(parseInt(response.data.maximunValue));
          this.formPlans = this.formBuilder.group(
            {
              rangoDesde: new FormControl(0),
              rangoHasta: new FormControl(response.data.maximunValue),
              fechaInicioProceso: new FormControl(''),
            }
          );
        }
        else {
          this.formPlans.value.rangoHasta = 0;
          this.acquisitionPlanMaximumValue = this.numberFormatColombia(0);
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  }

  numberFormatColombia(valor: number) {
    const formato = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'COP'
    }).format(valor);
    return "$ " + formato.split(',')[0];
  }

  onExportarExcel() {
    const query = this.getQueryOfForm();
    this.exportAcquisitionPlansByFilterToExcel(query);
  }

  getQueryOfForm() {
    let query = '';

    query = this.concatenateQueryParametersSelectMulti(query, "uNSPSCCodes=", this.classifiers);

    query = this.concatenateQueryParametersSelectMulti(query, "modality=", this.modesSelected);

    if (this.formPlans.value.rangoDesde != null)
      query = this.concatenateQueryParameters(query, "minValue=" + document.querySelector("#rangoDesde")["value"].replace(/[$. ]/g, ''))

    if (this.formPlans.value.rangoHasta != null)
      query = this.concatenateQueryParameters(query, "maxValue=" + document.querySelector("#rangoHasta")["value"].replace(/[$. ]/g, ''))

    if (this.formPlans.value.fechaInicioProceso) {
      const year = this.formPlans.value.fechaInicioProceso.getFullYear();
      const currentMonth = this.formPlans.value.fechaInicioProceso.getMonth();
      const currentDay = this.formPlans.value.fechaInicioProceso.getDate();

      const month = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
      const day = currentDay < 10 ? `0${currentDay}` : currentDay;

      const fullDate = year + '-' + month + '-' + day + ' 00:00:00';

      query = this.concatenateQueryParameters(query, "dateInicial=" + fullDate)
    }

    query = this.concatenateQueryParametersSelectMulti(query, "entity=", this.entidadesSelected);

    query = this.concatenateQueryParametersSelectMulti(query, "dept=", this.planesObj.departamentosSelected);

    query = this.concatenateQueryParametersSelectMultiMinic(query, "munic=", this.planesObj.municipalitiesSelected);

    return query;
  }

  concatenateQueryParametersSelectMulti(queryBase: string, filtro: string, array: Array<any>) {
    let wordsWithComma = "";
    if (array.length <= 0)
      return queryBase;
    for (let i = 0; i < array.length; i++) {
      if (array[i].name == "Todos")
        return queryBase;
      wordsWithComma = this.concatenateWordsWithComma(wordsWithComma, array[i].name);
    };
    return this.concatenateQueryParameters(queryBase, filtro + wordsWithComma)
  };
  concatenateQueryParametersSelectMultiMinic(queryBase: string, filtro: string, array: Array<any>) {
    let wordsWithComma = "";
    if (array.length <= 0)
      return queryBase;
    for (let i = 0; i < array.length; i++) {
      if (array[i].name == "Todos")
        return queryBase;
      let minicipio = (array[i].name.split('-')[1]) || array[i].name;
      wordsWithComma = this.concatenateWordsWithComma(wordsWithComma, minicipio.trim());
    };
    return this.concatenateQueryParameters(queryBase, filtro + wordsWithComma)
  };

  concatenateQueryParameters(queryBase: string, queryNew: string): string {
    if (queryBase)
      return queryBase + "&" + queryNew;
    return queryBase + queryNew;
  }

  concatenateWordsWithComma(wordBase: string, wordNew: string): string {
    if (wordBase)
      return wordBase + "," + wordNew;
    return wordNew;
  }

  getAcquisitionPlansByFilter(query: string) {
    this.layoutService.showLoading();

    this.isOcultarCards = true;
    this.isOcultarPaginacion = true;
    this.isOcultarMsgNoRegistros = true;
    this.isOcultarMsgErrorRespuesta = true;
    this.isOcultarMsgDisponibles = true;

    this.dataSource = new MatTableDataSource<AcquisitionPlans>([]);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;

    this.obs = this.dataSource.connect();

    this._dataService.getAcquisitionPlansByFilter(query).subscribe(
      (response: any) => {
        if (response) {
          if (response.length > 800)
            response.splice(800);

          this.DATA = response;

          this.isOcultarCards = (response.length <= 0);
          this.isOcultarPaginacion = (response.length <= 8);
          this.isOcultarMsgNoRegistros = (response.length > 0);

          this.dataSource = new MatTableDataSource<AcquisitionPlans>(this.DATA);
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
        }
        else {
          this.isOcultarMsgNoRegistros = false;
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        this.isOcultarMsgErrorRespuesta = false;
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  }

  getAcquisitionPlanById(id: number, templateRef: any) {
    this.layoutService.showLoading();
    this._dataService.getAcquisitionPlanById(id).subscribe(
      (response: any) => {
        if (response) {
          this.detallePlanAdquisicion = response[0];
          this.dialog.open(templateRef, {
            width: '70%'
          });
        }
        else {
          this.notificationMessage = 'Los detalles de la adquisición no fueron encontrados';
          this.showAlerta = true;
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  }
  cerrarDialogTemplate() {
    this.dialog.closeAll();
  }

  exportAcquisitionPlansByFilterToExcel(query: string) {
    this.layoutService.showLoading();
    this._dataService.exportAcquisitionPlansByFilterToExcel(query).subscribe(
      (response: any) => {
        if (response.archivo) {
          const byteArray = new Uint8Array(atob(response.archivo).split('').map(char => char.charCodeAt(0)));
          const file = new Blob([byteArray], { type: 'application/vnd.ms-excel' });
          const fileURL = URL.createObjectURL(file);

          const date = new Date();
          const year = date.getFullYear();
          const currentMonth = date.getMonth();
          const currentDay = date.getDate();
          const month = (currentMonth + 1) < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
          const day = currentDay < 10 ? `0${currentDay}` : currentDay;
          const fullDate = `${day}-${month}-${year}`;
          let anchor = document.createElement("a");
          anchor.download = `Adquisiciones ${fullDate}.xlsx`;
          anchor.href = fileURL;
          anchor.click();
        }
        else {
          this.notificationMessage = 'Lo sentimos, no pudimos exportar el archivo';
          this.showAlerta = true;
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );
  }

  entidadesSeleccionadas = [];

  entidadSeleccionada(id) {
    this.entidadesSeleccionadas.push(id);
  }

  convertirValor(valor){
    return currencyFormat(valor).replace('COP', '')
  }

}

function InterestObj() {
  this.id;
  this.parentObj;
  this.departamentos = [];
  this.departamentosSelected = [];
  this.departamentosNoSelected = [];
  this.idsDepartamentosSelected = [];
  this.departamentosByName = {};
  this.departamentosById = {};
  this.municipalities = [];
  this.municipalitiesNoSelected = [];
  this.municipalitiesSelected = [];
  this.idsMunicipalitiesSelected = [];
  this.allDepartmentsSelected = false;
  this.allMunicipalitiesSelected = false;

  this.addDepartamento = function (departamento: any) {
    this.departamentos.push(departamento);
    this.departamentosByName[departamento.name] = departamento;
    this.departamentosById[departamento.id] = departamento;
  };

  this.selectDepartamento = function (id: any) {

    if (id === "all") {
      this.idsDepartamentosSelected = [];
      this.idsMunicipalitiesSelected = [];
      this.allDepartmentsSelected = true;
    } else {
      if (this.allDepartmentsSelected) {
        this.idsMunicipalitiesSelected = [];
      }
      this.allDepartmentsSelected = false;
      let index = this.idsDepartamentosSelected.indexOf("all");

      if (index >= 0) {
        this.idsDepartamentosSelected.splice(index, 1);
      };
    };

    this.idsDepartamentosSelected.push(id);
    this.parentObj.getDepartamentos();
  };

  this.unselectDepartamento = function (id: any) {

    let departamento = this.departamentosById[id];
    let index = this.idsDepartamentosSelected.indexOf(id);
    if (index >= 0) {
      this.idsDepartamentosSelected.splice(index, 1);
    };

    departamento && departamento.idsMunicipalities.forEach(idM => {
      let index = this.idsMunicipalitiesSelected.indexOf(idM);

      if (index >= 0) {
        this.idsMunicipalitiesSelected.splice(index, 1);
      }
    })
    this.parentObj.getDepartamentos();
  };

  this.selectMunicipality = function (id) {

    if (id === "all") {
      this.idsMunicipalitiesSelected = [];
      this.allMunicipalitiesSelected = true;
    } else {
      if (this.allMunicipalitiesSelected) {
        this.idsMunicipalitiesSelected = [];
      }

      this.allMunicipalitiesSelected = false;
      let index = this.idsMunicipalitiesSelected.indexOf("all");

      if (index >= 0) {
        this.idsMunicipalitiesSelected.splice(index, 1);
      };
    };

    this.idsMunicipalitiesSelected.push(id);
    this.parentObj.getDepartamentos();
  };

  this.unselectMunicipality = function (id) {

    if (id === "all") {
      this.allMunicipalitiesSelected = false;
      this.idsMunicipalitiesSelected = [];
    }

    let index = this.idsMunicipalitiesSelected.indexOf(id);
    if (index >= 0) {
      this.idsMunicipalitiesSelected.splice(index, 1);
    }
    this.parentObj.getDepartamentos();
  }

  this.updateLists = function () {

    this.departamentosSelected = [];
    this.departamentosNoSelected = [];

    for (let i = 0; i < this.idsDepartamentosSelected.length; i++) {
      let depId = this.idsDepartamentosSelected[i];

      let departamentoObj = this.departamentosById[depId];
      departamentoObj.isSelected = true;
    };

    for (let i = 0; i < this.departamentos.length; i++) {
      const departamentoObj = this.departamentos[i];
      if (!departamentoObj.isSelected) {
        this.departamentosNoSelected.push(departamentoObj);
      } else {
        this.departamentosSelected.push(departamentoObj);
      };
    };

    this.updateMunicipalitiesList();
  };

  this.updateMunicipalitiesList = () => {

    this.municipalitiesSelected = [];
    this.municipalitiesNoSelected = [];
    if (this.allMunicipalitiesSelected) {
      this.idsMunicipalitiesSelected = [];
    }

    let departmentsList = (this.allDepartmentsSelected) ? this.departamentos : this.departamentosSelected;

    for (var i = 0; i < departmentsList.length; i++) {
      let departamentoObj = departmentsList[i];
      departamentoObj.idsMunicipalities = [];

      departamentoObj.municipalities.forEach(municipalityData => {

        let municipality = new MunicipalityObj()
        municipality.id = municipalityData.daneCode;
        if (departmentsList.length >= 2) {
          municipality.name = departamentoObj.name + " - " + municipalityData.territorialEntity;
        }
        else {
          municipality.name = municipalityData.territorialEntity;
        }

        if (this.allMunicipalitiesSelected) {
          this.idsMunicipalitiesSelected.push(municipality.id);
        } else {
          let index = this.idsMunicipalitiesSelected.indexOf(municipality.id);

          if (index >= 0) {
            this.municipalitiesSelected.push(municipality);
          } else {
            this.municipalitiesNoSelected.push(municipality);
          }
          this.municipalities.push(municipality);
          departamentoObj.idsMunicipalities.push(municipality.id);
        };
      });
    };

    this.municipalitiesNoSelected.sort(compare_lname);
    this.municipalitiesSelected.sort(compare_lname);
    this.municipalities.sort(compare_lname);

    let municipality = {
      id: "all",
      name: "Todos"
    };

    if (this.allMunicipalitiesSelected) {
      this.municipalitiesSelected.unshift(municipality);
    } else {
      this.municipalitiesNoSelected.unshift(municipality);
    };
  };

  



};

function DepartamentoObj() {
  this.id;
  this.name;
  this.isSelected = false;
  this.municipalities = [];
  this.idsMunicipalitiesSelected = [];
  this.idsMunicipalities = [];

  this.addMunicipalitie = function () {
    let municipality = new MunicipalityObj();

    this.municipalities.push(municipality);
  }

  this.handleSelect = function () {
    this.isSelected = true;
  }
}

function MunicipalityObj() {
  this.id;
  this.name;
}

function compare_lname(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
};