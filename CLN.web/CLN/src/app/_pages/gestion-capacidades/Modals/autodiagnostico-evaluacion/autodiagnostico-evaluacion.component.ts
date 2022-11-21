import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { autodiagnostico } from 'src/app/_model/capacidad/autodiagnostico.model';
import { calificationLimit } from 'src/app/_model/capacidad/calificationLimit.model';
import { configuracionAutodiagnostico } from 'src/app/_model/capacidad/configuracionAutodiagnostico.model';
import { rqObject } from 'src/app/_model/capacidad/rqObject.model';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { CorreoNotificacionComponent } from '../correo-notificacion/correo-notificacion.component';

@Component({
  selector: 'app-autodiagnostico-evaluacion',
  templateUrl: './autodiagnostico-evaluacion.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './autodiagnostico-evaluacion.component.scss']
})
export class AutodiagnosticoEvaluacionComponent implements OnInit, OnChanges {

  constructor(
    private autoService: AutodiagnosticoService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initAutodiagnosis();
  }

  @Input() closeActionByOutsideClickPattern: any;
  @Input() configuration: calificationLimit;
  public initInject: calificationLimit;
  ngOnChanges(changes: SimpleChanges) {
    const initValue = changes["configuration"];
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    if (initValue && initValue.currentValue != undefined) {
      this.initInject = initValue.currentValue;
    }
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
  }
  public diagnosticData: Array<Array<autodiagnostico>> = [[]];
  public numberPosition: number = 0;
  private dataFromBack: any;

  private initAutodiagnosis() {
    this.autoService.getAutodiagnosis()
      .subscribe(data => {
        if (data.length < 1) {
          this.errorManagement();
        } else {
          this.buildVisualization(data, null);
        }
      }, error => {
        this.errorManagement();
      })
  }
  public viewFinalEvaluation: boolean = false;
  public isFirstTime: boolean = true;
  public loadComplet: boolean = false;
  private buildVisualization(data, action) {
    this.diagnosticData = [[]];
    this.dataFromBack = data;
    //(data[0].estadoAutodiagnostico != "Terminado") ? (data[0].estadoAutodiagnostico == "") ? this.isFirstTime = true : (data[0].primeraVez == "Si") ? this.isFirstTime = true : this.viewFinalEvaluation = true : this.viewFinalEvaluation = false;
    //(this.dataFromBack[0].primeraVez == "Si") ? this.viewFinalEvaluation = false : (data[0].estadoAutodiagnostico == "") ? this.isFirstTime = true : (data[0].primeraVez == "Si") ? this.isFirstTime = true : ((this.dataFromBack[0].capacidadesValor.filter(data => data.calificacion == null).length == 0) && this.dataFromBack[0].estadoAutodiagnostico != "Terminado") ? this.viewFinalEvaluation = true : "";
    //(this.dataFromBack[0].primeraVez == "Si") ? 
    //((this.dataFromBack[0].capacidadesValor.filter(data => data.calificacion == null).length == 0)) ? this.viewFinalEvaluation = true : "";
    var cont = 0;
    var indexOf = 0;
    this.spinner.show();
    if (data[0].capacidadesValor != null) {
      data[0].capacidadesValor.forEach(capacidad => {
        this.diagnosticData[indexOf].push(capacidad);
        cont++;
        if (cont == 3) {
          indexOf++;
          if ((indexOf * 3) < data[0].capacidadesValor.length) {
            this.diagnosticData.push([]);
            cont = 0;
          }
        }
      });
      this.loadComplet = true;
      this.validfirsTime();
      if (action == 4) {
        this.finalCapacidad(data[0].capacidadesValor);
      }
      console.group("autodiagnostico")
      console.log(this.diagnosticData)
      console.groupEnd();
    } else {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>No hay capacidades activas que se puedan evaluar.</p>`;
      this.router.navigate(["/menudinamico"])
    }

    this.spinner.hide();
  }

  public splitData(data, position) {
    return data.split("")[position];
  }

  public actionNavigation(action, data: Array<autodiagnostico>) {
    if (action == 1 && data.filter(data => data.calificacion == null).length > 0) {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Para poder continuar por favor ingrese una valoración para todas las afirmaciones.</p>`;
    } else if (action == 0 && data.filter(data => data.calificacion == null).length < this.diagnosticData[this.numberPosition].length && data.filter(data => data.calificacion == null).length > 0) {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Para poder continuar por favor ingrese una valoración para todas las afirmaciones.</p>`;
    } else {
      if (action == 1 && this.numberPosition != (this.diagnosticData.length - 1) || action == 0) {
        this.saveInformation(data, action);
      }
    }
  }

  private saveInformation(dataCapacidad, action) {
    this.autoService.getAutodiagnosis()
      .subscribe(data => {
        if (data.length < 1) {
          this.spinner.hide();
          this.errorManagement();
        } else {
          var canUpdate = false;
          dataCapacidad.forEach(capacidad => {
            (data[0].capacidadesValor.filter(valor => valor.id == capacidad.id)[0].calificacion != capacidad.calificacion) ? canUpdate = true : "";
          });
          if (canUpdate) {
            this.spinner.show();
            var rqObjeto: rqObject = new rqObject();
            rqObjeto.capacidadesValor = dataCapacidad;
            switch (data[0].estadoAutodiagnostico) {
              case "Iniciado":
                rqObjeto.idAutodiagnostico = data[0].idAutodiagnostico;
                rqObjeto.idAutodiagnosticoOriginal = 0;
                break;
              case "Terminado":
                rqObjeto.idAutodiagnostico = 0;
                rqObjeto.idAutodiagnosticoOriginal = data[0].idAutodiagnostico;
                break;
              default:
                rqObjeto.idAutodiagnostico = 0;
                rqObjeto.idAutodiagnosticoOriginal = 0;
                break;
            }
            this.saveAction(rqObjeto, action);
          } else {
            this.moveView(action);
          }
        }
      }, error => {
        this.spinner.hide();
        this.errorManagement();
      })
  }
  public messageNotification: String = "Se han guardado correctamente todas las valoraciones y se ha enviado a su correo y/o a los correos ingresados, el resultado del autodiagnóstico.";
  public finalCapacidad(dataCapacidad) {
    if (this.dataFromBack[0].estadoAutodiagnostico != "Terminado") {
      var rqObjeto: rqObject = new rqObject();
      rqObjeto.capacidadesValor = dataCapacidad;
      rqObjeto.idAutodiagnosticoOriginal = 0;
      rqObjeto.finAutodiagnostico = 1;
      const ref = this.modalService.open(CorreoNotificacionComponent, {
        size: 'lg',
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'><b>Se enviará a su correo electrónico el resultado del autodiagnóstico.</b> Si desea que el resultado se envíe a otras personas, ingrese aquí los correos electrónicos. Si requiere que el resultado se envíe a más de un correo ingréselos separados por una coma (,).</p>`;
      ref.result.then((response) => {
        this.spinner.show();
        (response == "no") ? this.messageNotification = "Se han guardado correctamente todas las valoraciones." : this.messageNotification = "Se han guardado correctamente todas las valoraciones y se ha enviado a su correo y/o a los correos ingresados, el resultado del autodiagnóstico.";
        rqObjeto.correosNotificacion = response;
        rqObjeto.idAutodiagnostico = this.dataFromBack[0].idAutodiagnostico;
        this.autoService.saveAutodiagnosis(rqObjeto)
          .subscribe(data => {
            if (data.length < 1) {
              this.spinner.hide();
              this.errorManagement();
            } else {
              this.spinner.hide();
              if (data.length > 0) {
                const ref = this.modalService.open(AlertModalComponent, {
                  centered: true,
                  backdrop: 'static',
                  keyboard: false
                });
                ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${this.messageNotification}</p>`;

                localStorage.setItem("session", JSON.stringify(13))
                this.router.navigate(["/gestioncapacidades/autodiagnostico/resultado"])
              }
            }
          }, error => {
            this.spinner.hide();
            this.errorManagement();
          })
      })
    } else {
      this.saveInformation(dataCapacidad, 4)
    }
  }

  protected saveAction(rqObjeto, action) {
    this.autoService.registerAutodiagnosisValue(rqObjeto)
      .subscribe(data => {
        if (data.length < 1) {
          this.errorManagement();
        } else {
          this.buildVisualization(data, action);
          if (action != 4) {
            this.moveView(action);
          }
        }
      }, error => {
        this.errorManagement();
      })
  }

  private moveView(action) {
    switch (action) {
      case 0:
        (this.numberPosition > 0) ? this.numberPosition-- : "";
        this.validfirsTime()
        break;
      case 1:
        ((this.diagnosticData.length - 1) > this.numberPosition) ? this.numberPosition++ : "";
        this.validfirsTime()
        break;
    }
  }
  private validfirsTime() {
    //((this.diagnosticData.length - 1) == this.numberPosition) ? this.isFirstTime = false :  : this.isFirstTime = false;
    (this.dataFromBack[0].primeraVez == "Si" && ((this.diagnosticData.length - 1) == this.numberPosition)) ? this.isFirstTime = false : "";
    (this.dataFromBack[0].primeraVez == "Si" && !this.isFirstTime) ? this.viewFinalEvaluation = false : "";
    ((this.dataFromBack[0].capacidadesValor.filter(data => data.calificacion == null).length == 0) && this.dataFromBack[0].estadoAutodiagnostico != "Terminado") ? this.viewFinalEvaluation = true : "";
    (this.dataFromBack[0].primeraVez == "Si" && ((this.diagnosticData.length - 1) != this.numberPosition)) ? this.isFirstTime = true : "";
    console.log(this.isFirstTime);
    (this.dataFromBack[0].primeraVez == "No") ? this.isFirstTime = false : "";
    console.log(this.isFirstTime);
  }
  public indexData: number;
  public attachValue(event, afirmacion) {
    this.diagnosticData[this.numberPosition].filter(data => data.id == afirmacion.id)[0].calificacion = event;
    this.initValidateFinal();
  }
  private initValidateFinal() {
    var activeButton = true;
    this.diagnosticData.forEach(data => {
      data.forEach(contenidos => {
        (contenidos.calificacion == null) ? activeButton = false : "";
      })
    });
    (activeButton) ? this.isFirstTime = false : "";
    (activeButton) ? this.viewFinalEvaluation = true : this.viewFinalEvaluation = false;
  }

  private errorManagement() {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;

  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}
