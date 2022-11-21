import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnChanges,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbTabsetConfig } from "@ng-bootstrap/ng-bootstrap";
import { AutodiagnosticoService } from "../../../_services/autodiagnostico.service";
import { flatten } from "@angular/compiler";
import { Item } from "src/app/_model/structures";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationService } from "src/app/_services/_compras-publicas/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";
import { ValidatorService } from "src/app/_services/validator.service";
import * as FileSaver from "file-saver";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';

@Component({
  selector: "app-autodiagnostico",
  templateUrl: "./autodiagnostico.component.html",
  styleUrls: ["./autodiagnostico.component.scss"],
  providers: [NgbTabsetConfig],
})
export class AutodiagnosticoComponent implements OnInit, OnChanges {
  @ViewChild("content", { static: false }) modal;
  @ViewChild("modalDos", { static: false }) modalDos;
  @ViewChild("modalTres", { static: false }) modalTres;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  userlogged: any;
  menu: any;
  contenido_induccion: any;
  gestionar_contenido: any;
  contenido_capacidades: any;

  onclick_capTec: boolean = false;
  onclick_capDe: boolean = false;
  onclick_capEst: boolean = false;
  submenu_admin_2_contCapacidades: boolean = false;

  next_question: boolean = false;
  questions: any[] = [];
  diagnostico: boolean = false;
  asistencia: boolean = false;
  gestion: boolean = false;
  calificacion: any[] = [];

  result_q: any[] = [];
  index_q: number;
  index_b: number;
  emails: any;
  email_sended: boolean = false;
  email_success: boolean = false;
  email_valid: boolean = true;
  email_ok: boolean = true;
  many_emails: boolean = false;
  items: any;

  update_diagnostico: boolean = false;
  help_autodiagnostico: boolean;
  show_result: boolean;
  msg: any;
  alert: boolean = false;
  endprocess: boolean = false;

  terminado: any;
  saveUpdate: boolean = false;
  version: any;
  verResultado: boolean = false;

  //GESTION CONTENIDO
  cont_induccion: boolean = false;
  cont_capacidades: boolean = false;
  //-----INDUCCION
  filesToUpload: File[];
  nombreDoc: any;
  descripcionDoc: any;
  idTematica: any;
  fileUpload: any;
  is_updateContenidoIn: boolean = false;
  is_saveContenido: boolean;
  idContenido: any;
  contenidos_induccion: any[];
  is_deletedContenidoIn: boolean;

  //---FORTALECER CAPACIDADES
  newlistCapacidades: any[] = [];
  listCapacidades: any = [];
  newlist: any[];
  categoriaCap: any;
  listCapacidadesFort: any[];
  idAfirmacionConFort: any;
  nombredocConFort: any;
  descripcionConFort: any;
  is_updateConFort: boolean = false;
  is_saveContenidoConFort: boolean;
  idContenidoConFort: any;
  is_deletedContFort: boolean;
  tematicas: any[];
  is_empty: boolean;
  listCapacidadesbyCat: any[] = [];
  characters: any;

  autodiagnostico: any;
  is_loading: boolean;
  is_login: string;
  primera_vez: boolean;
  send_email: boolean;
  error: boolean;
  email_own: boolean;

  constructor(
    public validator: ValidatorService,
    public element: ElementRef,
    configModal: NgbModalConfig,
    private modalService: NgbModal,
    config: NgbTabsetConfig,
    private service_Auto: AutodiagnosticoService,
    private spinner: NgxSpinnerService,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private admin: AdminService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
  ) {
    configModal.backdrop = "static";
    configModal.keyboard = false;
    config.justify = "center";
    config.type = "pills";
    this.index_q = 0;
    this.menu = true;
    this.autodiagnostico = 1;
    this.is_login = localStorage.getItem("loginUser");
  }
  ngOnChanges() {
    this.route.queryParams.subscribe((redirect: any) => {
      console.log(redirect);
    });
  }
  do_getVersion() {
    this.service_Auto.getVersion(this.userlogged.idUsuario).subscribe(
      (result) => {
        this.version = result["numeroAutoDiagnostico"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  open(content, param, btn) {
    if (param === "send_email" && btn === "continuar") {
      this.send_email = true;
      console.log("finalizando..");
    } else if (param === "alert" && btn === "alert") {
      this.alert = true;
      this.email_sended = false;
      this.email_success = false;
    } else if (param === "email_success" && btn === "alert") {
      this.email_success = true;
      this.send_email = false;
      console.log(this.emails);
      console.log("correo enviado");
    } else if (param === "next_question") {
      this.email_sended = false;
      this.email_success = false;
      this.email_success = false;
      this.alert = false;
    }
    this.modalService.open(this.modal, { size: "lg", centered: true });
    this.emails = undefined;
  }

  close(param, action) {
    this.email_sended = false;
    this.email_success = false;
    this.alert = false;
    this.error = false;
    this.email_own = false;
    if (param === "open_again" && action === "send") {
      if (this.emails !== "" || this.emails !== undefined) {
        this.many_emails = true;
      } else {
        this.many_emails = false;
      }
      // aqui guarda la finalizacion del autodiagnostico
      if (this.email_valid) {
        console.log("correo ok");
        console.log(this.saveUpdate);

        if (this.saveUpdate) {
          // guarda una nueva version
          this.service_Auto
            .finishedNewVersion(this.userlogged.idUsuario)
            .subscribe(
              (result) => {
                console.log(result, "save new version");
                this.do_sendEmails();
                this.emails = "";
                this.update_diagnostico = true;
                this.modalService.open(this.modal, {
                  size: "lg",
                  centered: true,
                });
                //   window.location.reload();
              },
              (error) => {
                console.log(error);
              }
            );
        } else {
          //guarda por primera vez
          this.service_Auto.finished(this.userlogged.idUsuario).subscribe(
            (result) => {
              console.log(result, "save by firts time");
              this.do_sendEmails();
              this.primera_vez = true;
              this.update_diagnostico = false;
              //   window.location.reload();
              this.open(this.modal, "email_success", "alert");
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        this.email_ok = false;
        console.log(this.email_valid);
        return false;
        // this.open(this.modal, 'email_ok', 'alert');
      }
    } else if (param === "close" && action === "email_ok") {
      console.log("to resultados");

      this.router.navigate(["/resultados"], {});
    } else if (param === "close") {
      this.modalService.dismissAll();
    } else if (action === "") {
      this.modalService.dismissAll();
    }
    this.email_valid = true;
    this.email_ok = true;
    this.nombreDoc = "";
    this.idTematica = "";
    this.descripcionDoc = "";
    this.fileUpload = "";
    this.is_saveContenido = false;
    this.is_deletedContenidoIn = false;
    this.is_empty = false;
    this.is_updateConFort = false;
    this.idAfirmacionConFort = "";
    this.idContenidoConFort = "";
    this.nombredocConFort = "";
    this.descripcionConFort = "";
    this.is_saveContenidoConFort = false;
    this.is_deletedContFort = false;
    this.update_diagnostico = false;
    this.primera_vez = false;
    this.modalService.dismissAll();
    this.many_emails = false;
  }

  dtTrigger = new Subject();

  ngOnInit() {
    //this.initType();
    this.validSession();
  }

  protected validSession() {
    if (localStorage.getItem("session") != undefined) {
      var menuItem = localStorage.getItem("session");
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        this.permitsAnalitics(menuItem);
      });
    } else {
      //this.permitsAnalitics(1);
      this.auth.actualUser$.subscribe((data) => {
        this.userlogged = data;
        (this.userlogged === null) ? this.router.navigate(["/login"]) : this.router.navigate(["/menudinamico"]);
      });
    }
  }

  private messageAlertError: String = "No hemos podido resolver tu solicitud, por favor vuelve a intentarlo"
  public permitsUser: permitsUserFetch = new permitsUserFetch();
  public arrPermits: Array<String> = ["crear", "editar", "eliminar", "habilitar"];
  protected permitsAnalitics(item) {
    console.log("aca llego!!")
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
            this.initType();
          });
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
  }
  public initType() {
    this.dtOptions = {
      pagingType: "simple_numbers",
      pageLength: 10,
      processing: true,
      language: {
        emptyTable: "Sin datos",
        info: "Mostrando _START_ a _END_ de _TOTAL_",
        infoEmpty: "",
        infoFiltered: "(filtrado de _MAX_ totales)",
        infoPostFix: "",
        decimal: ",",
        thousands: ".",
        lengthMenu: "",
        loadingRecords: "Cargando",
        processing: "Cargando",
        search: "Buscar Por:",
        searchPlaceholder: "",
        zeroRecords: "Sin registros",
        paginate: {
          first: "Primera",
          last: "Ultima",
          next: "Siguiente",
          previous: "Anterior",
        },
        aria: {
          sortAscending: "Ascendente",
          sortDescending: "descendiente",
        },
        url: "",
      },
    };

    this.dtTrigger.next();
    if (this.is_login === "1") {
      localStorage.removeItem("loginUser");
    } else {
      this.diagnostico = true;
    }
    //  this.spinner.show();

    console.log("estoy acaaa")
    this.service_Auto.loadQuestions(this.userlogged.idUsuario).subscribe(
      (result) => {
        this.result_q = result;
        for (let i = this.index_q; i < this.result_q.length; i++) {
          if (this.questions.length < 3) {
            //categoria = this.result_q[i].categoria;
            this.questions.push(this.result_q[i]);
            // if (this.questions[i].categoria === 'SECCION_#1_DIAGNOSTICO_CAPACIDADES_ESTRATEGICAS') {
            //   this.questions[i].categoria = 'E';
            // } else if (this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS1' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS2' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS3' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS4') {
            //   this.questions[i].categoria = 'T';
            // } else if (this.questions[i].categoria === 'SECCION_#3_DIAGNOSTICO_CAPACIDADES_PERSONALES') {
            //   this.questions[i].categoria = 'P';
            // }
            this.calificacion.push(
              this.result_q[i].calificacion !== undefined
                ? this.result_q[i].calificacion
                : 0
            );
            this.index_q += 1;
            console.log(this.questions);
          }
        }
        console.log("result_q");
        console.log(this.result_q);
        //console.log(this.questions[38].calificacion+' --- ' +this.version)
        // if(this.result_q[38].calificacion>0 && this.version==0)
        // {
        //   this.version=1;
        // }

        if (this.isTerminado(this.result_q)) {
          this.verResultado = true;
        }

        /*       result.forEach((item, i) => {
              if (i < 3) {
                this.index_q = i;
                this.questions.push(result[i]);
                console.log(this.questions);
                console.log(this.index_q);
                this.calificacion.push((this.questions[i].calificacion !== undefined) ? this.questions[i].calificacion : 0);
              }
            }); */
        //  this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
    this.route.queryParams
      .subscribe((params: any) => {
        if (params.redirect == 'yes') {
          this.do_diagnostico()
        }
      });
  }

  do_help() {
    console.log(this.help_autodiagnostico);
    this.help_autodiagnostico === true
      ? (this.help_autodiagnostico = false)
      : (this.help_autodiagnostico = true);
  }

  do_Calificate(id, calificacion) {
    console.log(id, calificacion);
    // return false;
    this.service_Auto.saveAfirmation(id, calificacion).subscribe(
      (result) => {
        console.log(result);
        if (result["message"] === "Calificación exitosa") {
          if (this.isTerminado(this.result_q)) {
            this.saveUpdate = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  do_next() {
    let flag = true;
    //this.spinner.show();
    this.service_Auto.loadQuestions(this.userlogged.idUsuario).subscribe(
      (result) => {
        this.result_q = result;
        //this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );

    console.log("next");
    console.log(this.questions);
    console.log(this.index_q, this.result_q.length);

    for (let i = 0; i < this.questions.length; i++) {
      if (this.calificacion[i] !== 0 || this.calificacion[i] !== []) {
        console.log("puede pasar a la sig");
        // this.open(this.modal, 'next_question', '');

        //this.next_question = true;
        this.alert = false;
      } else {
        flag = false;
        console.log(this.calificacion[i]);
      }
    }
    if (!flag) {
      console.log("FALTA CALIFICAR");
      this.next_question = false;

      this.open(this.modal, "alert", "alert");
    } else {
      this.questions = [];
      this.calificacion = [];
      let j = 0;
      for (let i = this.index_q; i < this.result_q.length; i++) {
        if (this.questions.length < 3) {
          this.questions.push(this.result_q[i]);

          //
          // if (this.questions[j].categoria === 'SECCION_#1_DIAGNOSTICO_CAPACIDADES_ESTRATÉGICAS') {
          //   this.questions[j].categoria = 'E';
          // } else if (this.questions[j].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS1' || this.questions[j].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS2' || this.questions[j].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS3' || this.questions[j].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS4') {
          //   this.questions[j].categoria = 'T';
          // } else if (this.questions[j].categoria === 'SECCION_#3_DIAGNOSTICO_CAPACIDADES_PERSONALES') {
          //   this.questions[j].categoria = 'P';
          // }

          this.calificacion.push(
            this.result_q[i].calificacion !== undefined
              ? this.result_q[i].calificacion
              : 0
          );
          this.index_q += 1;
          console.log(this.index_q);
          ++j;
        }
        if (this.index_q === this.result_q.length) {
          console.log(this.index_q);
          console.log("ya no hay mas");
          this.endprocess = true;
          if (!flag) {
            this.open(this.modal, "alert", "alert");
          }
          /*           this.calificacion.push((this.result_q[i].calificacion !== undefined) ? this.result_q[i].calificacion : 0);
                    this.questions.push(this.result_q[i]); */
          //this.questions =  this.questions.pop();
          //this.questions.push(this.result_q[this.result_q.length - 1]);
        }
      }
      console.log(this.questions);
    }
  }

  do_back() {
    this.endprocess = false;
    this.service_Auto.loadQuestions(this.userlogged.idUsuario).subscribe(
      (result) => {
        this.result_q = result;
        //this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );

    //this.calificacion = [];
    this.index_q -= 3;
    console.log(this.index_q);

    if (this.index_q <= 3) {
      this.questions = [];
      this.calificacion = [];
      this.questions.push(this.result_q.slice(0, 3));
      this.questions = this.questions[0];

      this.questions.forEach((elem, i) => {
        this.calificacion.push(elem.calificacion);
        //   if (this.questions[i].categoria === 'SECCION_#1_DIAGNOSTICO_CAPACIDADES_ESTRATÉGICAS') {
        //     this.questions[i].categoria = 'E';
        //   } else if (this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS1' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS2' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS3' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS4') {
        //     this.questions[i].categoria = 'T';
        //   } else if (this.questions[i].categoria === 'SECCION_#3_DIAGNOSTICO_CAPACIDADES_PERSONALES') {
        //     this.questions[i].categoria = 'P';
        //   }
      });

      console.log(this.calificacion);
      console.log("primeros reg");
      this.index_q = 3;
    } else {
      this.questions = [];
      this.calificacion = [];

      this.questions.push(this.result_q.slice(this.index_q - 3, this.index_q));
      this.questions = this.questions[0];

      this.questions.forEach((elem, i) => {
        this.calificacion.push(elem.calificacion);
        //
        // if (this.questions[i].categoria === 'SECCION_#1_DIAGNOSTICO_CAPACIDADES_ESTRATÉGICAS') {
        //   this.questions[i].categoria = 'E';
        // } else if (this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS1' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS2' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS3' || this.questions[i].categoria === 'SECCION_#2_DIAGNOSTICO_CAPACIDADES_TECNICAS4') {
        //   this.questions[i].categoria = 'T';
        // } else if (this.questions[i].categoria === 'SECCION_#3_DIAGNOSTICO_CAPACIDADES_PERSONALES') {
        //   this.questions[i].categoria = 'P';
        // }
      });

      console.log(this.questions);
    }
  }

  do_diagnostico() {
    this.diagnostico = true;
    this.asistencia = false;
    this.gestion = false;
  }

  do_Asistencia() {
    this.router.navigate(["/asistencia"]);
  }

  do_gestion() {
    this.gestion = true;
    this.asistencia = false;
    this.diagnostico = false;
  }

  do_checkMail() {
    if (this.emails !== "" || this.emails !== undefined) {
      var reg = /^[-\w+.%]+@[\w-.]+\.[A-Za-z]{2,3}$/;
      this.items = this.emails.split(";");
      if (
        this.items.length <= 5 &&
        this.items.filter(function (x) {
          return reg.test(x);
        }).length === this.items.length
      ) {
        console.log("VALID => ", this.items);
        this.email_valid = true;
        this.many_emails = true;
      } else {
        console.log("INVALID!");
        this.email_valid = false;
        this.many_emails = false;
        if (this.emails.length <= 0) {
          this.email_valid = true;
        }
      }
    } else {
      this.email_valid = true;
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  isTerminado(afirmaciones) {
    return afirmaciones[38].idEstado === 39;
  }

  do_Finish(param) {
    if (!this.terminado && this.saveUpdate && param === "save_1st") {
      console.log("return false, from save_1st");
      return false;
    }
    let flag = true;
    console.log("finish");
    /*     console.log(this.questions);
        console.log(this.index_q, this.result_q.length); */

    for (let i = 0; i < this.questions.length; i++) {
      if (this.calificacion[i] === 0 || this.calificacion[i] === []) {
        flag = false;
      }
    }
    if (!flag) {
      console.log("FALTA CALIFICAR");
      this.open(this.modal, "alert", "alert");
    } else {
      console.log("puede finalizar");
      //guarda al cerrar el modal
      this.open(this.modal, "send_email", "continuar");
      this.alert = false;
      this.next_question = false;
      /*
              this.service_Auto.finished(this.userlogged.idUsuario).subscribe(result => {
                console.log(result);
              }, error => {
                console.log(error);
              }) */
    }

    /*
        this.service_Auto.finished().subscribe(result => {
          console.log(result);
          window.location.reload();
        }, error => {
          console.log(error);
        }); */
  }

  do_CheckDiagnostico() {
    if (this.userlogged !== null) {
      this.service_Auto.checkDiagnostico(this.userlogged.idUsuario).subscribe(
        (result) => {
          this.terminado = result["terminado"];
          console.log("checkDiagnostico");
          console.log(this.terminado);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  do_sendEmails() {
    this.is_loading = true;
    this.msg = "";
    console.log(
      "this.email_sended, this.emails, this.email_success, this.many_emails, this.primera_vez"
    );
    console.log(
      this.email_sended,
      this.emails,
      this.email_success,
      this.many_emails,
      this.primera_vez
    );

    this.service_Auto
      .sendEmail(this.userlogged.idUsuario, this.items)
      .subscribe(
        (result) => {
          console.log(result);
          if (result["message"] === "Reporte enviado exitosamente") {
            this.email_sended = true;
            this.is_loading = false;
            if (this.many_emails === false) {
              this.email_own = true;
              console.log("solo a mi correo");
            }
            if (this.emails !== []) {
              console.log("a varios correos");
              this.many_emails = true;
            }

            //window.location.reload();
          }
        },
        (error) => {
          console.log(error);
          this.error = true;
          this.msg = error["statusText"];
          this.is_loading = false;
          //return error['message'];
        }
      );
  }

  do_Main() {
    this.menu = true;
    this.diagnostico = false;
    this.gestionar_contenido = false;
    this.contenido_induccion = false;
    this.contenido_capacidades = false;
  }

  do_GestionarContenidos() {
    this.diagnostico = false;
    this.menu = false;
    this.gestionar_contenido = true;
  }
  do_ContenidoInduccion() {
    this.contenido_induccion
      ? (this.contenido_induccion = false)
      : (this.contenido_induccion = true);
    this.contenido_capacidades = false;
    this.do_getTematicas();
    this.getListContenidoInduccion();
  }
  do_CapacidadesCapacidades() {
    this.contenido_capacidades
      ? (this.contenido_capacidades = false)
      : (this.contenido_capacidades = true);
    this.contenido_induccion = false;
    this.get_CapacidadesbyCat();
    this.getListContenidoFort();
  }

  do_AdminContCapacidades_Form(capacidad: string) {
    this.submenu_admin_2_contCapacidades = false;
    this.categoriaCap = capacidad;
    this.getListContenidoFort2();
    setTimeout(() => {
      this.submenu_admin_2_contCapacidades
        ? (this.submenu_admin_2_contCapacidades = false)
        : (this.submenu_admin_2_contCapacidades = true);
      console.log(this.submenu_admin_2_contCapacidades);
    }, 300);
    console.log("listadocapacidades");
    console.log(this.newlistCapacidades);
    if (capacidad === "tecnica") {
      this.onclick_capTec
        ? (this.onclick_capTec = false)
        : (this.onclick_capTec = true);
      this.onclick_capDe = false;
      this.onclick_capEst = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[2];
    } else if (capacidad === "personal") {
      this.onclick_capDe
        ? (this.onclick_capDe = false)
        : (this.onclick_capDe = true);
      this.onclick_capTec = false;
      this.onclick_capEst = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[1];
    } else if (capacidad === "estratégica") {
      this.onclick_capEst
        ? (this.onclick_capEst = false)
        : (this.onclick_capEst = true);
      this.onclick_capTec = false;
      this.onclick_capDe = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[0];
    }
  }

  clear(string) {
    return string.replace("<br></br>", "");
  }
  //GESTIONAR CONTENIDO

  do_getTematicas() {
    this.admin.getTematicas().subscribe(
      (result) => {
        console.log(result);
        this.tematicas = result;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  do_SaveContenidoInduccion() {
    console.log("save ?");
    let formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    if (files !== undefined) {
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i]["name"]);
      }
    }

    //  console.log('form data variable :   ' + formData.toString());
    console.log(
      this.nombreDoc,
      this.descripcionDoc,
      this.idTematica,
      this.fileUpload,
      this.is_updateContenidoIn,
      formData
    );

    if (
      (this.nombreDoc !== null ||
        this.descripcionDoc !== null ||
        this.idTematica !== null ||
        this.fileUpload !== null) &&
      this.is_updateContenidoIn === false
    ) {
      this.admin
        .SaveContenidoInduccion(
          this.userlogged.idUsuario,
          this.nombreDoc,
          this.idTematica,
          this.descripcionDoc,
          formData
        )
        .subscribe(
          (result) => {
            console.log(result);
            if (result["message"] === "contenido subido exitosamente") {
              this.is_saveContenido = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.getListContenidoInduccion();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (
      (this.nombreDoc !== null ||
        this.descripcionDoc !== null ||
        this.idTematica !== null) &&
      this.is_updateContenidoIn === true
    ) {
      if (files === undefined) {
        this.admin
          .updateContenidoInduccion(
            this.idContenido,
            this.userlogged.idUsuario,
            this.idTematica,
            this.nombreDoc,
            this.descripcionDoc,
            formData
          )
          .subscribe((res) => {
            console.log(res);
            if (res["message"] === "contenido actualizado exitosamente") {
              this.is_updateContenidoIn = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.getListContenidoInduccion();
            }
          }),
          (error) => {
            console.log(error);
          };
      } else {
        this.admin
          .updateContenidoInduccion(
            this.idContenido,
            this.userlogged.idUsuario,
            this.idTematica,
            this.nombreDoc,
            this.descripcionDoc,
            ""
          )
          .subscribe((res) => {
            console.log(res);
            if (res["message"] === "contenido actualizado exitosamente") {
              this.is_updateContenidoIn = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.getListContenidoInduccion();
            }
          }),
          (error) => {
            console.log(error);
          };
      }
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  getListContenidoInduccion() {
    this.admin
      .getListContenidoInduccion(this.userlogged.idSecretaria)
      .subscribe((res) => {
        console.log(res);
        this.contenidos_induccion = res;
        this.rerender();
      }),
      (error) => {
        console.log(error);
      };
  }
  rerender(): void {
    console.log("render");
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    } else {
      this.dtTrigger.next();
    }
  }

  do_deleteContendoIn(idContenido, idTematica) {
    this.admin
      .deleteContenido(idContenido, this.userlogged.idUsuario, idTematica)
      .subscribe((res) => {
        console.log(res);

        if ((res["message"] = "Contenido eliminado exitosamente")) {
          this.getListContenidoInduccion();
          this.modalService.open(this.modalDos, { size: "lg", centered: true });
          this.is_deletedContenidoIn = true;
        }
      }),
      (error) => {
        console.log(error);
      };
  }

  //----------------CONTENIDO CAPACIDADES  ----------------------//
  get_CapacidadesbyCat() {
    this.admin.getListCapacidades().subscribe((result) => {
      console.log(result);
      this.newlistCapacidades = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i].nombre.includes("ESTRATEGICAS")) {
          result[i].nombre = "CAPACIDADES ESTRATÉGICAS";
          this.newlistCapacidades.push(result[i]);
        }
        if (result[i].nombre.includes("TECNICAS")) {
          result[i].nombre = "CAPACIDADES TÉCNICAS";
        }
        if (result[i].nombre.includes("PERSONALES")) {
          result[i].nombre = "CAPACIDADES PERSONALES";
          this.newlistCapacidades.push(result[i]);
        }
        this.listCapacidades.push(result[i]);
      }
      this.newlist = [];
      for (let j = 0; j < this.listCapacidades.length; j++) {
        if (this.listCapacidades[j].categoria === "CAPACIDADES TÉCNICAS") {
          for (
            let a = 0;
            a < this.listCapacidades[j].afirmaciones.length;
            a++
          ) {
            this.newlist.push(this.listCapacidades[j].afirmaciones[a]);
          }
        }
      }
      this.newlistCapacidades.push({
        categoria: "CAPACIDADES TÉCNICAS",
        afirmaciones: this.newlist,
      });
      //console.log(this.newlistCapacidades);
    });
  }

  getListContenidoFort() {
    let cat =
      this.categoriaCap == "estratégica" ? "estrategica" : this.categoriaCap;
    this.admin.getListContenidoFort(cat).subscribe((res) => {
      console.log(res);
      this.listCapacidadesFort = res;
      //this.dtTrigger.next();
    }),
      (error) => {
        console.log(error);
      };
  }
  getListContenidoFort2() {
    let cat =
      this.categoriaCap == "estratégica" ? "estrategica" : this.categoriaCap;
    this.admin.getListContenidoFort(cat).subscribe((res) => {
      console.log(res);
      this.listCapacidadesFort = res;
      this.dtTrigger.next();
    }),
      (error) => {
        console.log(error);
      };
  }

  do_SaveContenidoFort() {
    let formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    //    console.log(files);
    if (files !== undefined) {
      if (files[0] !== undefined) {
        for (let i = 0; i < files.length; i++) {
          formData.append("uploads[]", files[i], files[i]["name"]);
        }
      }
    }
    //  console.log('form data variable :   ' + formData.toString());
    // console.log(this.userlogged.idUsuario, this.nombreDoc, this.descripcionDoc, this.idTematica, formData);
    console.log(
      this.userlogged.idUsuario,
      this.idAfirmacionConFort,
      this.nombredocConFort,
      this.descripcionConFort,
      this.fileUpload,
      this.is_updateConFort
    );

    if (
      ((this.idAfirmacionConFort !== this.nombredocConFort) !== null ||
        this.descripcionConFort !== null ||
        this.fileUpload !== null) &&
      this.is_updateConFort === false
    ) {
      console.log("is save ?");

      this.admin
        .SaveContenidoFort(
          this.userlogged.idUsuario,
          this.idAfirmacionConFort,
          this.nombredocConFort,
          this.descripcionConFort,
          formData
        )
        .subscribe(
          (result) => {
            console.log(result);
            if (result["message"] === "contenido subido exitosamente") {
              this.is_saveContenidoConFort = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.get_CapacidadesbyCat();
              this.getListContenidoFort();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (
      ((this.idAfirmacionConFort !== this.nombredocConFort) !== null ||
        this.descripcionConFort !== null) &&
      this.is_updateConFort === true
    ) {
      console.log("is update ?");
      if (files[0] !== undefined) {
        console.log("update with formdata");
        this.admin
          .updateContenidoFort(
            this.userlogged.idUsuario,
            this.idContenidoConFort,
            this.idAfirmacionConFort,
            this.nombredocConFort,
            this.descripcionConFort,
            formData
          )
          .subscribe((res) => {
            console.log(res);
            if (res["message"]) {
              this.is_updateConFort = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.get_CapacidadesbyCat();
              this.getListContenidoFort();
            }
          }),
          (error) => {
            console.log(error);
          };
      } else {
        console.log("update without formdata");

        this.admin
          .updateContenidoFort(
            this.userlogged.idUsuario,
            this.idContenidoConFort,
            this.idAfirmacionConFort,
            this.nombredocConFort,
            this.descripcionConFort,
            ""
          )
          .subscribe((res) => {
            console.log(res);
            if (res["message"]) {
              this.is_updateConFort = true;
              this.modalService.open(this.modalDos, {
                size: "lg",
                centered: true,
              });
              this.get_CapacidadesbyCat();
              this.getListContenidoFort();
            }
          }),
          (error) => {
            console.log(error);
          };
      }
    }
  }

  do_deleteConFort(idContenido, idAfirmacion) {
    this.admin
      .deleteContenidoFort(idContenido, idAfirmacion, this.userlogged.idUsuario)
      .subscribe((res) => {
        console.log(res);

        if (res["message"]) {
          this.get_CapacidadesbyCat();
          this.getListContenidoFort();
          this.modalService.open(this.modalDos, { size: "lg", centered: true });
          this.is_deletedContFort = true;
        }
      }),
      (error) => {
        console.log(error);
      };
  }

  To_updateContenidoIn(
    idContenido,
    tituloContenido,
    contenidoDescricion,
    idTematica
  ) {
    this.idContenido = idContenido;
    this.nombreDoc = tituloContenido;
    this.descripcionDoc = contenidoDescricion;
    this.idTematica = idTematica;
    //this.fileUpload =  tituloContenido;
    this.is_updateContenidoIn = true;
  }
  To_updateConFort(idAfirmacion, idContenido, titulo, descripcion) {
    this.idAfirmacionConFort = idAfirmacion;
    this.idContenidoConFort = idContenido;
    this.nombredocConFort = titulo;
    this.descripcionConFort = descripcion;
    this.is_updateConFort = true;
    //  console.log(idAfirmacion, idContenido, titulo, descripcion);
    console.log(this.is_updateConFort);
  }

  do_Valid(param, type, max, event) {
    this.characters = this.validator.Validate(param, type, max, event);
    //console.log(this.characters);
  }

  descargarGuia(formato) {
    this.is_loading = true;
    let mediaType: string;
    if (formato === ".zip") {
      mediaType = "application/zip";
    } else {
      console.log("formato de contenido no valido");
    }
    let nombre = 'GuiaAutodiagnostico';//1122
    this.admin.takeDocument(nombre).subscribe(
      (res) => {
        let titulo = "Guía Autodiagnostico";
        this.downLoadFile(res, mediaType, formato, titulo);
      },
      (error) => console.log(error)
    );
  }

  downLoadFile(data: any, mediaType, formato, titulo) {
    let blob = new Blob([data], { type: mediaType });
    let filename = titulo + formato;
    FileSaver.saveAs(blob, filename);
    this.is_loading = false;
  }

  do_GestionUsuarios() {
    console.log("usuarios");
    this.router.navigate(["/gestionUsuarios"]);
  }
}
