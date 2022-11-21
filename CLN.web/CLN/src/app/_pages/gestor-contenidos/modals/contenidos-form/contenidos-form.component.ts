import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { MicrositiosService } from "src/app/_services/micrositios/micrositios.service";
import { BibliotecaService } from "src/app/_services/gestor-contenidos/biblioteca.service";
import { TemasService } from "src/app/_services/gestor-contenidos/temas.service";
import { ContenidoService } from "src/app/_services/gestor-contenidos/contenido.service";

import { Biblioteca } from "src/app/_model/contenidos/biblioteca.model";
import { Validaciones } from "src/app/_shared/utils/validaciones";

import { FileLocal } from "../../utils/file-local";
import { Links } from "../../utils/links";
import { ConfirmacionComponent } from "../confirmacion/confirmacion.component";
import { ContenidoAsociado } from "src/app/_model/contenidos/contenido.model";
import { Validarbiblioteca } from "src/app/_helper/validators/crear-contneido-form";
import { AlertModalComponent } from "src/app/_shared/modals/alert-modal/alert-modal.component";
@Component({
  selector: "app-contenidos-form",
  templateUrl: "./contenidos-form.component.html",
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    "./contenidos-form.component.scss",
  ],
})
export class ContenidosFormComponent implements OnInit, AfterViewInit {
  sendedData; // data sended from the parent, in this case is 0, but is necesary to declare it
  git;
  bibliotecas: Biblioteca[] = [];
  fileToUpload: File = null;
  form: FormGroup;
  formProperties = {
    titulo: {
      maxCaracteres: 150,
      validationMessages: {
        required: "El nombre es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (150)",
      },
      error: false,
    },
    descripcion: {
      maxCaracteres: 500,
      validationMessages: [
        {
          type: "Valor Minimo",
          message: "la descripción es requerida",
          state: false
        },
        {
          type: "Valor Maximo",
          message: `Se alcanzó el máximo de caracters permitido (500)`,
          state: false
        }
      ],
      error: false,
    },
  };
  links: Links;
  file: FileLocal;
  noPermitirReenviarHastaObtenerRespuesta: boolean = true;
  ddMicrositiosList = [];
  selectedMicrositiosItems = [];
  ddMicrositiosSettings: IDropdownSettings = {};

  ddTemasList = [];
  selectedTemasItems = [];
  ddTemasSettings: IDropdownSettings = {};

  contenidosBeforeSelect;
  contenidoAsociadoCapacidades: ContenidoAsociado[];
  contenidosAsociados: ContenidoAsociado[];
  contenidosAsociadosSeleccionados: ContenidoAsociado[];
  contenidosAsociadosInduccion: ContenidoAsociado[];

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
  editorStyle = {
    height: '250px'
  };
  descripcionlenght: number = 500;

  maxlengthdescripcion(e) {
    this.form.get('descripcion').setErrors(null);
    this.formProperties.descripcion.validationMessages.forEach(e => e.state = false);
    this.descripcionlenght = this.formProperties.descripcion.maxCaracteres + 1 - e.text.length;
    if (e.text.length === 1 || e.text.length > this.formProperties.descripcion.maxCaracteres) {
      this.form.get('descripcion').setErrors({ 'incorrect': true });
      e.text.length === 1 ?
        this.formProperties.descripcion.validationMessages[0].state = true :
        this.formProperties.descripcion.validationMessages[1].state = true;
    }
  }

  ngOnInit() {
    this.fetchMicrositios();
    this.fetchBiblitoecaCategoriaCapacidades();
    this.fetchBiblitoecaCategoriaInduccion();
    this.configMicrositiosListSettings();
    this.fetchTemas();
    this.configTemasListSettings();
    this.fetchBilbiotecas();
  }

  ngAfterViewInit() {
    let file: any = document.getElementById("file");
    this.file.inputfiles(file);
    this.file.inputlink();
  }
  constructor(
    public modal: NgbActiveModal,
    private micrositiosService: MicrositiosService,
    private bibliotecaService: BibliotecaService,
    private temasService: TemasService,
    private contenidoService: ContenidoService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.buildForm();
    this.links = new Links();
    this.file = new FileLocal();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      bibliotecas: [null, [Validators.required]],
      /*temas: [null],
      micrositios: [null],*/
      titulo: [
        "",
        [
          Validators.required,
          Validators.maxLength(this.formProperties.titulo.maxCaracteres),
        ],
      ],
      descripcion: [
        "",
        [
          Validators.required,
          Validators.maxLength(500),
        ],],
    });
  }

  public canView: boolean = false;
  ChangeSelectedBiblioteca(target) {
    console.log(target.selectedOptions[0].getAttribute("ng-reflect-ng-value"));
    if (
      target.selectedOptions[0].getAttribute("ng-reflect-ng-value") == "2071" ||
      target.selectedOptions[0].getAttribute("ng-reflect-ng-value") == "2072"
    ) {
      if (target.selectedOptions[0].getAttribute("ng-reflect-ng-value") == "2071") {
        this.form.addControl('tipoCapacidad', this.formBuilder.control('', Validators.required))
        this.form.addControl('clasificacionContenido', this.formBuilder.control('', Validators.required))
      } else if (target.selectedOptions[0].getAttribute("ng-reflect-ng-value") == "2072") {
        this.form.addControl('clasificacionContenido', this.formBuilder.control('', Validators.required))
      } else {
        this.form.removeControl('tipoCapacidad');
        this.form.removeControl('clasificacionContenido');
      }
      /*this.form
        .get("clasificacionContenido")
        .setValidators([Validarbiblioteca]);
      this.form.get("clasificacionContenido").patchValue(0);*/
      this.form.removeControl('temas');
      this.form.removeControl('micrositios');
      this.canView = false;
    } else {
      this.form.addControl('temas', this.formBuilder.control('', Validators.required));
      this.form.addControl('micrositios', this.formBuilder.control('', Validators.required));
      this.form.removeControl('tipoCapacidad');
      this.form.removeControl('afirmacion');
      this.form.removeControl('capacidad');
      this.canView = true;
    }
    this.contenidosBeforeSelect = null;
    this.contenidosAsociadosSeleccionados = null;
  }
  ChangeCapacidadesAsociadas(optionSelected) {
    this.contenidosAsociadosSeleccionados = this.contenidosAsociados.filter(
      (c) => c.idValorPadre == optionSelected
    );
    //this.form.patchValue({ clasificacionContenido: 0 });
  }
  configTemasListSettings() {
    this.ddTemasSettings = {
      singleSelection: false,
      idField: "idTema",
      textField: "descripcion",
      selectAllText: "Todos Seleccionados",
      unSelectAllText: "ninguno seleccionado",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
  }
  configMicrositiosListSettings() {
    this.ddMicrositiosSettings = {
      singleSelection: false,
      idField: "idMicrositio",
      textField: "nombre",
      selectAllText: "Todos Seleccionados",
      unSelectAllText: "ninguno seleccionado",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
  }
  fetchBilbiotecas() {
    this.bibliotecaService.getLibrariesforlist().subscribe((response) => {
      this.bibliotecas = response;
    });
  }
  fetchMicrositios() {
    // this.ddMicrositiosList = this.Micrositiosprueba;
    this.micrositiosService.getMicrositesforList().subscribe((response) => {
      const a: any = response;
      this.ddMicrositiosList = a;
      // let b=[];
      // for(let micro of response){
      //   let idBiblioteca:any = micro;
      //   b.push({idMicrositio: idBiblioteca.idBiblioteca, nombre: micro.nombre})
      // }
      // this.ddMicrositiosList=b;
    });
  }
  fetchTemas() {
    this.temasService.getTopics(1, 0).subscribe((response) => {
      // this.idTema = response;
      let b = [];
      for (let tema of response) {
        let ntema: any = tema;
        (tema.estado == "Activo") ? b.push({ idTema: ntema.idTema, descripcion: ntema.descripcion }) : "";
      }
      this.ddTemasList = b;
    });
  }
  fetchBiblitoecaCategoriaCapacidades() {
    this.contenidoService
      .getContentTypesAffirmationsforList("capacidades")
      .subscribe((response: ContenidoAsociado[]) => {
        this.contenidoAsociadoCapacidades = response.filter(
          (categoria) => categoria.idValorPadre === 2071
        );
        this.contenidosAsociados = response.filter(
          (categoria) => categoria.idValorPadre !== 2071
        );
      });
  }
  fetchBiblitoecaCategoriaInduccion() {
    this.contenidoService
      .getContentTypesAffirmationsforList("induccion")
      .subscribe((response) => {
        this.contenidosAsociadosInduccion = response;
      });
  }
  public activeValidator = false;
  @ViewChild('titulo', { static: false }) titulo: ElementRef;
  save(event: Event) {
    event.preventDefault();
    if (this.form.valid && this.file.firstloadfile) {
      let contentToSend
      this.noPermitirReenviarHastaObtenerRespuesta = false;
      const contenido = this.form.value;
      contenido.descripcion = document.querySelector("#descripcion > div.ql-container.ql-snow > div.ql-editor").innerHTML;
      contenido.temas = [];
      console.log(this.selectedTemasItems)
      this.selectedTemasItems.forEach((element) => {
        contenido.temas.push(element.idTema);
      });
      contenido.temas = [...new Set(contenido.temas)];

      contenido.micrositios = [];
      this.selectedMicrositiosItems.forEach((element) => {
        contenido.micrositios.push(element.idMicrositio);
      });
      contenido.micrositios = [...new Set(contenido.micrositios)];
      contenido.tipoContenido = this.file.fileenabled ? "Archivo" : "Enlace";
      let link: any = document.querySelector("#link");
      contenido.ruta = this.file.fileenabled ? "" : link.value;
      let biblitoeca: any = document.getElementById("bibliotecas");
      contenido.bibliotecas = [
        biblitoeca.selectedOptions[0].getAttribute("data-bibliotecavalue"),
      ];
      let formData: FormData = new FormData();
      formData.append("jsonContent", JSON.stringify(contenido));
      if (this.file.fileenabled) {
        formData.append("fileKey", this.fileToUpload, this.fileToUpload.name);
      }
      console.group("CONTENIDO DATA");
      console.log(contenido);
      console.groupEnd();
      this.contenidoService
        .createContent(contenido, formData)
        .subscribe((response) => {
          this.modal.close("Yes");
          const buttons: Array<model> = [];
          const first = "El contenido ";
          const bold = contenido.titulo;
          const third = "ha sido cargado correctamente";
          buttons[0] = {
            class: "modal-button modal-button-primary",
            messsage: "Cerrar",
            action: "cancel",
          };
          this.render(first + " - " + bold + " " + third);
        });
    } else {
      (this.form.get('titulo').invalid) ? this.titulo.nativeElement.placeholder = 'Por favor ingrese información en este campo' : ""
      this.activeValidator = true;
    }
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  render(
    first: string
  ): void {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = first;
    /*ref.componentInstance.message[1] = bold;
    ref.componentInstance.message[2] = third;
    ref.componentInstance.buttons = buttons;*/

    ref.result.then(
      (yes) => { },
      (cancel) => { }
    );
  }
  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
    }
    return rta;
  }
}
