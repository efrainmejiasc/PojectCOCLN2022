import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { calificacionResultado } from 'src/app/_model/capacidad/resultado/calificacionResultado.model';
import { resultado } from 'src/app/_model/capacidad/resultado/resultado.model';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-tabla-resultado',
  templateUrl: './tabla-resultado.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './tabla-resultado.component.scss']
})
export class TablaResultadoComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private autodiagnosticoService: AutodiagnosticoService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.initReport();
  }
  public onLoad: boolean = false;
  public listaResultado: resultado[] = [];
  public initReport() {
    this.autodiagnosticoService.getAutodiagnosisCompleted()
      .subscribe(data => {
        this.spinner.show();
        //var result: resultado;
        data.forEach(element => {
          element.capacidadesValor.forEach(capacidad => {
            if (this.listaResultado.filter(res => res.afirmacion == capacidad.nombre)[0]) {
              var calinResultado: calificacionResultado = new calificacionResultado();
              calinResultado.idAutodiagnostico = element.idAutodiagnostico;
              calinResultado.calificacion = capacidad.calificacion;
              calinResultado.fecha = element.FechaResultadoAutodiagnostico;
              this.listaResultado.filter(res => res.afirmacion == capacidad.nombre)[0].resultados.push(calinResultado);
            } else {
              var result: resultado = new resultado();
              result.abreviatura = capacidad.tipoCapacidad.split("")[0];
              result.afirmacion = capacidad.nombre;
              var calinResultado: calificacionResultado = new calificacionResultado();
              calinResultado.idAutodiagnostico = element.idAutodiagnostico;
              calinResultado.calificacion = capacidad.calificacion;
              calinResultado.fecha = element.FechaResultadoAutodiagnostico;
              result.resultados.push(calinResultado);
              this.listaResultado.push(result);
            }

          });
        });
        this.onLoad = true;
        this.spinner.hide();
      })
  }

  public downloadResult(result) {
    console.log(result)
    
    this.spinner.show();
    this.autodiagnosticoService.getResult(result.idAutodiagnostico)
      .subscribe(data => {
        if (data.type == "application/json") {          
        this.spinner.hide();
          const ref = this.modalService.open(AlertModalComponent, {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias</p>`;
        } else {
          this.spinner.hide();
          let name = `reporte_${result.idAutodiagnostico}_${result.fecha}.pdf`;
          const fileName = `reporte_de_autodiagnostico.pdf`;
          const objectUrl: string = URL.createObjectURL(data);
          const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
          a.href = objectUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(objectUrl);
        }
      }, error => {        
        this.spinner.hide();
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias</p>`;

      })
  }
}
