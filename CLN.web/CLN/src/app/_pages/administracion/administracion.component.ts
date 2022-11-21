import { Component, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FileUploader, FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { AdminService } from 'src/app/_services/admin.service';
import { stringify } from 'querystring';
import { ValidatorService } from 'src/app/_services/validator.service';
import * as FileSaver from 'file-saver';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {
  @ViewChild('content', { static: false }) modal;
  @ViewChild('modaldos', { static: false }) modalDos;

  dtOptions: DataTables.Settings = {};


  is_loading: boolean;
  userlogged: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettingsBanner = {};
  id_emty: any;

  is_admin_user: boolean = true;
  admin_secciones: boolean = false;
  admin_contenido: boolean = false;
  admin_usuarios: boolean = false;
  reportes: boolean = false;

  menu_admin: boolean = true;
  submenu_admin_1: boolean = false;
  submenu_admin_1_banner: boolean = false;
  submenu_admin_1_email: boolean = false;
  submenu_admin_1_video: boolean = false;
  adminDataMigration: boolean = false;
  submenu_admin_1_FAQ: boolean = false;
  delete_FAQ: boolean = false;
  update_FAQ: boolean = false;

  cont_induccion: boolean = false;
  cont_capacidades: boolean = false;
  submenu_admin_2: boolean = false;
  submenu_admin_2_cont_intro: boolean = false;
  save_cont_intro: boolean = false;
  save_cont_capacidad: boolean = false;
  update_cont_intro: boolean = false;
  delete_cont_intro: boolean = false;
  submenu_admin_2_contCapacidades: boolean = false;

  submenu_reporte: boolean = false;
  submenu_reporteAcceso: boolean = false;
  submenu_reporteSolicitudes: boolean = false;

  onclick_capTec: boolean = false;
  onclick_capDe: boolean = false;
  onclick_capEst: boolean = false;

  //update secretarias - banner
  is_bannerAcknow: boolean;
  secretarias: any[] = [];
  secretariasNoReconocidas: any[] = [];
  secretariasUpdate: any[] = [];
  id_secretaria: any;
  razonReconocimiento: any;
  videoReconocimineto: any;

  urlVideoEstrategia: any;
  emailAsistencia: any;
  is_updatedVideoAsistencia: boolean;


  //save contenido induccion
  tematicas: any;
  nombreDoc = '';
  formatoDoc = '';
  descripcionDoc = '';
  idTematica: any;
  fileUpload: any;
  fileUploadCap: any;
  filesToUpload: Array<File> = [];
  filesToUploadCap: Array<File> = [];

  //list contenido induccion
  contenidos_induccion: any = [];
  idContenido: any;
  secretariaContenidoIn: any;
  is_updateContenidoIn: boolean = false;
  is_deletedContenidoIn: boolean;


  //preguntas frecuentes
  idPregunta: any;
  pregunta: any;
  respuesta: any;
  is_savePreguntasFrecuentes: boolean;
  is_saveContenido: boolean;
  is_empty: boolean;
  ListPreguntasFrecuentes: any;
  is_updatePreguntaF: boolean = false;
  is_deletedPreguntaF: boolean;
  is_updatedEmailAsistencia: boolean;

  //FORTALECER CAPACIDADES
  newlistCapacidades: any = [];
  listCapacidades: any = [];
  idContenidoConFort: any;
  newlist: any = [];
  listCapacidadesbyCat: any = [];
  nombredocConFort = '';
  formatodocConFort = '';
  descripcionConFort = '';
  is_updateConFort: boolean = false;
  idAfirmacionConFort: any;
  is_saveContenidoConFort: boolean;
  categoriaCap: string;
  listCapacidadesFort: any[];
  is_deletedContFort: boolean;
  dataConfig: any[];
  is_updatedActivateBanner: boolean;

  characters: any;
  email_asistencia_is_wrong: boolean;
  idSecretarias: any[];
  emailAsistencia_is_wrong: boolean;
  selSecretariasReporteAcceso = [];
  selSecretariasReporteAsistencia = [];
  generarReporteAsistenciaEnabled = false;
  generarReporteAccesoEnabled = false;
  saveContenidoEnabled = false;
  saveContenidoCapEnabled = false;

  constructor(private admin: AdminService, configModal: NgbModalConfig, private modalService: NgbModal,
    private auth: AuthenticationService,
    private adminService: AdminService,
    private router: Router,
    private validator: ValidatorService,
    private rolesService: GestorRolesService,
    private _Activatedroute: ActivatedRoute,
    private permitService: PermitServiceService,
    private fb: FormBuilder) {

    this.secretariasUpdate = [{
      id: Number,
      name: String,
      razon: String,
      video: String
    }];

  }

  ngOnInit() {
    this.validSession();
    /*this.dtOptions = {
      pagingType: 'simple_numbers',
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
          previous: "Anterior"
        },
        aria: { sortAscending: "Ascendente", sortDescending: "descendiente" },
        url: ""
      }
    };
    this.auth.actualUser$.subscribe(data => {
      this.userlogged = data;
      if (this.userlogged == null) {
        this.router.navigate(['/login']);
      } else if (this.userlogged.idRol == 2) {
        this.router.navigate(['/autodiagnostico']);
      }
    });
*/
  }
  protected validSession() {
    if (localStorage.getItem("session") != undefined) {
      var menuItem = localStorage.getItem("session");
      localStorage.removeItem("session");
      this.permitsAnalitics(menuItem);
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
    this.rolesService.getPermitsComponent(item)
      .subscribe(data => {
        if (data.length > 0) {
          this.permitsUser = this.permitService.fetchPermits(data);
          //Inicializar componente
          this.initType();
          this.getSecretarias();
          this.initForm();
          this.auth.actualUser$.subscribe((data) => {
            this.userlogged = data;
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

  public form: FormGroup;
  private initForm() {
    this.form = this.fb.group({
      "emailAsistencia": new FormControl("", [Validators.required])
    })
    this.getConfig();
  }

  private initType() {
    this._Activatedroute.queryParams
      .subscribe((params: any) => {
        if (params.redirect != null) {
          this.submenu_admin_1 = true;
          switch (JSON.parse(params.redirect)) {
            case 19:
              this.do_AdminBanner();
              break;
            case 20:
              this.do_AdminEmail();
              break;
            case 21:
              this.do_AdminVideo();
              break;
            case 29:
              this.do_MigrationData();
              break;
          }
        } else {
          this.router.navigate(["/menudinamico"]);
        }
      });
  }

  openModal() {
    this.modalService.open(this.modal, { size: 'lg', centered: true });
  }

  closeModal() {
    this.nombreDoc = "";
    this.idTematica = null;
    this.descripcionDoc = "";
    this.fileUpload = "";
    this.is_saveContenido = false;
    this.is_savePreguntasFrecuentes = false;
    this.is_updatePreguntaF = false;
    this.is_deletedPreguntaF = false;
    this.is_updateContenidoIn = false;
    this.is_deletedContenidoIn = false;
    this.is_empty = false;
    this.is_updateConFort = false;
    this.idAfirmacionConFort = null;
    this.idContenidoConFort = "";
    this.nombredocConFort = "";
    this.descripcionConFort = "";
    this.is_saveContenidoConFort = false;
    this.is_deletedContFort = false;
    this.is_updatedEmailAsistencia = false;
    this.is_updatedVideoAsistencia = false;
    //this.emailAsistencia = '';
    //this.urlVideoEstrategia = '';
    this.email_asistencia_is_wrong = false;
    this.modalService.dismissAll();
    this.is_bannerAcknow = false;
  }

  public routingKey(item) {
    switch (item) {
      case 1:
        this.router.navigate(["admin"], { queryParams: { redirect: 19 } });
        break;
      case 2:
        this.router.navigate(["admin"], { queryParams: { redirect: 20 } });
        break;
      case 3:
        this.router.navigate(["admin"], { queryParams: { redirect: 21 } });
        break;
      case 4:
        this.router.navigate(["admin"], { queryParams: { redirect: 29 } });
        break;
    }
  }

  //admin secciones
  do_AdminSecciones() {
    (this.admin_secciones) ? this.admin_secciones = false : this.admin_secciones = true;
    this.admin_contenido = false;
    this.admin_usuarios = false;
    this.reportes = false;
    this.menu_admin = false;
    this.submenu_admin_1 = true;
    this.getListPregunstasFreq();
    this.getConfig();

  }
  do_MigrationData() {
    this.adminDataMigration = true;
    this.submenu_admin_1_banner = false;
    this.submenu_admin_1_FAQ = false;
    this.submenu_admin_1_email = false;
    this.submenu_admin_1_video = false;
  }
  do_AdminBanner() {
    this.submenu_admin_1_banner = true;
    this.submenu_admin_1_email = false;
    this.submenu_admin_1_video = false;
    this.submenu_admin_1_FAQ = false;
    this.adminDataMigration = false;
  }

  do_AdminEmail() {
    this.submenu_admin_1_email = true;
    this.submenu_admin_1_banner = false;
    this.submenu_admin_1_video = false;
    this.submenu_admin_1_FAQ = false;
    this.adminDataMigration = false;
  }
  do_AdminVideo() {
    this.submenu_admin_1_video = true;
    this.submenu_admin_1_banner = false;
    this.submenu_admin_1_FAQ = false;
    this.submenu_admin_1_email = false;
    this.adminDataMigration = false;
  }

  do_AdminFAQ() {
    this.submenu_admin_1_FAQ = true;
    this.submenu_admin_1_banner = false;
    this.submenu_admin_1_video = false;
    this.submenu_admin_1_email = false;
  }
  //admin contenido

  do_AdminContenido() {
    this.admin_contenido = true;
    this.submenu_admin_1 = false;
    this.is_admin_user = false;

  }
  do_AdminContInduccion() {
    (this.cont_induccion) ? this.cont_induccion = false : this.cont_induccion = true;
    this.cont_capacidades = false;
  }
  do_AdminContInduccion_Form() {
    this.submenu_admin_2 = true;
    this.submenu_admin_2_cont_intro = true;
    this.cont_capacidades = false;
    this.do_getTematicas();
    this.getListContenidoInduccion();
  }
  do_AdminContCapacidades() {
    this.submenu_admin_2 = true;
    (this.cont_capacidades) ? this.cont_capacidades = false : this.cont_capacidades = true;
    this.cont_induccion = false;
    this.submenu_admin_2_cont_intro = false;
    this.get_CapacidadesbyCat();
    this.getListContenidoFort();

  }
  do_AdminContCapacidades_Form(capacidad: string) {
    this.categoriaCap = capacidad;
    this.getListContenidoFort();

    this.submenu_admin_2_contCapacidades = false;

    setTimeout(() => {
      (this.submenu_admin_2_contCapacidades) ? this.submenu_admin_2_contCapacidades = false : this.submenu_admin_2_contCapacidades = true;
    }, 200);

    this.is_admin_user = false;
    if (capacidad == "tecnica") {
      (this.onclick_capTec) ? this.onclick_capTec = false : this.onclick_capTec = true;
      this.onclick_capDe = false;
      this.onclick_capEst = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[2];
      this.is_loading = false;
    } else if (capacidad == "personal") {
      (this.onclick_capDe) ? this.onclick_capDe = false : this.onclick_capDe = true;
      this.onclick_capTec = false;
      this.onclick_capEst = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[1];
    } else if (capacidad == "estrategica") {
      (this.onclick_capEst) ? this.onclick_capEst = false : this.onclick_capEst = true;
      this.onclick_capTec = false;
      this.onclick_capDe = false;
      this.listCapacidadesbyCat = this.newlistCapacidades[0];
      // console.log(this.listCapacidadesbyCat);
    }
  }

  do_saveCapacidades() {
    this.save_cont_capacidad = true;
    this.openModal();
  }

  do_MenuReportes() {
    (this.submenu_reporte) ? this.submenu_reporte = false : this.submenu_reporte = true;
    this.is_admin_user = false;
  }

  do_ReporteAcceso() {
    (this.submenu_reporteAcceso) ? this.submenu_reporteAcceso = false : this.submenu_reporteAcceso = true;
    this.submenu_reporte = false;
    this.submenu_reporteSolicitudes = false;
  }

  do_ReporteSolicitudes() {
    (this.submenu_reporteSolicitudes) ? this.submenu_reporteSolicitudes = false : this.submenu_reporteSolicitudes = true;
    this.submenu_reporte = false;
    this.submenu_reporteAcceso = false;
  }

  do_Main() {
    this.menu_admin = true;
    this.is_admin_user = true;
    this.admin_secciones = false;
    this.admin_contenido = false;
    this.admin_usuarios = false;
    this.reportes = false;
    this.menu_admin = true;
    this.submenu_admin_1 = false;
    this.submenu_admin_1_banner = false;
    this.submenu_admin_1_email = false;
    this.submenu_admin_1_video = false;
    this.submenu_admin_1_FAQ = false;
    this.delete_FAQ = false;
    this.update_FAQ = false;
    this.cont_induccion = false;
    this.cont_capacidades = false;
    this.submenu_admin_2 = false;
    this.submenu_admin_2_cont_intro = false;
    this.save_cont_intro = false;
    this.save_cont_capacidad = false;
    this.update_cont_intro = false;
    this.delete_cont_intro = false;
    this.submenu_admin_2_contCapacidades = false;
    this.submenu_reporte = false;
    this.submenu_reporteAcceso = false;
    this.submenu_reporteSolicitudes = false;

  }
  do_GestionUsuarios() {
    console.log("usuarios");
    this.router.navigate(['/gestionUsuarios']);
  }
  getSecretarias() {
    this.adminService.getSecretarias().subscribe(result => {
      //this.spinner.hide();
      console.log(result);
      //valido el rol para ver solo una secretaría
      console.log(this.userlogged);
      //this.userlogged.idSecretaria
      result.forEach(item => {
        if (this.userlogged.idRol == 5 || this.userlogged.idRol == 4) {
          if (this.userlogged.idSecretaria == item.idSecretaria) {
            this.dropdownList.push({
              item_id: item.idSecretaria,
              item_text: item.entidadTerritorial,
              item_razon: item.motivoReconocimiento,
              item_video: item.videoReconocimiento,
              item_reconocida: item.reconocida
            })
          }
        }
        else {
          this.dropdownList.push({
            item_id: item.idSecretaria,
            item_text: item.entidadTerritorial,
            item_razon: item.motivoReconocimiento,
            item_video: item.videoReconocimiento,
            item_reconocida: item.reconocida
          })
        }

      });
      this.selectedItems = [
        /*       { item_id: 3, item_text: 'Pune' },
              { item_id: 4, item_text: 'Navsari' } */
      ];
      this.dropdownList.forEach(element => {
        //console.log(element);
        if (element.item_reconocida) {
          this.secretarias.push({
            idSecretaria: element.item_id,
            entidadTerritorial: element.item_text,
            motivoReconocimiento: element.item_razon,
            videoReconocimiento: element.item_video,
            reconocida: element.item_reconocida,
            idEstado: 6
          });
          this.selectedItems.push(element);
        }
      });



      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'Deseleccionar todo',
        searchPlaceholderText: 'Buscar',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };

      this.dropdownSettingsBanner = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'Deseleccionar todo',
        searchPlaceholderText: 'Buscar',
        itemsShowLimit: 5,
        enableCheckAll: false,
        allowSearchFilter: true
      };

    }, error => {
      console.log(error);
    });
  }
  onItemSelect(item: any) {
    console.log(item);
    this.generarReporteAsistenciaEnabled = true;
    this.generarReporteAccesoEnabled = true;
    this.getDataBanner(item.item_id);
  }
  onSelectAll(items: any) {
    this.secretarias = [];
    this.generarReporteAsistenciaEnabled = true;
    this.generarReporteAccesoEnabled = true;
    for (var i = 0; i < items.length; i++) {
      let secretaria = items[i];
      this.secretarias.push({
        idSecretaria: secretaria.item_id,
        entidadTerritorial: secretaria.item_text,
        motivoReconocimiento: secretaria.item_razon,
        videoReconocimiento: secretaria.item_video,
        reconocida: secretaria.item_reconocida,
        idEstado: 6
      });
    }
    console.log('Secs', this.secretarias);
  }

  onDeSelectAll(items: any) {
    this.secretarias = [];
    this.generarReporteAsistenciaEnabled = false;
    this.generarReporteAccesoEnabled = false;
  }

  onItemDeSelect(item: any) {
    // console.log("it works!");
    // console.log(item);
    this.updateItemsInSelect(item.item_id);
  }

  updateItemsInSelect(id) {
    for (var i = 0; i < this.secretarias.length; i++) {
      if (this.secretarias[i].idSecretaria === id) {
        this.secretariasNoReconocidas.push(this.secretarias[i]);
        this.secretarias.splice(i, 1);
      }
    }
    if (this.selSecretariasReporteAsistencia.length == 0) {
      this.generarReporteAsistenciaEnabled = false;
    }

    if (this.selSecretariasReporteAcceso.length == 0) {
      this.generarReporteAccesoEnabled = false;
    }
    console.log("deleted");
    console.log(this.secretarias);
    console.log(this.secretariasNoReconocidas);
  }

  getDataBanner(id) {
    //console.log(id);
    console.log("selectedItems");
    if (this.selectedItems) //puede venir undefined
    {
      if (this.selectedItems.length == 1) {
        this.secretarias = [];
      }
    }

    console.log(this.selectedItems);
    let secretaria = this.dropdownList.find(item => item.item_id == id);
    this.secretarias.push({
      idSecretaria: secretaria.item_id,
      entidadTerritorial: secretaria.item_text,
      motivoReconocimiento: secretaria.item_razon,
      videoReconocimiento: secretaria.item_video,
      reconocida: secretaria.item_reconocida,
      idEstado: 6

    });
    console.log("pushed");
    console.log(this.secretarias);

  }
  do_getTematicas() {
    this.admin.getTematicas().subscribe(result => {
      console.log(result);
      this.tematicas = result

    }, error => {
      console.log(error);
    });
  }

  updateSecretarias() {

    // console.log(this.secretarias);

    this.secretariasNoReconocidas.forEach((el, i) => {
      this.secretariasNoReconocidas[i].reconocida = false;
      this.adminService.updateSecretaria(
        this.secretariasNoReconocidas[i].idSecretaria,
        this.secretariasNoReconocidas[i]).subscribe(result => {
          // console.log("updating");
          // console.log(result);
          // if (result['message']) {
          //   this.is_bannerAcknow = true;
          //   this.modalService.open(this.modalDos, { size: 'lg', centered: true });
          // }
        });
    });

    this.secretarias.forEach((el, i) => {
      this.secretarias[i].reconocida = true;
      this.adminService.updateSecretaria(this.secretarias[i].idSecretaria, this.secretarias[i]).subscribe(result => {
        // console.log("updating");
        // console.log(result);
        if (result['message']) {
          this.is_bannerAcknow = true;
          this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        }
      });

    });


  }

  do_SaveContenidoInduccion() {
    this.is_loading = true;
    let formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    //    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    console.log(this.userlogged.idUsuario, this.nombreDoc, this.descripcionDoc, this.idTematica, formData);
    console.log(this.nombreDoc, this.descripcionDoc, this.idTematica, this.fileUpload, this.is_updateContenidoIn);
    if ((this.nombreDoc != null || this.descripcionDoc != null || this.idTematica != null || this.fileUpload != null) && this.is_updateContenidoIn == false) {
      this.admin.SaveContenidoInduccion(this.userlogged.idUsuario, this.nombreDoc, this.idTematica, this.descripcionDoc, formData).subscribe(result => {
        console.log(result);
        if (result["message"] == "contenido subido exitosamente") {
          this.is_saveContenido = true;
          this.modalService.open(this.modalDos, { size: 'lg', centered: true });
          this.is_loading = false;
          this.getListContenidoInduccion();
          this.saveContenidoEnabled = false;
        }
      }, error => {
        console.log(error);
      });

    } else if ((this.nombreDoc != null || this.descripcionDoc != null || this.idTematica != null) && this.is_updateContenidoIn == true) {

      if (files[0] != undefined) {

        this.admin.updateContenidoInduccion(this.idContenido, this.userlogged.idUsuario, this.idTematica, this.nombreDoc, this.descripcionDoc, formData).subscribe(res => {
          console.log(res);
          if (res["message"] == "contenido actualizado exitosamente") {
            this.is_updateContenidoIn = true;
            this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            this.getListContenidoInduccion();
            this.is_loading = false;
            this.saveContenidoEnabled = false;
          }
        }), error => {
          console.log(error);
        }
      } else {
        this.admin.updateContenidoInduccion(this.idContenido, this.userlogged.idUsuario, this.idTematica, this.nombreDoc, this.descripcionDoc, "").subscribe(res => {
          console.log(res);
          if (res["message"] == "contenido actualizado exitosamente") {
            this.is_updateContenidoIn = true;
            this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            this.getListContenidoInduccion();
            this.is_loading = false;
            this.saveContenidoEnabled = false;

          }
        }), error => {
          console.log(error);
        }
      }
    }

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.enableSaveContenidoInduccion();
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  fileChangeEventCap(fileInput: any) {
    this.filesToUploadCap = <Array<File>>fileInput.target.files;
    this.enableSaveContenidoCapacidades();
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  getListContenidoInduccion() {
    this.admin.getListContenidoInduccion(this.userlogged.idSecretaria).subscribe(res => {
      console.log("Contenido inducion");
      console.log(res);
      this.contenidos_induccion = res;
    }), error => {
      this.contenidos_induccion = undefined;
      console.log(error);
    }
  }

  To_updateContenidoIn(idContenido, tituloContenido, contenidoDescricion, idTematica, formatoContenido) {
    this.idContenido = idContenido;
    this.nombreDoc = tituloContenido;
    this.formatoDoc = formatoContenido;
    this.descripcionDoc = contenidoDescricion;
    this.idTematica = idTematica;
    this.is_updateContenidoIn = true;
    this.saveContenidoEnabled = true;
    // this.fileUpload = new File(null, formatoContenido);
  }

  do_deleteContendoIn(idContenido, idTematica) {
    this.admin.deleteContenido(idContenido, this.userlogged.idUsuario, idTematica).subscribe(res => {
      console.log(res);

      if (res["message"] = "Contenido eliminado exitosamente") {
        this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        this.is_deletedContenidoIn = true;
        this.getListContenidoInduccion();

      }
    }), error => {
      console.log(error);
    }
  }


  savePreguntasFrecuentes() {
    if ((this.pregunta || this.respuesta != "") && this.is_updatePreguntaF == false) {
      console.log(this.is_updatePreguntaF);

      this.admin.savePreguntasFrequentes(this.userlogged.idUsuario, this.pregunta, this.respuesta).subscribe(res => {
        console.log(res);
        this.is_savePreguntasFrecuentes = true;
        this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        this.pregunta = "";
        this.respuesta = "";
        this.getListPregunstasFreq();
      }), error => {
        console.log(error);
      }
    } else if ((this.pregunta || this.respuesta != "") && this.is_updatePreguntaF == true) {
      console.log(this.is_updatePreguntaF);

      this.admin.updatePreguntaFreq(this.idPregunta, this.pregunta, this.respuesta, this.userlogged.idUsuario).subscribe(res => {
        console.log(res);
        this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        this.pregunta = "";
        this.respuesta = "";
        this.getListPregunstasFreq();
      }), error => {
        console.log(error);
      }

    }
    else {
      this.is_empty = true;
      this.modalService.open(this.modalDos, { size: 'lg', centered: true });

    }

  }

  getListPregunstasFreq() {
    /*  this.admin.getListPreguntasFreq().subscribe(res => {
        this.ListPreguntasFrecuentes = res.Result;
        console.log(res.Result);
      }), error => {
        console.log(error);
      }
  */
  }

  To_updatePreguntaFreq(id, question, answer) {
    this.idPregunta = id;
    this.pregunta = question;
    this.respuesta = answer;
    this.is_updatePreguntaF = true;
    console.log(this.is_updatePreguntaF);
  }

  do_deletePreguntaFreq(id) {
    console.log(id);
    this.admin.deletePreguntaFreq(id).subscribe(res => {
      console.log(res);

      if (res["message"] = "Pregunta eliminada exitosamente") {
        this.getListPregunstasFreq();
        this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        this.is_deletedPreguntaF = true;

      }
    }), error => {
      console.log(error);
    }
  }
  var
  getConfig() {
    this.admin.getConfig().subscribe(res => {
      res.forEach(rs => {
        (rs.parametro == "correoAsistenciaTecnica") ? this.form.get("emailAsistencia").setValue(rs.valor)  :(rs.parametro == "videoEstrategia") ? this.urlVideoEstrategia = rs.valor:"";
      })
      /*this.dataConfig = res;
      this.is_bannerAcknow = this.dataConfig['bannerReconocimiento'];
      this.urlVideoEstrategia = this.dataConfig['videoEstrategia'];
      this.form.get("emailAsistencia").setValue(this.dataConfig["correoAsistenciaTecnica"]);
      console.log(this.form.get("emailAsistencia").value);*/
    }), error => {
      console.log(error);
    }
  }

  do_UpdateEmailAsistencia() {
    //   this.emailAsistencia = this.dataConfig[0].correoAsistenciaTecnica;
    if (this.form.valid) {
      this.admin.updateCorreoAsistencia(this.form.get("emailAsistencia").value).subscribe(res => {
        if (res.length > 0) {
          this.is_updatedEmailAsistencia = true;
          const ref = this.modalService.open(AlertModalComponent, {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Se ha actualizado el correo para acompañamiento integral</p>`;
        }
      }), error => {
        console.log(error);
      }
    } else {
      this.email_asistencia_is_wrong = true;
      this.modalService.open(this.modalDos, { size: 'lg', centered: true });
    }
  }

  do_UpdateVideoEstrategia() {
    //this.emailAsistencia = this.dataConfig['correoAsistenciaTecnica'];
    //this.is_bannerAcknow = this.dataConfig['bannerReconocimiento'];
    // this.urlVideoEstrategia = this.dataConfig['videoEstrategia'];

    this.admin.updateVideoEstrategias(this.urlVideoEstrategia).subscribe(res => {

      console.log(res);
      if (res.length > 0) {
        const ref = this.modalService.open(AlertModalComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Se ha actualizado el video de presentación de la Estrategia</p>`;

      }

    }), error => {
      console.log(error);
    }
  }

  ActiveBanner(event) {
    console.log(event);
    this.emailAsistencia = this.dataConfig['correoAsistenciaTecnica'];
    this.is_bannerAcknow = event.target.checked;
    //this.is_bannerAcknow = this.dataConfig['bannerReconocimiento'];
    this.urlVideoEstrategia = this.dataConfig['videoEstrategia'];

    this.admin.updateBannerActived(this.userlogged.idUsuario, this.emailAsistencia, this.is_bannerAcknow, this.urlVideoEstrategia).subscribe(res => {

      console.log(res);
      /*       if (res['message']) {
              this.is_updatedActivateBanner = true;
              this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            } */

    }), error => {
      console.log(error);
    }
  }

  //----------------CONTENIDO CAPACIDADES  ----------------------//
  get_CapacidadesbyCat() {
    this.adminService.getListCapacidades().subscribe(result => {
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

        if (this.listCapacidades[j].categoria == "CAPACIDADES TÉCNICAS") {
          for (let a = 0; a < this.listCapacidades[j].afirmaciones.length; a++) {
            this.newlist.push(this.listCapacidades[j].afirmaciones[a]);
          }
        }

      }
      this.newlistCapacidades.push({ "categoria": "CAPACIDADES TÉCNICAS", "afirmaciones": this.newlist });
      //console.log(this.newlistCapacidades);
    })
  }

  getListContenidoFort() {
    this.admin.getListContenidoFort(this.categoriaCap).subscribe(res => {
      console.log(res);
      this.listCapacidadesFort = res;
    }), error => {
      console.log(error);
    }
  }

  do_SaveContenidoFort() {
    let formData: any = new FormData();
    const files: Array<File> = this.filesToUploadCap;
    //    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    //  console.log('form data variable :   ' + formData.toString());
    // console.log(this.userlogged.idUsuario, this.nombreDoc, this.descripcionDoc, this.idTematica, formData);
    // console.log(this.userlogged.idUsuario, this.idAfirmacionConFort, this.nombredocConFort, this.descripcionConFort, this.fileUpload, this.is_updateConFort);

    if ((this.idAfirmacionConFort != this.nombredocConFort != null || this.descripcionConFort != null || this.fileUploadCap != null) && this.is_updateConFort == false) {
      console.log('is save ?');

      this.admin.SaveContenidoFort(this.userlogged.idUsuario, this.idAfirmacionConFort,
        this.nombredocConFort, this.descripcionConFort, formData).subscribe(result => {
          console.log(result);
          if (result["message"] == "contenido subido exitosamente") {
            this.is_saveContenidoConFort = true;
            this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            this.get_CapacidadesbyCat();
            this.getListContenidoFort();
            this.saveContenidoCapEnabled = false;
          }
        }, error => {
          console.log(error);
        });

    } else if ((this.idAfirmacionConFort != null || this.nombredocConFort != null || this.descripcionConFort != null) && this.is_updateConFort == true) {
      console.log('is update ?');
      if (files[0] != undefined) {
        console.log("update with formdata");
        this.admin.updateContenidoFort(this.userlogged.idUsuario, this.idContenidoConFort, this.idAfirmacionConFort, this.nombredocConFort, this.descripcionConFort, formData).subscribe(res => {
          console.log(res);
          if (res["message"]) {
            this.is_updateConFort = true;
            this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            this.get_CapacidadesbyCat();
            this.getListContenidoFort();
            this.saveContenidoCapEnabled = false;
          }
        }), error => {
          console.log(error);
        }
      } else {
        console.log("update without formdata");

        this.admin.updateContenidoFort(this.userlogged.idUsuario, this.idContenidoConFort, this.idAfirmacionConFort, this.nombredocConFort, this.descripcionConFort, "").subscribe(res => {
          console.log(res);
          if (res["message"]) {
            this.is_updateContenidoIn = true;
            this.modalService.open(this.modalDos, { size: 'lg', centered: true });
            this.get_CapacidadesbyCat();
            this.getListContenidoFort();
            this.saveContenidoCapEnabled = false;

          }
        }), error => {
          console.log(error);
        }
      }
    }

  }

  To_updateConFort(idAfirmacion, idContenido, titulo, descripcion, formato) {
    this.idAfirmacionConFort = idAfirmacion;
    this.idContenidoConFort = idContenido;
    this.nombredocConFort = titulo;
    this.formatodocConFort = formato;
    this.descripcionConFort = descripcion;
    this.is_updateConFort = true;
    this.saveContenidoCapEnabled = true;
    //  console.log(idAfirmacion, idContenido, titulo, descripcion);
    console.log(this.is_updateConFort);
  }

  do_deleteConFort(idContenido, idAfirmacion) {
    this.admin.deleteContenidoFort(idContenido, idAfirmacion, this.userlogged.idUsuario).subscribe(res => {
      console.log(res);

      if (res["message"]) {
        this.get_CapacidadesbyCat();
        this.getListContenidoFort();
        this.modalService.open(this.modalDos, { size: 'lg', centered: true });
        this.is_deletedContFort = true;

      }
    }), error => {
      console.log(error);
    }
  }


  enableSaveContenidoInduccion() {
    console.log('file', this.fileUpload);
    if (!this.is_updateContenidoIn) {
      if (this.nombreDoc.length > 0 && this.descripcionDoc.length > 0
        && this.fileUpload != null && this.idTematica != null) {
        console.log('OK');
        this.saveContenidoEnabled = true;
      } else {
        console.log('NNN');
        this.saveContenidoEnabled = false;
      }
    } else {
      console.log('OKsd');
      if (this.nombreDoc.length > 0 && this.descripcionDoc.length > 0
        && this.idTematica != null) {
        console.log('OK');
        this.saveContenidoEnabled = true;
      } else {
        console.log('NNN');
        this.saveContenidoEnabled = false;
      }
    }
  }
  enableSaveContenidoCapacidades() {
    console.log('file', this.fileUpload);
    if (!this.is_updateConFort) {
      if (this.nombredocConFort.length > 0 && this.descripcionConFort.length > 0
        && this.fileUploadCap != null && this.idAfirmacionConFort != null) {
        this.saveContenidoCapEnabled = true;
      } else {
        this.saveContenidoCapEnabled = false;
      }
    } else {
      if (this.nombredocConFort.length > 0 && this.descripcionConFort.length > 0
        && this.idAfirmacionConFort != null) {
        this.saveContenidoCapEnabled = true;
      } else {
        this.saveContenidoCapEnabled = false;
      }
    }
  }


  do_Valid(param, type, max, event) {
    this.characters = this.validator.Validate(param, type, max, event);
    console.log('chars', this.characters);
    if (this.characters == 'email_not') {
      this.emailAsistencia_is_wrong = true;
    } else {
      this.emailAsistencia_is_wrong = false;
    }
    this.enableSaveContenidoCapacidades();
    this.enableSaveContenidoInduccion();
  }

  do_getReporteByAccess(formato) {
    this.is_loading = true;
    let mediaType: string;
    if (formato == ".pdf") {
      mediaType = "application/pdf";
    } else if (formato == ".doc") {
      mediaType = "application/msword"
    } else if (formato == ".docx") {
      mediaType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    } else if (formato == ".xls") {
      mediaType = "application/ms-excel"
    } else if (formato == ".xlsx") {
      mediaType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    } else if (formato == ".ppt") {
      mediaType = "application/vnd.ms-powerpoint"
    } else if (formato == ".pptx") {
      mediaType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    } else {
      console.log("contenido no valido");
    }
    this.idSecretarias = [];
    for (let i = 0; i < this.secretarias.length; i++) {
      this.idSecretarias.push(this.secretarias[i].idSecretaria)
    }

    this.admin.getReporte_byAcceso(this.userlogged.idUsuario, this.idSecretarias).subscribe(res => {
      let titulo = "Reporte Acesso Secretarias" + new Date().toLocaleString();
      this.downLoadFile(res, mediaType, formato, titulo)
    }, error => console.log(error));
  }


  downLoadFile(data: any, mediaType, formato, titulo) {

    let blob = new Blob([data], { type: mediaType });
    let filename = titulo + formato;
    FileSaver.saveAs(blob, filename);
    this.idSecretarias = [];
    this.secretarias = [];
    this.selSecretariasReporteAcceso = [];
    this.selSecretariasReporteAsistencia = [];
    this.is_loading = false;
  }

  getReporte_byAsistencias(formato) {
    this.is_loading = true;
    let mediaType: string;
    if (formato == ".pdf") {
      mediaType = "application/pdf";
    } else if (formato == ".doc") {
      mediaType = "application/msword"
    } else if (formato == ".docx") {
      mediaType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    } else if (formato == ".xls") {
      mediaType = "application/ms-excel"
    } else if (formato == ".xlsx") {
      mediaType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    } else if (formato == ".ppt") {
      mediaType = "application/vnd.ms-powerpoint"
    } else if (formato == ".pptx") {
      mediaType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    } else {
      console.log("contenido no valido");
    }
    this.idSecretarias = [];
    for (let i = 0; i < this.secretarias.length; i++) {
      this.idSecretarias.push(this.secretarias[i].idSecretaria)
    }
    this.admin.getReporte_byAsistencias(this.userlogged.idUsuario, this.idSecretarias).subscribe(res => {
      let titulo = "Reporte de solicitudes de asistencia técnica integral" + new Date().toLocaleString();
      this.downLoadFile(res, mediaType, formato, titulo)
    }, error => console.log(error));
  }

  is_userConsultas() {
    return (this.userlogged['idRol'] == 3 && this.userlogged['idRol'] == 4
      && this.userlogged['idRol'] == 5);
  }

  is_adminUser() {
    return this.userlogged['idRol'] == 1;
  }
}
