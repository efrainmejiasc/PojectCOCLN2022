import { Component, OnInit } from '@angular/core';
import { ReportTrendsService } from '../../../../_services/news-trends/report-trends.service';
import { LayoutService } from '../../../../_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-reportes-tendencias',
  templateUrl: './reportes-tendencias.component.html',
  styleUrls: ['./reportes-tendencias.component.scss']
})
export class ReportesTendenciasComponent implements OnInit {

  constructor(
    private _dataService: ReportTrendsService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.obtenerReportesPowerBI();
  }

  // categorias = [];
  reporteSelected: any = {
    "id": "",
    "name": "",
    "url": ""
  };

  reportesPowerBi = [];

  // data = [
  //   {
  //     "enumerator": "1",
  //     "name": "Reporte de Usuarios en Curso Virtual 1",
  //     "isActive": "true",
  //     "translation": "https://app.powerbi.com/view?r=eyJrIjoiYzAzODZhMzYtYTU2OC00OTk1LWJjMzEtNzllNWVkNWFjMTk4IiwidCI6ImVjNWEzYTQ4LTY1NDgtNDBiMy1iYjE3LWFjMTdhMzhkMTYwMCIsImMiOjR9&pageName=ReportSection"
  //   },
  //   {
  //     "enumerator": "2",
  //     "name": "Reporte de Usuarios en Curso Virtual 2",
  //     "isActive": "true",
  //     "translation": "https://google.com"
  //   },
  //   {
  //     "enumerator": "3",
  //     "name": "Reporte de Usuarios en Curso Virtual 3",
  //     "isActive": "true",
  //     "translation": "https://app.powerbi.com/view?r=eyJrIjoiYzAzODZhMzYtYTU2OC00OTk1LWJjMzEtNzllNWVkNWFjMTk4IiwidCI6ImVjNWEzYTQ4LTY1NDgtNDBiMy1iYjE3LWFjMTdhMzhkMTYwMCIsImMiOjR9&pageName=ReportSection"
  //   },
  //   {
  //     "enumerator": "4",
  //     "name": "Reporte de Usuarios en Curso Virtual 4",
  //     "isActive": "true",
  //     "translation": "https://app.powerbi.com/view?r=eyJrIjoiYzAzODZhMzYtYTU2OC00OTk1LWJjMzEtNzllNWVkNWFjMTk4IiwidCI6ImVjNWEzYTQ4LTY1NDgtNDBiMy1iYjE3LWFjMTdhMzhkMTYwMCIsImMiOjR9&pageName=ReportSection"
  //   },
  // ];

  obtenerReportesPowerBI() {
    this.layoutService.showLoading();
    this._dataService.getReportTrendsUrls().subscribe(
      (response: any) => {
        if (response.succeeded && response.data) {

          this.reportesPowerBi = response.data.map(function (item:any) {
            item["id"] = item.enumerator;
            return item;
          });
          this.reportesPowerBi = response.data;
          if (this.reportesPowerBi[0].id)
            this.idReporteSelected(this.reportesPowerBi[0].id);
        }
        else {
          console.log("Data no recibida");
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        console.log(error);
        this.layoutService.closeLoading();
      }
    );

    // TODO: borrar cuando se consuma el servicio
    // this.reportesPowerBi = this.data.map(function (item) {
    //   item["id"] = item.enumerator;
    //   return item;
    // });
    // console.log("this.reportesPowerBi", this.reportesPowerBi[0].id, this.reportesPowerBi);
    
    // if (this.reportesPowerBi[0].id)
    //   this.idReporteSelected(this.reportesPowerBi[0].id);
  }

  idReporteSelected(id: string) {
    // this.layoutService.showLoading();
    this.reporteSelected = this.reportesPowerBi.find(item => item.id === id);
    // setTimeout(() => {
      // this.layoutService.closeLoading();
    // }, 1000);
  };
}
