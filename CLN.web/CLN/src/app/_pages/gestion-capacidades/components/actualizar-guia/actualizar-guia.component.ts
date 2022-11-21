import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { guia } from 'src/app/_model/capacidad/guia.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { FileLocal } from 'src/app/_pages/gestor-contenidos/utils/file-local';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { PermitServiceService } from 'src/app/_services/gestor-roles/permit-service.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { GestionCapacidadesService } from 'src/app/_services/gestion-capacidades/gestion-capacidades.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-actualizar-guia',
  templateUrl: './actualizar-guia.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './actualizar-guia.component.scss']
})
export class ActualizarGuiaComponent implements OnInit {

  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!</p>'
  };
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private auth: AuthenticationService,
    private rolesService: GestorRolesService,
    private permitService: PermitServiceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private gestionService: GestionCapacidadesService
  ) { }


  titulo = [
    "Actualizar guía",
    "",
    "Aquí podrá actualizar y el mensaje de bienvenida del la funcionalidad diligenciar autodiagnóstico.",

  ];
  form: FormGroup;
  formProperties = {
    bienvenida: {
      maxCaracteres: 1000,
      validacion: [
        {
          name: "required",
          message: "Por favor ingrese información en este campo",
          state: true,
        },
        {
          name: "maxlength",
          message: `Se alcanzó el máximo de caracters permitido (100)`,
          state: false,
        },
      ],
    },
    ayuda: {
      maxCaracteres: 100,
      validacion: [
        {
          name: "required",
          message: "Por favor ingrese información en este campo",
          state: true,
        },
        {
          name: "maxlength",
          message: `Se alcanzó el máximo de caracters permitido (50)`,
          state: false,
        },
      ],
    },
  };

  modules = {
    toolbar: [
      // , "italic", "underline"
      ["bold"], // toggled buttons
      // ["blockquote", "code-block"],
      // [{ list: "ordered" }, { list: "bullet" }],
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      // [{ direction: "rtl" }], // text direction
      [{ header: 1 }], // custom button values
      // [{ script: "sub" }, { script: "super" }], // superscript/subscript

      // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],

      ["link"], // link and image, video
    ],
  };

  ngOnInit() {
    this.buildForm();
    this.validSession();
  }

  userlogged: any;
  protected validSession() {
    this.spinner.show();
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

  private buildForm() {
    this.form = this.formBuilder.group({
      "bienvenida": new FormControl("", [Validators.required]),
      "ayuda": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.ayuda.maxCaracteres)])
    });
    this.getGuide();
  }
  private nameFilesUpdated: String[];
  private routesFilesUpdated: String[];
  private getGuide() {
    this.gestionService.getGuia()
      .subscribe(data => {
        if (data.length > 0) {
          this.nameFilesUpdated = [];
          this.routesFilesUpdated = [];
          this.form.get("bienvenida").setValue(data[0].textoBienvenida);
          //document.querySelector("#descripcion > div.ql-container.ql-snow > div.ql-editor").innerHTML = data[0].textoBienvenida;
          this.form.get("ayuda").setValue(data[0].mensajeAyuda);
          var file = (data[0].archivoGuia != "") ? data[0].archivoGuia.split("/") : null;
          if (file) {
            this.routesFilesUpdated.push(data[0].archivoGuia);
            this.nameFilesUpdated.push(file[file.length - 1]);
            this.namesfiles = file[file.length - 1];
          }
          var video = (data[0].videoGuia != "") ? data[0].videoGuia.split("/") : null;
          if (video) {
            this.routesFilesUpdated.push(data[0].videoGuia);
            this.namesvideos = video[video.length - 1];
            this.nameFilesUpdated.push(video[video.length - 1]);
          }
        }
        this.spinner.hide();
      })
  }
  descripcionlenght: number = 1000;
  private contentText: String = "";
  maxlengthdescripcion(e) {
    var content = e.editor.getData();
    this.contentText = content.replace(/<[^>]*>?/g, '');
    this.descripcionlenght = this.formProperties.bienvenida.maxCaracteres - content.replace(/<[^>]*>?/g, '').length;
    /* if (content.length == 1 || content.length > this.formProperties.bienvenida.maxCaracteres) {
       this.form.get('bienvenida').setErrors({ 'incorrect': true })
     } else {
       this.descripcionlenght = this.formProperties.bienvenida.maxCaracteres - content.replace(/<[^>]*>?/g, '').length;
       this.form.get('bienvenida').setErrors(null);
       this.form.get('bienvenida').setValue(content);
     }*/
  }
  exts = [".PDF", ".XLS", ".PPT", ".PPTX", ".XLSX", ".DOCX", ".TXT", ".ZIP", ".RAR"];
  extsmedia = [".MP4"];
  maxSize = [10, 30];
  fileToUpload: File = null;
  videoToUpload: File = null;
  file: FileLocal = new FileLocal();
  fileTwo: FileLocal = new FileLocal();
  public namesfiles: String = null;
  public namesvideos: String = null;
  public alertDocument: String;
  public alertVideo: String;
  handleFileInput(files: FileList) {
    this.alertDocument = "";
    var tipo = files[0].name.split(".");
    var isFile = this.exts.filter(ext => ext.toLowerCase() == "." + tipo[1].toLowerCase())[0];
    var sizeMaxP = this.maxSize[0] * 1000000;
    if (isFile != null && sizeMaxP >= files[0].size) {
      this.namesfiles = files[0].name;
      this.fileToUpload = files.item(0);
      this.acceptedfileAndproggresBar(files[0], 0);
    } else {
      this.alertDocument = "Archivo no valido, por favor valide la extensión y/o el tamaño permitido";
    }
  }
  handleVideoInput(files: FileList) {
    this.alertVideo = "";
    var tipo = files[0].name.split(".");
    var isFile = this.extsmedia.filter(ext => ext.toLowerCase() == "." + tipo[1].toLowerCase())[0];
    var sizeMaxP = this.maxSize[1] * 1000000;
    if (isFile != null && sizeMaxP >= files[0].size) {
      this.namesvideos = files[0].name;
      this.videoToUpload = files.item(0);
      this.acceptedfileAndproggresBar(files[0], 1);
    } else {
      this.alertVideo = "Archivo no valido, por favor valide la extensión y/o el tamaño permitido";
    }
  }
  public firstloadfile = true;
  acceptedfileAndproggresBar(e, type) {
    let file: any = e;
    const filereader = new FileReader()
    const root = document.documentElement;
    let ProgressBar = document.getElementById("progress-Bar" + type);
    let ProgressBarNum = document.getElementById("progress-Bar-number" + type);
    filereader.readAsDataURL(file);
    filereader.addEventListener('progress', (e) => {
      ProgressBar.classList.remove("hidden");
      let value = Math.round(e.loaded * 100 / e.total) + "%";
      root.style.setProperty('--progresBar', value);
      ProgressBarNum.innerText = value;
    });
    filereader.addEventListener("abort", (e) => {
      this.firstloadfile = false;
    });
    filereader.addEventListener('loadend', (e) => {
      this.firstloadfile = true;
      root.style.setProperty('--progresBar', '100%');
      setTimeout(() => {
        ProgressBar.classList.add("hidden");
        root.style.setProperty('--progresBar', "0%");
        ProgressBarNum.innerText = "";
      }, 3000);
    });
  }

  public eliminarArchivo(item) {
    switch (item) {
      case 0:
        this.fileToUpload = null;
        this.namesfiles = null;
        break;
      case 1:
        this.videoToUpload = null;
        this.namesvideos = null;
        break;
    }
  }

  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('ayuda', { static: false }) ayuda: ElementRef;
  public activeValidator: boolean = false;
  save(e) {
    if ((this.namesfiles != null || this.namesvideos != null) && this.form.valid && this.contentText.length <= this.formProperties.bienvenida.maxCaracteres) {
      this.spinner.show();
      const formReader = this.form.value;
      let nuevaguia: guia = new guia();
      console.log(formReader.bienvenida);
      nuevaguia.textoBienvenida = formReader.bienvenida;
      nuevaguia.mensajeAyuda = formReader.ayuda;
      let formData: FormData = new FormData();
      (this.namesfiles != null && !this.nameFilesUpdated.filter(name => name == this.namesfiles)[0]) ? formData.append("fileGuide", this.fileToUpload, this.fileToUpload.name) : (this.namesfiles != null) ? nuevaguia.archivoGuia = this.routesFilesUpdated[0] : "";
      (this.namesvideos != null && !this.nameFilesUpdated.filter(name => name == this.namesvideos)[0]) ? formData.append("videoGuide", this.videoToUpload, this.videoToUpload.name) : (this.namesvideos != null) ? nuevaguia.videoGuia = this.routesFilesUpdated[1] : "";
      formData.append("jsonGuide", JSON.stringify(nuevaguia));
      this.gestionService.updateGuia(formData)
        .subscribe(data => {
          this.spinner.hide();
          if (data.length > 0) {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Se ha actualizado correctamente la información para la sección guía del módulo: Diligenciar autodiagnóstico</p>`;
            this.getGuide();
          } else {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;
          }
        }, error => {
          const ref = this.modalService.open(AlertModalComponent, {
            centered: true,
            backdrop: 'static',
            keyboard: false
          });
          ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'> Ha ocurrido un error inesperado en el sistema, por favor inténtelo de nuevo. Muchas gracias.</p>`;

        })
    } else {
      this.activeValidator = true;
      (this.form.get("ayuda").invalid) ? this.ayuda.nativeElement.placeholder = 'Por favor ingrese información en este campo' : "";
      var actionFiles: boolean = false;
      (this.namesvideos == null && this.namesfiles == null) ? actionFiles = true : actionFiles = false;
      if (actionFiles) {
        this.alertDocument = "Debe cargar al menos un archivo";
        this.alertVideo = "Debe cargar al menos un archivo";
      }
    }
  }

  public validButton() {
    return ((this.namesfiles != null || this.namesvideos != null) && this.form.valid && this.contentText.length <= this.formProperties.bienvenida.maxCaracteres) ? false : true;
  }
}
