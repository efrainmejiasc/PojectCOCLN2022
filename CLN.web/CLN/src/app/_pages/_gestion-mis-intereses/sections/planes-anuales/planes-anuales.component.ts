import { Component, OnInit } from '@angular/core';
import { CompanyInterestCP, DepartamentoCP, CiudadCP, EntidadCP, StageCP, ModeCP } from 'src/app/_model/_compras-publicas/compraspublicas.interfaces';
import { Subscription } from 'rxjs';
import { GestionMisInteresesService } from 'src/app/_services/_gestion-mis-intereses/gestion-mis-intereses.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-planes-anuales',
  templateUrl: './planes-anuales.component.html',
  styleUrls: ['./planes-anuales.component.scss']
})
export class PlanesAnualesComponent implements OnInit {

  companyInterest:any = {
    idCompanyInterest: 0,
    idCompanyProfile: 0,
    interestType: "Planes anuales de adquisición",
    allDepartements: true,
    allMunicipalities: true,
    allStage: true,
    companies: "",
    allMode: true,
    allValues: true,
    allMonths: true,
    minimumValues: 1,
    maximumValues: 1,
    includeValues: false,
    departments:[],
    municipalities:[],
    stages:[],
    modes:[],
    classifiers:[],
    months:[]
  }

  interestObj = new InterestObj();

  guardarOn:boolean = false;
  hasMadeChanges:boolean = false;
  disabledButton = false;

  //Departamentos
  departamentosNoSelected:DepartamentoCP[] = [];
  departamentosSelected:DepartamentoCP[] = [];
  departamentoSelected:DepartamentoCP;
  idDepartamentosSelected:any[] = [];
  idDepartamentosOr:any[] = [];
  departamentos:any[] = [];
  departamentosData:any[] = [];
  allDepartmentsSelected = false;
  idDepRemoved:number = null;
  departamentosSObj = {};
  showAlertDepartamentos = false;

  //Ciudades
  ciudadSelected:CiudadCP;
  ciudadesSelected:CiudadCP[] = [];
  idMunicipalitiesSelected:any[] = [];
  ciudades:CiudadCP[] = [];
  ciudadesNoSelected:CiudadCP[] = [];
  allMunicipalitiesSelected = false;
  showAlertMunicipalities = false;

  //Stage
  stageSelected:StageCP;
  stagesSelected:StageCP[] = [];
  idStagesSelected:any[] = [];
  stages:StageCP[] = [];
  stagesNoSelected:StageCP[] = [];
  allStageSelected = false;


  //mode
  modeSelected:ModeCP;
  modesSelected:ModeCP[] = [];
  idModesSelected:any[] = [];
  modes:ModeCP[] = [];
  modesNoSelected:ModeCP[] = [];
  allModeSelected = false;
  showAlertModes = false;

  //Entidades
  entidadSelected:EntidadCP;
  entidadesSelected:any[] = [];
  entidadesEmpresaSubscription:Subscription;
  entidadesSearchSubscription:Subscription;
  entidades:EntidadCP[];
  entidadesNoSelected:EntidadCP[] = [];
  entidadesFoundList:EntidadCP[] = [];
  entidadesString="";

  //values
  maximunValuePossible:number = 10;

  //Productos
  productosSelected:any[] = [];
  showAlertProducts = false;

  //meses
  monthsSelected:any[] = [];
  idsMonthSelected:any[] = [];
  months:any[] = [];
  monthsNoSelected:any[] = [];
  allmonthsSelected = false;
  showAlertMonths = false;

  notificationMessage = "Tus intereses en procesos de compra pública han sido guardados exitosamente. Las ofertas que aplican a tus intereses se actualizarán en el transcurso de las siguientes 24 horas.";
  showNotification:boolean = false;

  constructor(private dataService:GestionMisInteresesService,
    private layoutService:LayoutService) { }

  ngOnInit() {
    this.layoutService.cambiosEmisor.next(true);
    this.getCompanyInterestData();
  };

  resetValues(){

    this.layoutService.cambiosEmisor.next(true);
    this.hasMadeChanges = false;
    this.guardarOn = false;

    this.interestObj = new InterestObj();
    this.interestObj.parentObj = this;

    //Departamentos
    this.departamentosNoSelected = []
    this.departamentosSelected = []
    this.departamentoSelected=null;
    this.idDepartamentosSelected = []
    this.departamentos = []
    this.departamentosData = []
    this.allDepartmentsSelected = false;
    this.idDepRemoved=null;
    this.departamentosSObj = {};
    this.showAlertDepartamentos = false;

    //Ciudades
    this.ciudadSelected = null;
    this.ciudadesSelected = []
    this.idMunicipalitiesSelected = []
    this.ciudades = []
    this.ciudadesNoSelected = []
    this.allMunicipalitiesSelected = false;
    this.showAlertMunicipalities = false;

    //Stage
    this.stageSelected = null;
    this.stagesSelected = []
    this.idStagesSelected = []
    this.stages = []
    this.stagesNoSelected = []
    this.allStageSelected = false;

    //mode
    this.modeSelected=null
    this.modesSelected = []
    this.idModesSelected = []
    this.modes = []
    this.modesNoSelected = []
    this.allModeSelected = false;
    this.showAlertModes = false;


    //Entidades
    this.entidadSelected=null;
    this.entidadesSelected = []
    this.entidades = []
    this.entidadesNoSelected = []
    this.entidadesFoundList = []
    this.entidadesString="";

    //Productos
    this.productosSelected = [];
    this.showAlertProducts = false;

    //meses

    this.monthsSelected = []
    this.idsMonthSelected = []
    this.months = [
      {
        name:"Todos",
        id:-1
      },
      {
        name:"Enero",
        id:1
      },
      {
        name:"Febrero",
        id:2
      },
      {
        name:"Marzo",
        id:3
      },
      {
        name:"Abril",
        id:4
      },
      {
        name:"Mayo",
        id:5
      },
      {
        name:"Junio",
        id:6
      },
      {
        name:"Julio",
        id:7
      },
      {
        name:"Agosto",
        id:8
      },
      {
        name:"Septiembre",
        id:9
      },
      {
        name:"Octubre",
        id:10
      },
      {
        name:"Noviembre",
        id:11
      },
      {
        name:"Diciembre",
        id:12
      }
    ]
    this.monthsNoSelected = [];
    this.allmonthsSelected = false;
    this.showAlertMonths = false;
  }

  getCompanyInterestData(){

    this.layoutService.showLoading();

    this.resetValues();

    this.dataService.getCompanyInterest().subscribe((response:any)=>{

      response.data.forEach(company=>{
        if(company.interestType === "Planes anuales de adquisición"){
          this.companyInterest = company;
        };
      });

      if(this.companyInterest.allDepartements){
        this.interestObj.allDepartmentsSelected = true;
        this.interestObj.idsDepartamentosSelected =[];
        this.interestObj.idsDepartamentosSelected.push("all")
      };

      if(this.companyInterest.departments){
        for(let i=0; i<this.companyInterest.departments.length; i++){
          let departamento = this.companyInterest.departments[i];
          this.idDepartamentosSelected.push(departamento.departmentDaneCode);
          this.idDepartamentosOr.push(departamento.departmentDaneCode);

          this.interestObj.idsDepartamentosSelected.push(departamento.departmentDaneCode);
        };
      };

      if(this.companyInterest.allMunicipalities){
        this.interestObj.allMunicipalitiesSelected = true;
      };

      if(this.companyInterest.municipalities){
        for(let i=0; i<this.companyInterest.municipalities.length; i++){
          let municipality = this.companyInterest.municipalities[i];
          this.interestObj.idsMunicipalitiesSelected.push(municipality.municipalityDaneCode);
        };
      };

      if(this.companyInterest.allStage){
        this.idStagesSelected.push(-1);
      }

      if(this.companyInterest.stages){
        for(let i=0; i<this.companyInterest.stages.length; i++){
          let stage = this.companyInterest.stages[i];
          this.idStagesSelected.push(stage.stage);
        };
      };

      if(this.companyInterest.companies){
        let entidadesString = this.companyInterest.companies;
        let entidadesArray = entidadesString.split(',');

        for(var i=0; i<entidadesArray.length; i++){
          let entidad = {
            id:null,
            name:entidadesArray[i]
          };
          this.entidadesSelected.push(entidad);
        };
      };

      if(this.companyInterest.allMode){
        this.idModesSelected.push(-1);
      }

      if(this.companyInterest.modes){
        for(let i=0; i<this.companyInterest.modes.length; i++){
          let mode = this.companyInterest.modes[i];
          this.idModesSelected.push(mode.mode);
        };
      };

      if(this.companyInterest.classifiers){
        for(let i=0; i<this.companyInterest.classifiers.length; i++){
          let item = this.companyInterest.classifiers[i];

          let producto = {
            id:item.classifierCode,
            name:item.classifierCode + " - " +item.classifierName,
            selected:true
          };
          this.productosSelected.push(producto);
        };
      };

      if(this.companyInterest.allMonths){
        this.idsMonthSelected.push(-1);
      }

      if(this.companyInterest.months){
        for(let i=0; i<this.companyInterest.months.length; i++){
          let monthId = this.companyInterest.months[i];
          this.idsMonthSelected.push(monthId.month);
        }
        for(let i=0; i<this.months.length; i++){

          let month = this.months[i];

          let index = this.idsMonthSelected.indexOf(month.id);

          if(index >= 0){
            this.monthsSelected.push(month);
          }else{
            this.monthsNoSelected.push(month);
          };
        };
      };

      this.getDepartamentos();
      this.getStages();
      this.getModes();
      this.getMaximunValue();

      this.layoutService.closeLoading();
    });
  };

  getMaximunValue(){
    this.dataService.getMaximunValue().subscribe( (response:any)=>{

      this.maximunValuePossible = parseInt(response.data.maximunValue);

      if(this.companyInterest.maximumValues === 1){
        this.companyInterest.maximumValues = this.maximunValuePossible;
      }
      //this.companyInterest.maximumValues = parseInt(response.data.maximunValue);
    });
  };

  wrapperActiveProcesosPorModalidad = false;
  wrapperActiveProcesosPorFecha = false;
  wrapperActiveDepartamento = false;
  wrapperActiveMunicipio = false;

  show( tipo: string ){
  
    if( tipo === 'porFecha' ){
      if( !this.wrapperActiveProcesosPorFecha ){
        this.wrapperActiveProcesosPorFecha = true;
      }else{
        this.wrapperActiveProcesosPorFecha = false;
      }

      this.wrapperActiveProcesosPorModalidad = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'porModalidad' ){
      if( !this.wrapperActiveProcesosPorModalidad ){
        this.wrapperActiveProcesosPorModalidad = true;
      }else{
        this.wrapperActiveProcesosPorModalidad = false;
      }

      this.wrapperActiveProcesosPorFecha = false;
      this.wrapperActiveDepartamento = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'departamento' ){
      console.log(1);
      
      if( !this.wrapperActiveDepartamento ){
        this.wrapperActiveDepartamento = true;
      }else{
        this.wrapperActiveDepartamento = false;
      }

      this.wrapperActiveProcesosPorModalidad = false;
      this.wrapperActiveProcesosPorFecha = false;
      this.wrapperActiveMunicipio = false;
      
    }

    if( tipo === 'municipio' ){
      if( !this.wrapperActiveMunicipio ){
        this.wrapperActiveMunicipio = true;
      }else{
        this.wrapperActiveMunicipio = false;
      }

      this.wrapperActiveProcesosPorModalidad = false;
      this.wrapperActiveProcesosPorFecha = false;
      this.wrapperActiveDepartamento = false;
      
    }

  }

  getDepartamentos(){

    this.layoutService.showLoading();

    this.interestObj.departamentos = [];
    this.interestObj.departamentosById = {};
    this.interestObj.departamentosByName = {};

    const departamentoObj = new DepartamentoObj();
    departamentoObj.id = "all";
    departamentoObj.name = "Todos"
    departamentoObj.municipalities = [];
    this.interestObj.addDepartamento(departamentoObj);

    this.dataService.getDepartamentos().subscribe((response:any)=>{
      const departamentosData = response.data;
      this.departamentosData = departamentosData;

      for(var i=0; i<departamentosData.length; i++){

        let departamentoData = departamentosData[i];

        let departamentoObj = new DepartamentoObj();
        departamentoObj.id = departamentoData.daneCode;
        departamentoObj.name = departamentoData.territorialEntity
        departamentoObj.municipalities = departamentoData.municipalities;

        this.interestObj.addDepartamento(departamentoObj);
      };

      this.interestObj.updateLists();

      this.layoutService.closeLoading();
    });
  };

  idDepSelected(id: number) {
    this.interestObj.selectDepartamento(id);

    this.hasMadeChanges=true;
  };

  idDepRemove(id: number) {
    this.interestObj.unselectDepartamento(id);

    this.hasMadeChanges=true;    

  };

  idCiudadSelected(id: number) {
    this.interestObj.selectMunicipality(id);

    this.hasMadeChanges=true;
  };

  idCiudadRemove(id: number) {
    this.interestObj.unselectMunicipality(id);

    this.hasMadeChanges=true;
  };

  getMonths(){
    this.monthsSelected = [];
    this.monthsNoSelected = [];

    for(let i=0; i<this.months.length; i++){

      let month = this.months[i];

      let index = this.idsMonthSelected.indexOf(month.id);

      if(index >= 0){
        this.monthsSelected.push(month);
      }else{
        this.monthsNoSelected.push(month);
      };
    };

    if(this.hasMadeChanges){
      this.checkRequiredFields();
    }
  };

  getStages(){
    this.layoutService.showLoading();

    this.stagesNoSelected = [];
    this.stagesSelected = [];
    this.stages = [];

    this.dataService.getHiringProcessesStage().subscribe((response:any)=>{

      const stage = {
        id: -1,
        name: "Todos",
      }
      this.stages.push(stage);

      const stagesData = response.data;

      for(var i=0; i<stagesData.length; i++){
        const stageData = stagesData[i];
        const stage = {
          id: stageData.enumerator,
          name: stageData.stage,
        }
        this.stages.push(stage);
      };

      for(var i=0; i<this.stages.length; i++){
        const stage = this.stages[i];
        const indexOf = this.idStagesSelected.indexOf(stage.id);
        if(indexOf < 0){
          this.stagesNoSelected.push(stage);
        }else{
          this.stagesSelected.push(stage);
        };
      };

      if(this.hasMadeChanges){
        this.checkRequiredFields();
      }

      this.layoutService.closeLoading();
    });
  };

  idStageSelected(id: number) {

    if(id === -1){
      this.allStageSelected = true;
      this.idStagesSelected = [];
    }else{

      for(let i=0; i<this.idStagesSelected.length; i++){
        let stageId = this.idStagesSelected[i];

        if(stageId === -1){
          this.idStagesSelected.splice(i, 1);
          break;
        };
        this.allStageSelected = false;
      };
    };

    this.idStagesSelected.push(id);

    this.hasMadeChanges=true;

    this.getStages();
  };

  idStageRemove(id: number) {
    for(var i=0; i<this.idStagesSelected.length; i++){
      const stageId = this.idStagesSelected[i];
      if(stageId === id){
        this.idStagesSelected.splice(i, 1);
      };
    };

    this.hasMadeChanges=true;

    this.getStages();
  };

  idMonthSelected(id: number) {

    if(id === -1){
      this.allmonthsSelected = true;
      this.idsMonthSelected = [];
    }else{

      for(let i=0; i<this.idsMonthSelected.length; i++){
        let monthId = this.idsMonthSelected[i];

        if(monthId === -1){
          this.idsMonthSelected.splice(i, 1);
          break;
        };
      };
    };

    this.idsMonthSelected.push(id);

    this.hasMadeChanges=true;

    this.getMonths();
  };

  idMonthRemove(id: number) {
    for(var i=0; i<this.idsMonthSelected.length; i++){
      const monthId = this.idsMonthSelected[i];
      if(monthId === id){
        this.idsMonthSelected.splice(i, 1);
      };
     };

     this.hasMadeChanges=true;

     this.getMonths();
  };

  getModes(){
    this.layoutService.showLoading();

    this.modesNoSelected = [];
    this.modesSelected = [];
    this.modes = [];

    this.dataService.getModes().subscribe((response:any)=>{

      const mode = {
        id: -1,
        name: "Todos",
      }
      this.modes.push(mode);

      const modesData = response.data;

      for(var i=0; i<modesData.length; i++){
        const modeData = modesData[i];
        const mode = {
          id: modeData.enumerator,
          name: modeData.mode,
        }
        this.modes.push(mode);
      };

      for(var i=0; i<this.modes.length; i++){
        const mode = this.modes[i];
        const indexOf = this.idModesSelected.indexOf(mode.id);
        if(indexOf < 0){
          this.modesNoSelected.push(mode);
        }else{
          this.modesSelected.push(mode);
        };
      };

      if(this.hasMadeChanges){
        this.checkRequiredFields();
      }

      this.layoutService.closeLoading();
    });
  };

  idModeSelected(id: number) {

    if(id === -1){
      this.allModeSelected = true;
      this.idModesSelected = [];
    }else{

      for(let i=0; i<this.idModesSelected.length; i++){
        let modeId = this.idModesSelected[i];

        if(modeId === -1){
          this.idModesSelected.splice(i, 1);
          break;
        };
        this.allModeSelected = false;
      };
    };

    this.idModesSelected.push(id);

    this.hasMadeChanges=true;

    this.getModes();
  };

  idModeRemove(id: number) {
    for(var i=0; i<this.idModesSelected.length; i++){
      const modeId = this.idModesSelected[i];
      if(modeId === id){
        this.idModesSelected.splice(i, 1);
      };
     };

     this.hasMadeChanges=true;

     this.getModes();
  };

  idEntidadSelected(name: string) {
      let entidad ={
      id:null,
      name:name
    }
    this.entidadesString += name;

    this.entidadesSelected.push(entidad);

    this.hasMadeChanges=true;

    this.checkRequiredFields();
  };

  idEntidadRemove(name: string) {

    for(let i=0; i<this.entidadesSelected.length; i++){
      let entidad = this.entidadesSelected[i];

      if(entidad.name === name){
        this.entidadesSelected.splice(i, 1);
      };
    };

    this.hasMadeChanges=true;

    this.checkRequiredFields();
  };

  stringEntidad(word:string){
    this.layoutService.showLoading();
    this.entidadesFoundList = [];
    this.dataService.searchEntidadPlanes(word).subscribe( (response:any) =>{
      this.layoutService.closeLoading();
      const dataList = response.data;

      for(var i=0; i<dataList.length; i++){

        const item = dataList[i];

        let wordS = {
          name:item.entityName,
          id:null
        }
        this.entidadesFoundList.push(wordS);
      };
    });
  };

  handleEntidadesList(list:any){
    this.entidadesSelected = list;
  };

  setMinValue(value:number){
    this.companyInterest.minimumValues = value;
    this.hasMadeChanges=true;
    this.checkRequiredFields();
  };

  setMaxValue(value:number){
    this.companyInterest.maximumValues = value;
    this.hasMadeChanges=true;
    this.checkRequiredFields();
  };

  setAllValues(value:boolean){
    this.companyInterest.allValues = value;
    this.hasMadeChanges=true;
    this.checkRequiredFields();
  };

  setIncludeValues(value:boolean){
    this.companyInterest.includeValues = value;
    this.hasMadeChanges=true;
    this.checkRequiredFields();
  }

  checkRequiredFields(){

    this.layoutService.cambiosEmisor.next(false);

    this.companyInterest;
    this.guardarOn = true;
    this.showAlertDepartamentos = false;
    this.showAlertMunicipalities = false;
    this.showAlertModes = false;
    this.showAlertMonths = false;
    this.showAlertProducts = false;

    if(this.interestObj.idsDepartamentosSelected){
      if(this.interestObj.idsDepartamentosSelected.length < 1){
        this.guardarOn = false;
        this.showAlertDepartamentos = true;
      }
    }

    if(this.interestObj.idsMunicipalitiesSelected){
      if(this.interestObj.idsMunicipalitiesSelected.length < 1){
        this.guardarOn = false;
        this.showAlertMunicipalities = true;
      }
    }

    if(this.modesSelected){
      if(this.modesSelected.length <1){
        this.guardarOn = false;
        this.showAlertModes = true;
      };
    };

    if(this.monthsSelected){
      if(this.monthsSelected.length <1){
        this.guardarOn = false;
        this.showAlertMonths = true;
      };
    };

    if(this.companyInterest.classifiers){
      if(this.companyInterest.classifiers.length < 1){
        this.guardarOn = false;
        this.showAlertProducts = true;
      };
    };
  };

  saveCompanyInterest(){
    this.setDepartments();
    this.setMunicipalities();
    this.setStages();
    this.setEntidades();
    this.setModes();
    this.setMonths();
    this.goAndSave()
  };

  setDepartments(){
    this.companyInterest.departments = [];
    this.companyInterest.allDepartements = false;

    this.departamentosSelected = this.interestObj.departamentosSelected;

    if(this.interestObj.allDepartmentsSelected){
      this.companyInterest.allDepartements = true;
    }else{
      for(var i=0; i<this.departamentosSelected.length; i++){
        const departamentoData = this.departamentosSelected[i];

        const departamento = {
          idCompanyInterestDepartment: 0,
          idCompanyInterest:this.companyInterest.idCompanyInterest,
          departmentDaneCode:departamentoData.id
        }
        this.companyInterest.departments.push(departamento);
      };
    };
  };

  setMunicipalities(){
    this.companyInterest.municipalities = [];
    this.companyInterest.allMunicipalities = false;

    if(this.interestObj.allMunicipalitiesSelected){
      this.companyInterest.allMunicipalities = true;
    }else{
      this.ciudadesSelected = this.interestObj.municipalitiesSelected;

      if(this.interestObj.municipalitiesSelected.length>0){
        this.companyInterest.allMunicipalities = false;
      };

      for(var i=0; i<this.ciudadesSelected.length; i++){
        const municipalityData = this.ciudadesSelected[i];
        const municipality = {
          idCompanyInterest:this.companyInterest.idCompanyInterest,
          idCompanyInterestMunicipality:0,
          municipalityDaneCode:municipalityData.id
        };
        this.companyInterest.municipalities.push(municipality);
      };
    };
  };

  setStages(){
    this.companyInterest.stages = [];
    this.companyInterest.allStage = false;

    if(this.allStageSelected){
      this.companyInterest.allStage = true;
    }else{
      for(var i=0; i<this.stagesSelected.length; i++){

        const stagesData = this.stagesSelected[i];

        if(stagesData.id < 0){
          this.companyInterest.allStage = true;
        }else{
          const stage = {
            idCompanyInterestStage:0,
            idCompanyInterest:this.companyInterest.idCompanyInterest,
            stage:stagesData.id
          };
          this.companyInterest.stages.push(stage);
        };
      };
    };
  };

  setEntidades(){
    this.companyInterest.companies = "";
    for(let i=0; i<this.entidadesSelected.length; i++){

      let company = this.entidadesSelected[i];

      if(company.name){
        let companyStr = company.name;

        if(i < this.entidadesSelected.length-1){
          companyStr +=","
        };

        this.companyInterest.companies += companyStr;
      };
    };
  };

  setMonths(){
    this.companyInterest.months = [];
    this.companyInterest.allMonths = false;

    if(this.allmonthsSelected){
      this.companyInterest.allMonths = true;
    }else{
      if(this.idsMonthSelected){
        for(let i=0; i<this.idsMonthSelected.length; i++){

          let monthId = this.idsMonthSelected[i];

          if(monthId < 0){
            this.companyInterest.allMonths = true;
          }else{
            let month = {
              idCompanyInterest: this.companyInterest.idCompanyInterest,
              idCompanyInterestMonth: 0,
              month: monthId
            };

            this.companyInterest.months.push(month);
          };
        };
      };
    };
  };

  setModes(){
    this.companyInterest.modes = [];
    this.companyInterest.allMode = false;

    if(this.allModeSelected){
      this.companyInterest.allMode = true;
    }else{
      for(var i=0; i<this.modesSelected.length; i++){
        const modesData = this.modesSelected[i];

        if(modesData.id < 0){
          this.companyInterest.allMode = true;
        }else{
          const mode = {
            idCompanyInterestClassifier:0,
            idCompanyInterest:this.companyInterest.idCompanyInterest,
            mode:modesData.id
          };
          this.companyInterest.modes.push(mode);
        };
      };
    };
  };

  setProducts(products){
    this.companyInterest.classifiers = [];

    for(var i=0; i<products.length; i++){
      let productObj = products[i];

      let classifier = {
        idCompanyInterestClassifier:0,
        idCompanyInterest:this.companyInterest.idCompanyInterest,
        classifierCode:productObj.id
      };

      this.companyInterest.classifiers.push(classifier);
    };

    this.hasMadeChanges=true;

    this.checkRequiredFields();
  };

  goAndSave(){

    if(!this.guardarOn) return;

    this.disabledButton = true;

    this.companyInterest.interestType = "Planes anuales de adquisición";
    this.companyInterest.idCompanyProfile = this.dataService.idCompanyProfile;

    if(this.companyInterest.idCompanyInterest >0){
      this.dataService.updateCompanyInterest(this.companyInterest).subscribe( (response:any)=>{

        if(response.data.result === "FAIL"){
          alert("Lo sentimos, hubo un problema en el sistema");
          console.log(response.data.message);
        }else{
          this.showNotification = true;
        };
        this.disabledButton = false;
      }, error=>{
        alert("Lo sentimos, hubo un problema en el sistema");
        this.disabledButton = false;
      });
    }else{
      this.dataService.createCompanyInterest(this.companyInterest).subscribe( (response:any)=>{
        if(response.data.result === "FAIL"){
          alert("Lo sentimos, hubo un problema en el sistema");
          console.log(response.data.message);
        }else{
          this.showNotification = true;
        };
        this.disabledButton = true;
      }, error =>{
        alert("Lo sentimos, hubo un problema en el sistema");
        this.disabledButton = false;
      });
    };
  };

  closePopup(e){
    this.showNotification = false;
    this.ngOnInit();
  }
};

function InterestObj(){
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
  this.showAltList = true;

  this.addDepartamento = function(departamento:any){
    this.departamentos.push(departamento);
    this.departamentosByName[departamento.name] = departamento;
    this.departamentosById[departamento.id] = departamento;
  };

  this.selectDepartamento = function(id:any){

    if(id === "all"){
      this.idsDepartamentosSelected = [];
      this.idsMunicipalitiesSelected = [];
      this.allDepartmentsSelected = true;
    }else{
      if(this.allDepartmentsSelected){
        this.idsMunicipalitiesSelected = [];
      }
      this.allDepartmentsSelected = false;
      let index = this.idsDepartamentosSelected.indexOf("all");

      if(index >= 0){
        this.idsDepartamentosSelected.splice(index, 1);
      };
    };

    this.idsDepartamentosSelected.push(id);
    this.parentObj.getDepartamentos();
  };

  this.unselectDepartamento = function(id:any){

    let departamento = this.departamentosById[id];
    let index = this.idsDepartamentosSelected.indexOf(id);
    if(index>=0){
      this.idsDepartamentosSelected.splice(index, 1);
    };

    departamento.idsMunicipalities.forEach(idM =>{

      let index = this.idsMunicipalitiesSelected.indexOf(idM);

      if(index >=0){
        this.idsMunicipalitiesSelected.splice(index, 1);
      }
    })
    this.parentObj.getDepartamentos();

  };

  this.selectMunicipality = function(id){

    if(id==="all-municipalities"){
      this.idsMunicipalitiesSelected = [];
      this.allMunicipalitiesSelected = true;
    }else{
      if(this.allMunicipalitiesSelected){
        this.idsMunicipalitiesSelected = [];
      }

      this.allMunicipalitiesSelected = false;
      let index = this.idsMunicipalitiesSelected.indexOf("all-municipalities");

      if(index >= 0){
        this.idsMunicipalitiesSelected.splice(index, 1);
      };
    };

    this.idsMunicipalitiesSelected.push(id);
    this.parentObj.getDepartamentos();
  };

  this.unselectMunicipality = function(id){

    if(id === "all-municipalities"){
      this.allMunicipalitiesSelected = false;
      this.idsMunicipalitiesSelected = [];
    }

    let index = this.idsMunicipalitiesSelected.indexOf(id);
    if(index>=0){
      this.idsMunicipalitiesSelected.splice(index, 1);
    }
    this.parentObj.getDepartamentos();
  }

  this.updateLists = function(){

    this.departamentosSelected = [];
    this.departamentosNoSelected = [];

    for(let i=0; i<this.idsDepartamentosSelected.length; i++){
      let depId = this.idsDepartamentosSelected[i];

      let departamentoObj = this.departamentosById[depId];
      departamentoObj.isSelected = true;
    };

    for(let i=0; i<this.departamentos.length; i++){
      const departamentoObj = this.departamentos[i];
      if(!departamentoObj.isSelected){
        this.departamentosNoSelected.push(departamentoObj);
      }else{
        this.departamentosSelected.push(departamentoObj);
      };
    };

    this.departamentosNoSelected.sort(compare_lname);
    this.departamentosSelected.sort(compare_lname);
    this.departamentos.sort(compare_lname);

    for(var i=0; i<this.departamentosNoSelected.length; i++){

      let departamentoObj = this.departamentosNoSelected[i];

      if(departamentoObj.name === "Todos"){
        this.departamentosNoSelected.splice(i, 1);
        this.departamentosNoSelected.unshift(departamentoObj);

        break;
      }
    }

    if(this.departamentosSelected.length > 1){
      this.showAltList = true;
    }else{
      this.showAltList = false;
    }

    this.updateMunicipalitiesList();
  };

  this.updateMunicipalitiesList = ()=>{

    this.municipalitiesSelected = [];
    this.municipalitiesNoSelected = [];
    if(this.allMunicipalitiesSelected){
      this.idsMunicipalitiesSelected = [];
    }

    let departmentsList = (this.allDepartmentsSelected) ? this.departamentos : this.departamentosSelected;

    for(var i=0; i<departmentsList.length; i++){
      let departamentoObj = departmentsList[i];
      departamentoObj.idsMunicipalities = [];

      departamentoObj.municipalities.forEach(municipalityData => {

        let municipalityName = (this.showAltList) ? departamentoObj.name + " - " + municipalityData.territorialEntity : municipalityData.territorialEntity

        let municipality = new MunicipalityObj()
        municipality.id = municipalityData.daneCode;
        municipality.name = municipalityName;


        if(this.allMunicipalitiesSelected){
          this.idsMunicipalitiesSelected.push(municipality.id);
        }else{
          let index = this.idsMunicipalitiesSelected.indexOf(municipality.id);

          if(index >=0){
            this.municipalitiesSelected.push(municipality);
          }else{
            if(this.departamentosSelected.length > 0){
              this.municipalitiesNoSelected.push(municipality);
            }
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
      id:"all-municipalities",
      name:"Todos"
    };

    if(this.allMunicipalitiesSelected){
      this.municipalitiesSelected.unshift(municipality);
    }else{
      this.municipalitiesNoSelected.unshift(municipality);
    };

    if(this.parentObj.hasMadeChanges){
      this.parentObj.checkRequiredFields();
    };
  };
};

function DepartamentoObj(){
  this.id;
  this.name;
  this.isSelected = false;
  this.municipalities = [];
  this.idsMunicipalitiesSelected = [];
  this.idsMunicipalities = [];

  this.addMunicipalitie = function(){
    let municipality = new MunicipalityObj();

    this.municipalities.push(municipality);
  }

  this.handleSelect = function(){
    this.isSelected = true;
  }
}

function MunicipalityObj(){
  this.id;
  this.name;
}

function compare_lname( a, b )
{
  if ( a.name.toLowerCase() < b.name.toLowerCase()){
    return -1;
  }
  if ( a.name.toLowerCase() > b.name.toLowerCase()){
    return 1;
  }
  return 0;
};

