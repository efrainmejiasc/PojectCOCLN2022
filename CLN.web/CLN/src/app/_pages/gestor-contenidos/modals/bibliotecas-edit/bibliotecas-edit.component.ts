import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { BibliotecaService } from "src/app/_services/gestor-contenidos/biblioteca.service";
import { Validaciones } from "src/app/_shared/utils/validaciones";

@Component({
  selector: "app-bibliotecas-edit",
  templateUrl: "./bibliotecas-edit.component.html",
  styleUrls: [
    "./../../shared/styles/modals.scss",
    "./bibliotecas-edit.component.scss",
  ],
})
export class BibliotecasEditComponent implements OnInit {
  sendedData; //data sended from the parent, in this case is 0, but is necesary to declare it
  tipoDefault: any;
  rolesDefault: any;
  biblioteca;

  form: FormGroup;
  formProperties = {
    nombre: {
      maxCaracteres: 150,
      validationMessages: {
        required: "El nombre es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (150)",
      },
      error: false,
    },
    descripcion: {
      maxCaracteres: 500,
      validationMessages: {
        required: "El nombre es requerido",
        maxlength: "Se alcanzó el máximo de caracters permitido (500)",
      },
      error: false,
    },
  };

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};
  tiposBiblioteca: any;

  constructor(
    public modal: NgbActiveModal,
    private bibliotecaService: BibliotecaService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.configRolesListSettings();
    this.fetchBiblioteca();
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  onSelectAll(items: any) {
    this.dropdownList.forEach((element) => this.selectedItems.push(element));
  }

  fetchRoles() {
    this.bibliotecaService.getRolesforList().subscribe((response) => {
      this.dropdownList = response;
      this.selectedItems = this.rolesDefault;
    });
  }

  fetchTipos() {
    this.bibliotecaService.getLibraryTypesforList().subscribe((response) => {
      console.log(response);
      this.tiposBiblioteca = response;
    });
  }

  public isDisabled: boolean = false;
  fetchBiblioteca() {
    this.bibliotecaService
      .getLibraryDetail(this.biblioteca.idBiblioteca)
      .subscribe((contenido: any) => {
        this.tipoDefault = contenido[0].tipo;
        this.rolesDefault = contenido[0].BibliotecaRol;
        this.fetchTipos();
        this.fetchRoles();
        if (contenido[0].cantidadContenidos > 0) {
          this.isDisabled = true;
          this.form.get('tipo').disable();
        }
      });
  }

  configRolesListSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "idRol",
      textField: "nombre",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 1,
      allowSearchFilter: true,
    };
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: [
        this.biblioteca.nombre,
        [
          Validators.required,
          Validators.maxLength(this.formProperties.nombre.maxCaracteres),
        ],
      ],
      descripcion: [
        this.biblioteca.descripcion,
        [
          Validators.required,
          Validators.maxLength(this.formProperties.descripcion.maxCaracteres),
        ],
      ],
      tipo: [this.biblioteca.tipo, [Validators.required]],
    });
  }

  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    console.log(rta);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
    }
    return rta;
  };

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const biblioteca = this.form.value;
      const idRols = [];
      this.selectedItems.forEach((usuario) => (idRols.filter(rls => rls == usuario.idRol).length == 0) ? idRols.push(usuario.idRol) : "");

      biblioteca.id = this.biblioteca.idBiblioteca;
      biblioteca.roles = idRols;
      biblioteca.tipo = this.form.get('tipo').value;
      this.bibliotecaService.updateLibrary(biblioteca).subscribe((response) => {
        this.modal.close("Yes");
      });
    }
  }
}
