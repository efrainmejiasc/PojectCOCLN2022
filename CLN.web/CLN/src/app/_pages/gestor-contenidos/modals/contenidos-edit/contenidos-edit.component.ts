import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";

import { ContenidoService } from "src/app/_services/gestor-contenidos/contenido.service";
import { MicrositiosService } from "src/app/_services/micrositios/micrositios.service";
import { BibliotecaService } from "src/app/_services/gestor-contenidos/biblioteca.service";
import { TemasService } from "src/app/_services/gestor-contenidos/temas.service";

import { Biblioteca } from "src/app/_model/contenidos/biblioteca.model";

import { Validaciones } from "src/app/_shared/utils/validaciones";

import { Links } from "../../utils/links";
import { FileLocal } from "../../utils/file-local";
import { ContenidoAsociado } from "src/app/_model/contenidos/contenido.model";
import { Validarbiblioteca } from "src/app/_helper/validators/crear-contneido-form";

@Component({
  selector: "app-contenidos-edit",
  templateUrl: "./contenidos-edit.component.html",
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    "./contenidos-edit.component.scss",
  ],
})
export class ContenidosEditComponent implements OnInit, AfterViewInit {
  sendedData; //data sended from the parent, in this case is 0, but is necesary to declare it
  contenido: any;
  bibliotecasArr: Biblioteca[] = [];
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

  ddMicrositiosList = [];
  selectedMicrositiosItems = [];
  ddMicrositiosSettings: IDropdownSettings = {};
  ddTemasList = [];
  selectedTemasItems = [];
  ddTemasSettings: IDropdownSettings = {};
  Micrositiosprueba = [];

  showContenidoAsociado = 0;
  contenidosBeforeSelect;
  contenidoAsociadoCapacidades: ContenidoAsociado[];
  contenidosAsociados: ContenidoAsociado[];
  contenidosAsociadosSeleccionados: ContenidoAsociado[];
  contenidosAsociadosInduccion: ContenidoAsociado[];

  editorStyle = {
    height: '250px'
  }
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
  descripcionlenght: number = 500;
  noPermitirReenviarHastaObtenerRespuesta: boolean = true;

  maxlengthdescripcion(e) {
    this.form.get('descripcion').setErrors(null)
    this.formProperties.descripcion.validationMessages.forEach(e => e.state = false)
    this.descripcionlenght = this.formProperties.descripcion.maxCaracteres + 1 - e.text.length;
    if (e.text.length == 1 || e.text.length > this.formProperties.descripcion.maxCaracteres) {
      this.form.get('descripcion').setErrors({ 'incorrect': true })
      e.text.length == 1 ?
        this.formProperties.descripcion.validationMessages[0].state = true :
        this.formProperties.descripcion.validationMessages[1].state = true;
    }
  }

  ngOnInit() {
    this.configMicrositiosListSettings();
    this.buildForm();
    this.fetchBilbiotecas();
  }

  ngAfterViewInit() {
    // this.reviewFile.review(file,this.file);
    this.noPermitirReenviarHastaObtenerRespuesta = true;

    this.tryloadcontent();
  }

  tryloadcontent() {
    let tryload = setInterval(() => {
      if (document.querySelector("#descripcion > div.ql-container.ql-snow > div.ql-editor")) {
        clearInterval(tryload);
        document.querySelector("#descripcion > div.ql-container.ql-snow > div.ql-editor").innerHTML = this.contenido.descripcion;
      }
    }, 20)
  }

  constructor(
    public modal: NgbActiveModal,
    private micrositiosService: MicrositiosService,
    private bibliotecaService: BibliotecaService,
    private temasService: TemasService,
    private contenidoService: ContenidoService,
    private formBuilder: FormBuilder
  ) {
    this.links = new Links();
    this.file = new FileLocal();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      bibliotecas: [
        this.contenido.bibliotecas[0].idBiblioteca,
        [Validators.required],
      ],
      temas: [null],
      micrositios: [null],
      titulo: [
        this.contenido.titulo,
        [
          Validators.required,
          Validators.maxLength(this.formProperties.titulo.maxCaracteres),
        ],
      ],
      descripcion: [""],
      clasificacionContenido: this.contenido.idClasificacionContenido,
    });
  }

  returntype() {
    let content = this.bibliotecasArr.filter(bib => bib.idBiblioteca == this.form.get("bibliotecas").value)[0]
    return (content && content.idTipo != undefined) ? content.idTipo : null;
  }

  public canView: boolean = false;
  ChangeSelectedBiblioteca(target) {
    this.form.get("clasificacionContenido").clearValidators();
    let bibli = this.bibliotecasArr.filter(bib => bib.idBiblioteca == this.form.get("bibliotecas").value)[0];
    if (
      bibli.idTipo == 2071 ||
      bibli.idTipo == 2072
    ) {
      this.form
        .get("clasificacionContenido")
        .setValidators([Validarbiblioteca]);

      this.form.controls['temas'].clearValidators()
      this.form.controls['micrositios'].clearValidators()
      this.form.get("clasificacionContenido").patchValue(0);
      this.canView = false;
    } else {
      this.form.controls['temas'].setValidators([Validators.required]);
      this.form.controls['micrositios'].setValidators([Validators.required]);
      this.canView = true;
    }
    this.contenidosBeforeSelect = null;
    this.contenidosAsociadosSeleccionados = null;
  }

  ChangeCapacidadesAsociadas(optionSelected) {
    this.contenidosAsociadosSeleccionados = this.contenidosAsociados.filter(
      (c) => c.idValorPadre == optionSelected
    );
    this.form.patchValue({ clasificacionContenido: 0 });
  }

  fetchBilbiotecas() {
    this.bibliotecaService.getLibrariesforlist().subscribe((response) => {
      let a: any = response
      this.bibliotecasArr = a;
      let selected = a.filter((biblioteca) => biblioteca.idBiblioteca == this.contenido.bibliotecas[0].idBiblioteca)[0];
      let sel = null;
      if (selected != undefined) {
        sel = selected.idBiblioteca
      } else {
        sel = this.contenido.bibliotecas[0];
        this.bibliotecasArr.push(this.contenido.bibliotecas[0]);
      }
      this.fetchBiblitoecaCategoriaInduccion(sel);
      this.fetchContentSelected();
    });
  }

  fetchBiblitoecaCategoriaInduccion(sel) {
    this.contenidoService
      .getContentTypesAffirmationsforList("induccion")
      .subscribe((response) => {
        this.fetchBiblitoecaCategoriaCapacidades(this.contenido.bibliotecas[0].idTipo);
        this.contenidosAsociadosInduccion = response;
      });
  }

  fetchBiblitoecaCategoriaCapacidades(sel) {
    this.contenidoService
      .getContentTypesAffirmationsforList("capacidades")
      .subscribe((response: ContenidoAsociado[]) => {
        this.contenidoAsociadoCapacidades = response.filter(
          (categoria) => categoria.idValorPadre == 2071
        );
        this.contenidosAsociados = response.filter(
          (categoria) => categoria.idValorPadre != 2071
        );
        if (sel == 2071 || sel == 2072) {
          this.canView = false;
          this.form
            .get("clasificacionContenido")
            .setValidators([Validarbiblioteca]);
          if (sel == 2071) {
            this.showContenidoAsociado = 1;
            let optionselected = this.contenidosAsociados.filter(
              (CA) => CA.idValor == this.contenido.idClasificacionContenido
            );
            this.contenidosBeforeSelect = optionselected[0].idValorPadre;
            this.contenidosAsociadosSeleccionados = this.contenidosAsociados.filter(
              (c) => c.idValorPadre == optionselected[0].idValorPadre
            );
            this.form
              .get("clasificacionContenido")
              .patchValue(optionselected[0].idValor);
          } else {
            this.showContenidoAsociado = 2;
            let optionselected = this.contenidosAsociadosInduccion.filter(
              (CA) => CA.idValor == this.contenido.idClasificacionContenido
            );
          }
        } else if (sel == 2073) {
          this.canView = true;
        }
      });
  }

  fetchContentSelected() {
    this.fetchMicrositios(this.contenido.micrositios);
    this.fetchTemas(this.contenido.temas);
    this.loadfileorlink(this.contenido);
  }

  fetchMicrositios(contenido) {
    this.ddMicrositiosList = this.Micrositiosprueba;
    this.micrositiosService.getMicrositesforList().subscribe((response) => {
      let respuesta: any = response;
      this.ddMicrositiosList = respuesta;
      let selectedcontenido = [];
      if (contenido !== undefined) {
        contenido.forEach((cont) => {
          respuesta.forEach((resp) => {
            if (cont.idMicrositio === resp.idMicrositio) {
              selectedcontenido.push(resp);
            }
          });
        });
      }
      this.selectedMicrositiosItems = selectedcontenido;
    });
  }

  fetchTemas(contenido) {
    this.configTemasListSettings();
    this.temasService.getTopics(1, 0).subscribe((response) => {
      const selected = [];
      if (contenido != undefined) {
        contenido.forEach((cont) => {
          response.forEach((respuesta) => {
            if (cont.idTema === respuesta.idTema) {
              selected.push(respuesta);
            }
          });
        });
      }
      //this.selectedTemasItems = selected;
      let b = [];
      for (let tema of response) {
        let ntema: any = tema;
        (tema.estado == "Activo") ? b.push({ idTema: ntema.idTema, descripcion: ntema.descripcion }) : "";
      }
      this.ddTemasList = b;
      if (contenido != undefined) {
        contenido.forEach(element => {
          let obj = response.filter(rs => rs.idTema == element.idTema)[0];
          (obj != undefined) ? this.selectedTemasItems.push(obj) : "";
        });
      }
      this.form.get("temas").setValue(this.selectedTemasItems);

    });
  }

  loadfileorlink(contenido) {
    let file: any = document.getElementById('file');
    this.file.inputfiles(file);
    this.file.inputlink();
    this.file.firstloadfile = true;

    let ruta = contenido.ruta;
    let TipoContenido = contenido.TipoContenido.toUpperCase();
    if (TipoContenido == "ARCHIVO") {
      this.file.active("Archivo");
      this.file.fileLoadedByDefault = true;
      let name = ruta.substring(ruta.lastIndexOf("-") + 1, ruta.length);
      this.file.namesfiles = name;
    } else {
      this.file.active("link");
      let link: any = document.querySelector("#link");
      link.value = ruta;
      this.file.fileLoadedByDefault = false;
    }
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

  save(event: Event) {
    event.preventDefault();
    try {
      if (this.form.valid && this.file.firstloadfile && this.noPermitirReenviarHastaObtenerRespuesta) {
        this.noPermitirReenviarHastaObtenerRespuesta = false;
        const contenido = this.form.value;
        contenido.descripcion = document.querySelector("#descripcion > div.ql-container.ql-snow > div.ql-editor").innerHTML;
        contenido.bibliotecas = (typeof (contenido.bibliotecas) === 'object') ? contenido.bibliotecas : [contenido.bibliotecas];
        contenido.id = this.contenido.idContenido;
        contenido.temas = [];
        this.selectedTemasItems.forEach((element) => {
          contenido.temas.push(element.idTema);
        });
        contenido.temas = [...new Set(contenido.temas)];

        contenido.micrositios = [];
        this.selectedMicrositiosItems.forEach((element) => {
          contenido.micrositios.push(element.idMicrositio);
        });
        contenido.micrositios = [...new Set(contenido.micrositios)];
        contenido.tipoContenido =
          this.file.fileenabled
            ? "Archivo"
            : "Enlace";
        let link: any = document.querySelector("#link");
        let Sfile: any = document.querySelector('#file');
        if (this.file.fileenabled) {
          contenido.ruta = (this.file.fileLoadedByDefault) ? this.contenido.ruta : Sfile.value;
        } else {
          contenido.ruta = link.value;
        }
        console.group("UPDATE");
        console.log(contenido);
        console.groupEnd();
        let formData: FormData = new FormData();
        formData.append("jsonContent", JSON.stringify(contenido));
        if (this.file.fileenabled && !this.file.fileLoadedByDefault) {
          formData.append("fileKey", this.fileToUpload, this.fileToUpload.name);
        }
        this.contenidoService
          .updateContent(contenido, formData)
          .subscribe((sitio) => {
            if (sitio.length < 1) {
              alert("Ha ocurrido un error, por favor contacte al administrador");
              this.modal.dismiss();
              return;
            }
            this.noPermitirReenviarHastaObtenerRespuesta = false;
            this.modal.close("Yes");
          });
      }
    } catch (error) {
      alert("Ha ocurrido un error, por favor contacte al administrador");
      this.noPermitirReenviarHastaObtenerRespuesta = false;
      this.modal.close("Yes");
    }

  }

  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
    }
    return rta;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
