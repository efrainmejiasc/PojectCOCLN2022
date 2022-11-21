import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createRol } from 'src/app/_model/roles/createRol.model';
import { rolGroup } from 'src/app/_model/roles/rolGroup.model';
import { GestorGruposService } from 'src/app/_services/gestor-roles/gestor-grupos.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-gestionar-grupo-rol',
  templateUrl: './gestionar-grupo-rol.component.html',
  styleUrls: [
    './gestionar-grupo-rol.component.scss',
    "../../../../_shared/styles/modals.scss"
  ]
})
export class GestionarGrupoRolComponent implements OnInit {
  sendedData;
  typeData;
  dataReceive;
  form: FormGroup;
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private gruposService: GestorGruposService,
  ) { }
  formProperties = {
    descripcion: {
      maxCaracteres: 100,
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
    nombre: {
      maxCaracteres: 50,
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
  ngOnInit() {
    this.builderForm();
    this.verifyEditWorker();
  }

  private builderForm() {
    this.form = this.formBuilder.group({
      'nombre': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.nombre.maxCaracteres)]),
      'descripcion': new FormControl('', [Validators.required, Validators.maxLength(this.formProperties.descripcion.maxCaracteres)])
    })
  }
  private editingGroup: boolean = null;
  private groupSelect: rolGroup;
  public adminView: boolean = false;
  private verifyEditWorker() {
    if (this.dataReceive != undefined && this.dataReceive != null) {
      this.editingGroup = true;
      this.groupSelect = JSON.parse(this.dataReceive)
      this.form.get("nombre").setValue(this.groupSelect.grupo);
      this.form.get("descripcion").setValue(this.groupSelect.descripcion);
      if (this.groupSelect.idEstado == 5) {
        this.adminView = true;
        this.form.get("nombre").disable();
        this.form.get("descripcion").disable();
      }
    }
  }
  public descriptionInvalid: boolean = false;
  public nameInvalid: boolean = false;
  public disabledButton: boolean = false;
  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('name', { static: false }) name: ElementRef;
  save(e) {
    if (this.form.get("descripcion").valid == false) {
      this.descriptionInvalid = true;
      this.description.nativeElement.placeholder = 'Por favor ingrese información en este campo';
    }
    if (this.form.get("nombre").valid == false) {
      this.nameInvalid = true;
      this.name.nativeElement.placeholder = 'Por favor ingrese información en este campo';
    } if (!this.disabledButton) {
      this.disabledButton = true;
      if (this.descriptionInvalid == false && this.nameInvalid == false) {
        if (this.editingGroup == true) {
          if (this.form.get("nombre").value == this.groupSelect.grupo) {
            if (this.form.get("descripcion").value != this.groupSelect.descripcion) {
              this.buildAndSend();
            }
          } else {
            this.fetchRolExist()
          }
        } else {
          this.fetchRolExist()
        }
      }
    }
  }
  public fetchRolExist() {
    const formReader = this.form.value;
    var fetchRol: rolGroup = new rolGroup();
    fetchRol.grupo = formReader.nombre;
    this.gruposService.fetchGroupExist(fetchRol)
      .subscribe(result => {
        if (result.length == 0) {
          this.buildAndSend();
        } else {
          this.disabledButton = false;
          const dialogRef = this.modalService.open(AlertModalComponent, {
            backdrop: false,
            keyboard: false,
            centered: true
          });
          dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>Por favor modifique el nombre ingresado pues ya existe en el sistema otro grupo con este mismo nombre</p>";
        }
      })
  }
  public buildAndSend() {
    const formReader = this.form.value;
    if (this.editingGroup == true) {
      var rolToUpdate: rolGroup = new rolGroup();
      rolToUpdate.id = this.groupSelect.id;
      rolToUpdate.grupo = formReader.nombre;
      rolToUpdate.descripcion = formReader.descripcion;
      this.gruposService.updateGroup(rolToUpdate)
        .subscribe(data => {
          var back: Array<any> = [rolToUpdate.grupo, false];
          this.modal.close(back);
        })
    } else {
      var rolToCreate: rolGroup = new rolGroup();
      rolToCreate.descripcion = formReader.descripcion;
      rolToCreate.grupo = formReader.nombre;
      this.gruposService.saveGroup(rolToCreate)
        .subscribe(data => {
          this.modal.close(rolToCreate.grupo);
        })
    }
  }
  public validationOut(type: number) {
    switch (type) {
      case 1:
        if (this.nameInvalid == true) {
          if (this.form.get("nombre").value.length > 0) {
            this.nameInvalid = false;
            this.name.nativeElement.placeholder = '';
          }
        }
        return;
      case 2:
        if (this.descriptionInvalid == true) {
          if (this.form.get("descripcion").value.length > 0) {
            this.descriptionInvalid = false;
            this.description.nativeElement.placeholder = '';
          }
        }
        return;
    }
  }
  patternValidation(event) {
    if (event.key != undefined) {
      var phoneRGEX = /^[A-Za-z0-9\s.:;,áéíóú]+$/g;
      return (phoneRGEX.test(event.key)) ? true : false;
    } else {
      return false;
    }
  }

  patternValidationPaste(event) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    var phoneRGEX = /^[A-Za-z0-9\s.:;,áéíóú]+$/g;
    return (phoneRGEX.test(pastedText)) ? true : false;
  }
}
