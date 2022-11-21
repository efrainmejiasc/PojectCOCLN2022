import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntasServiceService } from 'src/app/_services/preguntas-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements OnInit {
  preguntas: any[] = [];
  utilidades: any[] = [];
  idpreguntaseleccionada: any;

  @ViewChild('modalaccion', { static: false }) modalaccion;
  @ViewChild('modalok', { static: false }) modalok;
  @ViewChild('noexiste', { static: false }) noexiste;

  utilidad: any;
  preguntasfav: any[] = [];
  mensaje: string = '';

  constructor(
    private preguntasService: PreguntasServiceService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private gestorRolesService: GestorRolesService,
    private router: Router,
    private permitService: PermitServiceService,
    private auth: AuthenticationService
  ) { }

  temas: string[] = [];
  acordeon: any[] = [];
  buscar: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param.idMicrositio) {
        this.getFrequentQuestions(param.idMicrositio);
        this.getFrequentQuestionsfav(param.idMicrositio);
      } else {
        this.getFrequentQuestions(environment.tempEscuela);
        this.getFrequentQuestionsfav(environment.tempEscuela);
      }
    });
    this.fetchUtilidades();
    //this.validSession();
  }

  /*userlogged: any;
  protected validSession() {
    if (localStorage.getItem("session") != undefined) {
      var menuItem = localStorage.getItem("session");
      this.permitsAnalitics(menuItem);
    } else {
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
      });
    }
  }

  private messageAlertError: String = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  protected permitsAnalitics(item) {
    this.gestorRolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.activatedRoute.params.subscribe(param => {
            if (param.idMicrositio) {
              this.getFrequentQuestions(param.idMicrositio);
              this.getFrequentQuestionsfav(param.idMicrositio);
            } else {
              this.getFrequentQuestions(environment.tempEscuela);
              this.getFrequentQuestionsfav(environment.tempEscuela);
            }
          });
          this.fetchUtilidades();
        } else {
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
          });
        }
      }, error => {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${this.messageAlertError}</p>`;
        this.auth.actualUser$.subscribe((data) => {
          this.userlogged = data;
          (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
        });
      })
  }*/

  fetchUtilidades() {
    this.preguntasService.getActiveUtils()
      .subscribe(utilidades => {
        this.utilidades = utilidades;
      });
  }

  buscarpor() {
    console.log(this.buscar.toLowerCase());
    console.log(this.acordeon);
    this.acordeon = [];
    this.temas = [];
    const preguntafiltrada = this.preguntas.filter(c => (
      c.pregunta.toLowerCase().includes(this.buscar.toLowerCase()) ||
      c.respuesta.toLowerCase().includes(this.buscar.toLowerCase())));
    if (preguntafiltrada.length === 0) {
      this.mensaje = "No se encontró información asociada a: " + this.buscar;
      this.modalService.open(this.modalok, { size: 'lg', centered: true });
    } else {
      preguntafiltrada.forEach(element => {
        if (this.temas.indexOf(element.tema) < 0) {
          this.temas.push(element.tema);
        }
      });
      this.temas.forEach(element => {
        this.acordeon.push({ tema: element, preguntas: preguntafiltrada.filter(c => c.tema === element) });
      });
    }
  }

  megusta(tipo, idpregunta) {
    if (tipo === 1) {
      // guarda el me gusta
      const likes = { idPregunta: idpregunta, likes: 1 };
      this.preguntasService.createLikesQuestion(likes).
        subscribe(preguntas => {
          this.activatedRoute.params.subscribe(param => {
            if (param.idMicrositio) {
              this.getFrequentQuestions(param.idMicrositio);
              this.getFrequentQuestionsfav(param.idMicrositio);
            } else {
              this.getFrequentQuestions(environment.tempEscuela);
              this.getFrequentQuestionsfav(environment.tempEscuela);
            }
          });
        });
    } else {
      this.idpreguntaseleccionada = idpregunta;
      const likes = { idPregunta: idpregunta, likes: '1' };
      this.preguntasService.createLikesQuestion(likes).
        subscribe(preguntas => {
          this.modalService.open(this.modalaccion, { size: 'lg', centered: true });
        });
    }
  }

  getFrequentQuestions(id) {
    console.log("voy a consumir servicio");
    this.acordeon = [];
    this.preguntasService.getFAQByMicrosite(id).
      subscribe(preguntas => {
        console.log("voy a consumir servicio2");
        this.preguntas = preguntas;
        if (this.preguntas.length === 0) {
          this.mensaje = "No existen preguntas frecuentes para este sitio";
          this.modalService.open(this.noexiste, { size: 'lg', centered: true });
        }
        this.preguntas.forEach(element => {
          if (this.temas.indexOf(element.tema) < 0) {
            this.temas.push(element.tema);
          }
        });
        this.temas.forEach(element => {
          this.acordeon.push({ tema: element, preguntas: this.preguntas.filter(c => c.tema === element) });
        });
        console.log(this.acordeon);
      });
  }

  getFrequentQuestionsfav(id) {
    this.acordeon = [];
    this.preguntasService.getFAQByMicrositeFav(id).
      subscribe(preguntas => {
        this.preguntasfav = preguntas;
      });
  }

  votaUtilidad(idutilidad, idpregunta) {
    const ut = {
      idPregunta: idpregunta,
      idUtilidad: idutilidad,
      esBorrado: '0'
    };
    this.preguntasService.createUtilQuestion(ut).
      subscribe(preguntas => { });
  }

  votaUtilidad2() {
    const ut = {
      idPregunta: this.idpreguntaseleccionada,
      idUtilidad: this.utilidad,
      esBorrado: '0'
    };
    this.preguntasService.createUtilQuestion(ut).
      subscribe(preguntas => {
        this.modalService.dismissAll();
        this.activatedRoute.params.subscribe(param => {
          if (param.idMicrositio) {
            this.getFrequentQuestions(param.idMicrositio);
            this.getFrequentQuestionsfav(param.idMicrositio);
          } else {
            this.getFrequentQuestions(environment.tempEscuela);
            this.getFrequentQuestionsfav(environment.tempEscuela);
          }
          this.mensaje = "Se ha registrado su calificación. Muchas gracias";
          this.modalService.open(this.modalok, { size: 'lg', centered: true });
        });
      });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
