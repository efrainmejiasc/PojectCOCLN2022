import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Validaciones } from 'src/app/_shared/utils/validaciones';
import { BibliotecaService } from 'src/app/_services/gestor-contenidos/biblioteca.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';


@Component({
  selector: 'app-bibliotecas-form',
  templateUrl: './bibliotecas-form.component.html',
  styleUrls: [
    './../../shared/styles/modals.scss',
    './bibliotecas-form.component.scss',
  ],
})
export class BibliotecasFormComponent implements OnInit {
  sendedData; //data sended from the parent, in this case is 0, but is necesary to declare it
  form: FormGroup;
  formProperties = {
    nombre: {
      maxCaracteres: 150,
      validationMessages: {
        required: 'El nombre es requerido',
        maxlength: 'Se alcanzó el máximo de caracters permitido (150)',
      },
      error: false,
    },
    descripcion: {
      maxCaracteres: 500,
      validationMessages: {
        required: 'El nombre es requerido',
        maxlength: 'Se alcanzó el máximo de caracters permitido (500)',
      },
      error: false,
    },
  };

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  tiposBiblioteca: any = [];

  constructor(
    public modal: NgbActiveModal,
    private bibliotecaService: BibliotecaService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.fetchRoles();
    this.fetchTipos();
    this.configRolesListSettings();
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);
  }

  onSelectAll(items: any) {
    this.selectedItems = this.dropdownList;
  }

  fetchRoles() {
    this.bibliotecaService.getRolesforList()
      .subscribe(response => {
        response = [... new Set(response)];
        this.dropdownList = response;
      });
  }
  fetchTipos() {
    this.bibliotecaService.getLibraryTypesforList()
      .subscribe(response => {
        this.tiposBiblioteca = response;
      });
  }

  configRolesListSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'idRol',
      textField: 'nombre',
      selectAllText: 'Todos Seleccionados',
      unSelectAllText: 'ninguno seleccionado',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.nombre.maxCaracteres),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.formProperties.descripcion.maxCaracteres),
        ],
      ],
      tipo: [null, [Validators.required]],
    });
  }

  validar = (propiedad) => {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
    }
    return rta;
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const biblioteca = this.form.value;
      biblioteca.roles = [];
      this.selectedItems.forEach(element => {
       // biblioteca.roles.push(element.idRol);
        (biblioteca.roles.filter(rls => rls == element.idRol).length == 0) ? biblioteca.roles.push(element.idRol) : "";
      });
      biblioteca.roles = [...new Set(biblioteca.roles)];
      this.bibliotecaService.createLibrary(biblioteca)
        .subscribe(response => {
          this.modal.close('Yes');
          let buttons: Array<model> = [];
          let first = "La biblioteca ";
          let bold = biblioteca.nombre;
          let third = "ha sido creada correctamente";
          buttons[0] = {
            class: "modal-button modal-button-primary",
            messsage: "Cerrar",
            action: "cancel",
          };
          this.render(first, bold, third, buttons);
        });
    }
  }

  render(first: string, bold: string, third: string, buttons: Array<model>): void {
    const ref = this.modalService.open(ConfirmacionComponent, {
      size: "lg",
      centered: true,
    });
    ref.componentInstance.message[0] = first;
    ref.componentInstance.message[1] = bold;
    ref.componentInstance.message[2] = third;
    ref.componentInstance.buttons = buttons;

    ref.result.then(
      (yes) => { },
      (cancel) => { }
    );
  }
}

class model {
  class: string;
  messsage: string;
  action: string;
}