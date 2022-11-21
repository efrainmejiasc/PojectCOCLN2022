import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GenerarReportesCitasService } from 'src/app/_services/_generar-reportes-citas/generar-reportes-citas.service';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generar-reportes-citas',
  templateUrl: './generar-reportes-citas.component.html',
  styleUrls: ['./generar-reportes-citas.component.scss']
})
export class GenerarReportesCitasComponent implements OnInit {

  linkTo = "/panel";
  titulo = "REPORTES - CITAS DE NEGOCIOS VIRTUALES";
  icono = "assets/imgs/iconos/reporteCita.svg";
  alertaIcono = "assets/imgs/home-editor/alerta.svg";
  infoAyuda = "Bienvenido(a), aquí podrás consultar los diferentes reportes existentes de citas virtuales.";

  showHelp: boolean = false;
  formAppointmentDate = this.formBuilder.group({});

  dateSessionString: string;
  dateSession: Date;
  dateSessionString2: string;
  dateSession2: Date;

  maxDayPast: Date;
  maxDayPresent: Date;


  constructor(
    private _reportSvc: GenerarReportesCitasService, 
    private formBuilder: FormBuilder, 
    private layoutService: LayoutService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    }

  ngOnInit() {

    this.promise.then(s => {
      this.formAppointmentDate = this.buildForm();
      this.cargarFechaAnterior();
      this.cargarFechaActual();
      this.cargarListaReportes();
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

  reportList = [];
  reporteSelected: any = {
    "id": "",
    "name": "",
    "url": ""
  };

  private buildForm() {
    return this.formBuilder.group({
      fechaInicioProceso: [null, Validators.required],
      fechaFinProceso: [null, Validators.required],
    });
  }
  cargarFechaAnterior() {
    let newdate = new Date();
    newdate.setDate(newdate.getDate() - 365);
    let newDateFinal = new Date(newdate);
    this.formAppointmentDate.get('fechaInicioProceso').setValue(newDateFinal);
    this.maxDayPast = newDateFinal;
  }
  cargarFechaActual() {
    let newdate = new Date();
    this.formAppointmentDate.get('fechaFinProceso').setValue(newdate);
    this.maxDayPresent = newdate;
  }
  cargarListaReportes() {
    this.layoutService.showLoading();
    this._reportSvc.getVirtualAppointmentsReports().subscribe((response: any) => {
      if (response.succeeded && response.data) {
        this.reportList = response.data.map(function (item: any) {
          item["id"] = item.enumerator;
          return item;
        });
        this.reportList = response.data;
        console.log(this.reportList);
        if (this.reportList[0].id)
          this.idReporteSelected(this.reportList[0].id);
      }
      else {
        console.log("Data no recibida");
      }
      this.layoutService.closeLoading();
    },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      });
  }
  descargarReporte() {
    this.layoutService.showLoading();
    let date1 = Date.parse(this.formAppointmentDate.get('fechaInicioProceso').value);
    this.dateSession = new Date(date1);
    this.dateSessionString = `${this.dateSession.getFullYear()}-${this.dateSession.getMonth() + 1
      }-${this.dateSession.getDate()}`;
    let date2 = Date.parse(this.formAppointmentDate.get('fechaFinProceso').value);
    this.dateSession2 = new Date(date2);
    this.dateSessionString2 = `${this.dateSession2.getFullYear()}-${this.dateSession2.getMonth() + 1
      }-${this.dateSession2.getDate()}`;
    if (this.dateSessionString == 'NaN-NaN-NaN') this.dateSessionString = '';
    if (this.dateSessionString2 == 'NaN-NaN-NaN') this.dateSessionString2 = '';
    this._reportSvc.getVirtualAppointmentsReportsExcel(this.dateSessionString, this.dateSessionString2).subscribe(result => {
      if (result != null) {
        let name = result.filename;
        const fileName = name;
        const objectUrl: string = URL.createObjectURL(result.file);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
        this.layoutService.closeLoading();
      }
      else {
        console.log(result)
        this.layoutService.closeLoading();
      }
    }, error => {
    }
    );
  }
  idReporteSelected(id: string) {
    this.reporteSelected = this.reportList.find(item => item.enumerator === id);
  };
}
