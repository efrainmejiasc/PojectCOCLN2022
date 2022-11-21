import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionRelacionesSectorialesService } from 'src/app/_services/_gestion-relaciones-sectoriales/gestion-relaciones-sectoriales.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { DataCP } from 'src/app/_model/_compras-publicas/compraspublicas.interfaces';

@Component({
  selector: 'app-menugrs',
  templateUrl: './menugrs.component.html',
  styleUrls: ['./menugrs.component.scss']
})
export class MenugrsComponent implements OnInit {

  form!: FormGroup;
  fileUploadedName:string;
  fileId:string = "";
  fileDataResponse:any;
  fileReportString:string = "";
  plantillaString:string = "";
  uploadedFileString:string = "";
  fileUploadedSuccessful:boolean = false;

  showAlertModal:boolean = false;
  showGrsModal:boolean = false;
  showLastVersionSection:boolean = false;

  correlativaSelected = false;
  unspscSelected = false;
  readyToUpload = false;
  showHelpArchivos = false;
  uploadSuccessful:any;

  constructor(private layoutService:LayoutService,
              private dataService:GestionRelacionesSectorialesService) { };

  ngOnInit() {
    this.form = new FormGroup({
      fileName:new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      fileUploaded: new FormControl(null, {
        validators:[Validators.required]
      })
    });
  };

  validateXlsxFormat(file:File){

    return new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.addEventListener("loadend", ()=>{
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

        let header = "";

        for(let i = 0; i < arr.length; i++){
          header += arr[i].toString(16);
        };

        switch(header){
          case "504b34":
            resolve(true);
            break;
          default:
            resolve(false);
            break;
        };
      });
      fileReader.readAsArrayBuffer(file);
    });
  };

  async checkFileMimeType(file:File){

    const extension = file.name.slice( ((file.name.lastIndexOf(".") - 1) + 2) );

    if(extension !== "xlsx"){
      this.showAlertModal = true;
    }else{
      const isAnXlsxFile = await this.validateXlsxFormat(file);

      if(isAnXlsxFile){
        this.form.patchValue({ fileUploaded:file });
        this.form.patchValue({ fileName:file.name });
        this.form.get('fileUploaded').updateValueAndValidity();
      }else{
        this.showAlertModal = true;
      };
    };
  };

  onFilePicked(event:Event){

    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.checkFileMimeType(file);
  };

  closeAlert(){
    this.showAlertModal = false;
  }

  onSubmit(){
    this.layoutService.showLoading();

    let file:File = this.form.value.fileUploaded;
    this.form.reset();

    this.dataService.uploadFile(file, this.correlativaSelected).subscribe((response:DataCP)=>{

      this.fileDataResponse = response.data;
      this.fileId = this.fileDataResponse.identifier;
      if(this.fileDataResponse.failedRecordsNumber <= 0){
        this.generateSuccessReport();
      }else{
        this.generateFailedReport();
      };
    });
  };

  generateSuccessReport(){
    this.showGrsModal = true;
    this.layoutService.closeLoading();
  };

  generateFailedReport(){
    this.dataService.generateReport(this.fileId, this.correlativaSelected).subscribe((response:Blob)=>{
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);

      this.fileReportString = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      this.showGrsModal = true;
      this.layoutService.closeLoading();
    });
  };

  downloadReport(){
    let filename: string = "reporte";
    let downloadLink = document.createElement('a');
    downloadLink.href = this.fileReportString;

    if(filename){
      downloadLink.setAttribute('download', filename)
    };
    document.body.appendChild(downloadLink);
    downloadLink.click();

    this.showGrsModal = false;
  };

  uploadFileToServer(){
    this.layoutService.showLoading();

    if(this.correlativaSelected){
      this.dataService.uploadInfoCorrelativeToServer(this.fileId).subscribe((response:DataCP)=>{

        this.layoutService.closeLoading();

        if(response.data.result === 'OK'){
          this.showGrsModal = true;
          this.fileUploadedSuccessful = true;
        }else{
          alert("tuvimos un problema con el sistema, por favor íntentalo de nuevo");
        };
      });
    }else{
      this.dataService.uploadInfoUnspscToServer(this.fileId).subscribe((response:DataCP)=>{
        this.layoutService.closeLoading();

        if(response.data.result === 'OK'){
          this.showGrsModal = true;
          this.fileUploadedSuccessful = true;
        }else{
          alert("tuvimos un problema con el sistema, por favor íntentalo de nuevo");
        };
      });
    };

    this.showGrsModal = false;
  };

  exitUploadFileToServer(){
    this.showGrsModal = false;
  };

  showCorrelativa(){
    this.unspscSelected = false;
    this.correlativaSelected = !this.correlativaSelected;

    let divU = document.getElementById("g-unspsc");
    divU.className = "grs-normal";

    let divC = document.getElementById("g-correlativa");
    divC.className = (this.correlativaSelected) ? "grs-selected" : "grs-normal";

    this.showLastVersionSection = false;

    if(this.correlativaSelected){
      this.checkUploadedCorrelativeDocument();
    };
  };

  checkUploadedCorrelativeDocument(){
    this.layoutService.showLoading();

    this.dataService.getCorrelativeFileName().subscribe((response:DataCP)=>{
      this.fileUploadedName = response.data.message;

      if(this.fileUploadedName){
        this.showCorrelativaUploadedDocument();
      }else{
        this.layoutService.closeLoading();
      };
    });
  };

  showCorrelativaUploadedDocument(){
    this.layoutService.showLoading();

    this.dataService.downloadUploadedCorrelativeRecords().subscribe((response:Blob)=>{

      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);

      if(response.size >0){
        this.showLastVersionSection = true;
      };

      this.layoutService.closeLoading();
    });
  };

  showUnspsc(){
    this.layoutService.showLoading();

    this.correlativaSelected = false;
    this.unspscSelected = !this.unspscSelected;

    let divU = document.getElementById("g-unspsc");
    divU.className = (this.unspscSelected) ? "grs-selected" : "grs-normal";

    let divC = document.getElementById("g-correlativa");
    divC.className = "grs-normal";

    this.showLastVersionSection = false;

    if(this.unspscSelected){
      this.checkUploadedUnspscDocument();
    };
  };

  checkUploadedUnspscDocument(){
    this.layoutService.showLoading();

    this.dataService.getUnspscFileName().subscribe((response:DataCP)=>{
      this.fileUploadedName = response.data.message;

      if(this.fileUploadedName){
        this.showUnspscUploadedDocument();
      }else{
        this.layoutService.closeLoading();
      };
    });
  };

  showUnspscUploadedDocument(){
    this.layoutService.showLoading();

    this.dataService.downloadUploadedUnspscRecords().subscribe((response:Blob)=>{

      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);

      if(response.size >0){
        this.showLastVersionSection = true;
      };

      this.layoutService.closeLoading();
    });
  };

  downloadTemplate(){
    this.layoutService.showLoading();

    if(this.correlativaSelected){
      this.dataService.getTemplateCorrelativa().subscribe((response:Blob) =>{

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);

        this.plantillaString = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        let filename: string = "Correlativa CP-CIIU-UNSPSC-CLN";
        let downloadLink = document.createElement('a');
        downloadLink.href = this.plantillaString;

        if(filename){
          downloadLink.setAttribute('download', filename)
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.layoutService.closeLoading();
      })
    }else{
      this.dataService.getTemplateUnspsc().subscribe((response:Blob) =>{

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);

        this.plantillaString = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        let filename: string = "Clasificador de bienes y servicios v14";
        let downloadLink = document.createElement('a');
        downloadLink.href = this.plantillaString;

        if(filename){
          downloadLink.setAttribute('download', filename)
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.layoutService.closeLoading();
      })
    };
  };

  toogleHelpArchivos(){
    this.showHelpArchivos = !this.showHelpArchivos;
  };

  onAfterUpload(){
    this.showGrsModal = false;
    this.fileUploadedSuccessful = false;
    this.showLastVersionSection = false;

    if(this.correlativaSelected){
      this.checkUploadedCorrelativeDocument();
    }else{
      this.checkUploadedUnspscDocument();
    };
  };

  downloadUploadedRecords(){
    this.layoutService.showLoading();

    if(this.correlativaSelected)
    {
      this.dataService.downloadUploadedCorrelativeRecords().subscribe((response:Blob)=>{

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);

        this.uploadedFileString = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        let filename: string = this.fileUploadedName;
        let downloadLink = document.createElement('a');
        downloadLink.href = this.uploadedFileString;

        if(filename){
          downloadLink.setAttribute('download', filename)
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.layoutService.closeLoading();
      });
    }else{
      this.dataService.downloadUploadedUnspscRecords().subscribe((response:Blob)=>{

        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);

        this.uploadedFileString = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        let filename: string = this.fileUploadedName;
        let downloadLink = document.createElement('a');
        downloadLink.href = this.uploadedFileString;

        if(filename){
          downloadLink.setAttribute('download', filename)
        };
        document.body.appendChild(downloadLink);
        downloadLink.click();

        this.layoutService.closeLoading();
      });
    };
  };
};
