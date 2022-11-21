import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { groups } from 'src/app/_model/roles/groups.model';
import { permits } from 'src/app/_model/roles/permits.model';
import { GestionarRolUsuariosComponent } from '../gestionar-rol-usuarios/gestionar-rol-usuarios.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { rolFetch } from 'src/app/_model/roles/rolFetch.model';
import { createRol } from 'src/app/_model/roles/createRol.model';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';
@Component({
  selector: "app-rol",
  templateUrl: "./rol.component.html",
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    "./rol.component.scss",
  ],
})
export class RolComponent implements OnInit {
  sendedData;
  dataReciber;
  public permits;
  form: FormGroup;
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
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private rolesService: GestorRolesService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.maxLength(this.formProperties.nombre.maxCaracteres),],],
      grupos: [null, [Validators.required]], descripcion: ["", [Validators.required, Validators.maxLength(this.formProperties.descripcion.maxCaracteres),],],
    });
    this.fetchGroups();
  }
  public listGroups: Array<groups> = [];
  public listGroupsBackup: Array<groups> = [];
  public listGroupsSelected: Array<groups> = [];
  public listGroupsToSend: Array<number> = [];
  private fetchGroups() {
    this.rolesService.getGroupsforList()
      .subscribe(groups => {
        this.listGroups = groups;
        this.listGroupsBackup = new Array<groups>();
        this.listGroupsBackup = groups;
        if (this.dataReciber != undefined) {
          this.RolEdit = JSON.parse(this.dataReciber)
          if (this.RolEdit.idEstado == 5) {
            this.fetchPermits(true);
          } else {
            this.fetchPermits(false);
          }
        } else {
          this.fetchPermits(false);
        }
      })
  }
  //Fetch groups List from Backend

  public listPermits: Array<permits> = [];
  protected micrositioPermits: permits = null;
  public fetchPermits(isAdmin: boolean) {
    this.rolesService.getPermitsforList(isAdmin)
      .subscribe(permits => {
        //Adding permits to Reactive Form
        permits.forEach(permitsArray => {
          var typeNewFieldMaster: string = "master" + permitsArray.id;
          this.form.addControl(typeNewFieldMaster, new FormControl({ value: false, disabled: isAdmin }));
          if (permitsArray.hijos != undefined) {
            permitsArray.hijos.forEach(permitsListArray => {
              if (!permitsListArray.asignadoExclusivo) { }
              var typeNewFieldBody: string = "body" + permitsListArray.id;
              this.form.addControl(typeNewFieldBody, new FormControl({ value: false, disabled: isAdmin }));
              (permitsListArray.asignadoExclusivo) ? this.form.get(typeNewFieldBody).disable() : "";
            });
          }
        })
        this.listPermits = permits;
        this.verifyEditWorker();
      })
  }
  //Edit Rol Worker
  private RolEdit: any = null;
  public adminView: boolean = false;
  private verifyEditWorker() {
    if (this.dataReciber != undefined && this.dataReciber != null) {
      this.form.get("nombre").setValue(this.RolEdit.rol);
      if (this.RolEdit.idEstado == 5) {
        this.adminView = true;
        var groupMen: groups = new groups();
        groupMen.id = 999;
        groupMen.nombre = "Admin MEN";
        this.listGroups.push(groupMen);
        this.form.get("grupos").setValue(999);
        this.form.get("descripcion").disable();
        this.form.get("grupos").disable();
        this.form.get("nombre").disable();
      } else {
        this.form.get("grupos").setValue(this.listGroups.filter(grp => grp.nombre == this.RolEdit.grupo)[0].id);
      }
      this.form.get("descripcion").setValue(this.RolEdit.descripcion);

      this.buildEditInformation();
    }
  }
  private editingRol: boolean = false;
  private rolSelect: createRol;
  private buildEditInformation() {
    this.listGroupsSelected;
    this.listGroupsToSend = [];
    this.numberArray = [];
    this.rolesService.getRolDetail(this.RolEdit.id)
      .subscribe(rol => {
        this.editingRol = true;
        this.rolSelect = new createRol();
        this.rolSelect = rol[0];
        let index = 0;
        this.rolSelect.grupos.forEach(groups => {
          if (index > 0) {
            var group = this.listGroups.filter(rs => rs["id"] == groups["id"])[0];
            if (group != null) {
              this.listGroupsSelected.push(group);
            }
          }
          index++;
        })
        if (this.rolSelect.permisos != undefined) {
          this.rolSelect.permisos.forEach(permitsMaster => {
            this.numberArray.push(permitsMaster["id"]);
            if (this.form.get("body" + permitsMaster["id"]) != null) {
              this.form.get("body" + permitsMaster["id"]).setValue(true);
            } else {
              if (this.form.get("master" + permitsMaster["id"]) != null) {
                var canUse = (this.listPermits.filter(permit => permit.id == permitsMaster["id"])[0].hijos) ? this.listPermits.filter(permit => permit.id == permitsMaster["id"])[0].hijos.filter(hijos => hijos.asignadoExclusivo == "true")[0] : undefined;
                this.form.get("master" + permitsMaster["id"]).setValue(true);
                if (canUse) {
                  (this.rolSelect.permisos.filter(permit => permit["id"] == canUse.id)[0]) ? this.form.get("master" + permitsMaster["id"]).disable() : "";
                }
              }
            }
          });

        }
      })
  }
  //Activa o Inactiva los checkbox que esten relacionados en un grupo
  public activatePermitsByGroup(value) {
    if (value.id == 5) {
      this.listGroupsSelected = [];
    }
    if (value.hijos != undefined) {
      if (this.form.get("master" + value.id).value == true) {
        (!this.arrayReader.filter(arr => arr == value.id)[0]) ? this.arrayReader.push(value.id) : "";
        value.hijos.forEach(permitsContent => {
          (!permitsContent.asignadoExclusivo) ? this.form.get("body" + permitsContent.id).setValue(true) : "";
        });
      } else {
        var indexOf = this.arrayReader.map(function (e) { return e; }).indexOf(value.id);
        this.arrayReader.splice(indexOf, 1)
        value.hijos.forEach(permitsContent => {
          this.form.get("body" + permitsContent.id).setValue(false);
        });
      }
    } else {
      if (this.form.get("master" + value.id).value == true) {
        (!this.arrayReader.filter(arr => arr == value.id)[0]) ? this.arrayReader.push(value.id) : "";
      } else {
        var indexOf = this.arrayReader.map(function (e) { return e; }).indexOf(value.id);
        this.arrayReader.splice(indexOf, 1)
      }
    }
    this.verifyTypeRol(value)
  }
  public arrayReader: Array<number> = [];
  @Output() evento = new EventEmitter<string>();
  public verifyPermitsByGroup(permits) {
    var cont = 0;
    permits.hijos.forEach(permits => {
      if (this.form.get("body" + permits.id).value == true) {
        cont++;
      }
    });
    if ((cont) > 0) {
      this.form.get("master" + permits.id).setValue(true);
      (!this.arrayReader.filter(arr => arr == permits.id)[0]) ? this.arrayReader.push(permits.id) : "";
    } else {
      this.form.get("master" + permits.id).setValue(false);
      var indexOf = this.arrayReader.map(function (e) { return e; }).indexOf(permits.id);
      this.arrayReader.splice(indexOf, 1)
      if (permits.id == 5) {
        this.listGroupsSelected = [];
      }
    }
    this.verifyTypeRol(permits);
  }
  //Verify if need Group rol access
  public verifyTypeRol(permits) {
    if (permits.id == 5) {
      if (this.listGroupsSelected.length < 1) {
        if (this.form.get("master" + permits.id).value == true) {
          this.openGestionUsers();
        }
      }
    }
  }

  openGestionUsers() {
    event.preventDefault();
    const dialogRef = this.modalService.open(GestionarRolUsuariosComponent, {
      backdrop: false,
      keyboard: false,
      windowClass: 'customRoles'
    });
    dialogRef.componentInstance.sendedData = "Gestionar Usuarios";
    dialogRef.componentInstance.typeData = "groupofroles";
    dialogRef.componentInstance.textData = `Seleccionar que grupos de roles podrá gestionar el rol ${this.form.get('nombre').value}. `;
    dialogRef.componentInstance.groupsList = this.listGroupsBackup;
    dialogRef.componentInstance.groupSelected = this.listGroupsBackup.filter(lgrp => lgrp.id == this.form.get("grupos").value)[0];
    if (this.listGroupsSelected.length > 0) {
      dialogRef.componentInstance.listGroup = this.listGroupsSelected;
    }
    dialogRef.result.then((result) => {
      this.listGroupsSelected = [];
      this.listGroupsSelected = result;
    },
      (cancel) => { })
  }
  public descriptionInvalid: boolean = false;
  public nameInvalid: boolean = false;
  public groupInvalid: boolean = false;
  public permitsInvalid: boolean = false;
  public alertPermits: String = "";
  public disabledButton: boolean = false;
  @ViewChild('description', { static: false }) description: ElementRef;
  @ViewChild('name', { static: false }) name: ElementRef;
  @ViewChild('group', { static: false }) group: ElementRef;
  private numberArray: Array<number> = [];
  public activeValidator = false;
  save(e) {
    const formReader = this.form.value;
    this.numberArray = [];
    this.listGroupsToSend = [];
    this.listPermits.forEach(permits => {
      if (this.form.get("master" + permits.id).value == true) {
        this.numberArray.push(permits.id)
        if (permits.hijos != undefined) {
          permits.hijos.forEach(childs => {
            if (this.form.get("body" + childs.id).value == true) {
              this.numberArray.push(childs.id)
            }
          })
        }
      }
    });
    this.listGroupsToSend.push(formReader.grupos);
    this.listGroupsSelected.forEach(select => {
      this.listGroupsToSend.push(select.id);
    })
    /*if (this.numberArray.length < 1) {
      this.permitsInvalid = true;
      
    }*/
    if (this.form.valid && this.numberArray.length > 0) {
      if (!this.disabledButton) {
        this.disabledButton = true;
        if (this.descriptionInvalid == false && this.nameInvalid == false && this.groupInvalid == false && this.permitsInvalid == false) {
          if (this.editingRol == true) {
            if (this.form.get("nombre").value.toLowerCase() == this.RolEdit.rol.toLowerCase() && this.form.get("grupos").value == this.listGroups.filter(grp => grp.nombre == this.RolEdit.grupo)[0].id) {
              /*&& this.form.get("grupos").value.toLowerCase() == this.RolEdit.*/
              this.buildAndSend();
            } else {
              this.fetchRolExist();
            }
          } else {
            this.fetchRolExist();
          }
        }
      }
    } else {
      this.activeValidator = true;
      (this.form.get("descripcion").invalid) ? this.description.nativeElement.placeholder = 'Por favor ingrese información en este campo' : "";
      (this.form.get("nombre").invalid) ? this.name.nativeElement.placeholder = 'Por favor ingrese información en este campo' : "";
      this.alertPermits = "Debe elegir al menos un permiso";
    }
  }
  public fetchRolExist() {
    const formReader = this.form.value;
    var fetchRol: rolFetch = new rolFetch();
    fetchRol.nombre = formReader.nombre;
    fetchRol.grupo = this.listGroups.filter(grp => grp.id == formReader.grupos)[0].id + "";
    this.rolesService.fetchRolExist(fetchRol)
      .subscribe(result => {
        if (result.length == 0) {
          this.buildAndSend();
        } else {
          this.disabledButton = false;
          const dialogRef = this.modalService.open(AlertModalComponent, {
            backdrop: false,
            keyboard: false,
          });
          dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>Por favor modifique el nombre ingresado pues ya existe otro rol con este mismo nombre en el grupo de roles seleccionado.</p>";
        }
      })
  }
  public buildAndSend() {
    const formReader = this.form.value;
    if (this.editingRol == true) {
      var rolToUpdate: createRol = new createRol();
      rolToUpdate.id = this.rolSelect.id;
      rolToUpdate.Estado = this.rolSelect.Estado;
      rolToUpdate.idEstado = this.rolSelect.idEstado;
      rolToUpdate.descripcion = formReader.descripcion;
      rolToUpdate.nombre = formReader.nombre;
      rolToUpdate.permisos = this.numberArray;
      rolToUpdate.grupos = this.listGroupsToSend;
      this.rolesService.updateRol(rolToUpdate)
        .subscribe(data => {
          var back: Array<any> = [rolToUpdate.nombre, false];
          this.modal.close(back);
        })
    } else {
      var rolToCreate: createRol = new createRol();
      rolToCreate.descripcion = formReader.descripcion;
      rolToCreate.nombre = formReader.nombre;
      rolToCreate.permisos = this.numberArray;
      rolToCreate.grupos = this.listGroupsToSend;
      this.rolesService.saveRol(rolToCreate)
        .subscribe(data => {
          this.modal.close();
        })
    }
  }
  public validationOut(type: number) {
    switch (type) {
      case 1:
        if (this.descriptionInvalid == true) {
          if (this.form.get("descripcion").value.length > 0) {
            this.descriptionInvalid = false;
            this.description.nativeElement.placeholder = '';
          }
        }
        return;
      case 2:
        if (this.nameInvalid == true) {
          if (this.form.get("nombre").value.length > 0) {
            this.nameInvalid = false;
            this.name.nativeElement.placeholder = '';
          }
        }
        return;
      case 3:
        if (this.listGroupsSelected.length > 0) {
          this.listGroupsSelected = [];
          this.listPermits.forEach(permitsContent => {
            if (permitsContent.id == 5) {
              this.form.get("master" + permitsContent.id).setValue(false);
              permitsContent.hijos.forEach(child => {
                this.form.get("body" + child.id).setValue(false);
              })
            }
          })
        }
        if (this.groupInvalid == true) {
          if (this.form.get("grupos").valid == true) {
            this.listPermits.forEach(permitsArray => {
            });
            this.groupInvalid = false;
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
