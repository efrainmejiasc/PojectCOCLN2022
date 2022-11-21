import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { user } from 'src/app/_model/user-data/user.module';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthenticationService } from 'src/app/_services/_compras-publicas/authentication.service';
import { fetchExistence } from 'src/app/_services/gestion-usuarios/fetchExistence.model';
import { GestionUsuariosService } from 'src/app/_services/gestion-usuarios/gestion-usuarios.service';
import { GestorRolesService } from 'src/app/_services/gestor-roles/gestor-roles.service';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { PermitsviewComponent } from '../permitsview/permitsview.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [
    "../../../../_shared/styles/tables.scss",
    "../../../../_shared/styles/modals.scss",
    './create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public form: FormGroup;
  userSelect;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private rolesService: GestorRolesService,
    private gestioUsuarioService: GestionUsuariosService,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.buildForm();
  }
  public userlogged: any = null;
  public adminText: String = "Crear";
  public canEditSecretarias: boolean = false;
  private userPermits() {
    this.auth.actualUser$.subscribe(data => {
      this.userlogged = data;
      console.log(this.userlogged)
      if (this.userlogged.idRol == 1) {
        this.getSecretarias();
      } else {
        this.userEditing();
      }
    });
  }
  public secretariasList: Array<any> = [];
  getSecretarias() {
    this.adminService.getSecretarias().subscribe(result => {
      this.secretariasList = result;
      this.form.addControl("secretaria", new FormControl("", [Validators.required]));
      this.canEditSecretarias = true;
      this.userEditing();
    });
  }

  formProperties = {
    validarone: {
      maxCaracteres: 50,
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
    validartwo: {
      maxCaracteres: 10,
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

  public buildForm() {
    this.form = this.formBuilder.group({
      "firstName": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
      "secondName": new FormControl("", [Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
      "firstLastName": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
      "secondLastName": new FormControl("", [Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
      "documentType": new FormControl("", [Validators.required]),
      "identify": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validartwo.maxCaracteres)]),
      "sex": new FormControl("", [Validators.required]),
      "phone": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validartwo.maxCaracteres)]),
      "rol": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email, Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
      "cargo": new FormControl("", [Validators.required, Validators.maxLength(this.formProperties.validarone.maxCaracteres)]),
    })
    this.getRoles();
  }

  public userEditing() {
    setTimeout(() => {
      if (this.userSelect != undefined) {
        this.adminText = "Editar";
        this.userSelect = JSON.parse(this.userSelect);
        this.form.get("firstName").setValue(this.userSelect.primerNombre);
        this.form.get("secondName").setValue(this.userSelect.segundoNombre);
        this.form.get("firstLastName").setValue(this.userSelect.primerApellido);
        this.form.get("secondLastName").setValue(this.userSelect.segundoApellido);
        this.form.get("documentType").setValue(this.userSelect.tipoDocumento);
        this.form.get("identify").setValue(this.userSelect.numeroIdentificacion);
        this.form.get("sex").setValue(this.userSelect.genero);
        this.form.get("phone").setValue(this.userSelect.celular);
        this.form.get("rol").setValue(this.userSelect.idRol);
        this.form.get("email").setValue(this.userSelect.correoElectronico);
        this.form.get("cargo").setValue(this.userSelect.cargo);
        if (this.canEditSecretarias) {
          this.form.get("secretaria").setValue(this.userSelect.idSecretaria);
        }
        const formReader = this.form.value;
      }
    }, 1);
  }

  @Output() close = new EventEmitter<any>();
  public closeCreate() {
    this.form.reset()
    this.close.emit();
  }
  openDialog() {
    if (this.form.get("rol").valid == true) {
      const formReader = this.form.value;
      const dialogRef = this.modalService.open(PermitsviewComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      var arrAny: Array<any> = ["Permisos", this.masterFilter.filter(master => master.idRol == formReader.rol)[0].rol]
      dialogRef.componentInstance.sendedData = arrAny;
      dialogRef.componentInstance.idSelected = formReader.rol;
      dialogRef.result.then((yes) => {

      })
    }
  }
  private masterFilter: Array<any>;
  public getRoles() {
    this.rolesService.getRolesLite()
      .subscribe(roles => {
        this.masterFilter = roles;
        this.userPermits();
      })
  }
  public activeValidator: boolean = false;
  public disabledButton: boolean = false;
  @ViewChild('firstname', { static: false }) firstname: ElementRef;
  @ViewChild('firstLastname', { static: false }) firstLastname: ElementRef;
  @ViewChild('identifyNumber', { static: false }) identifyNumber: ElementRef;
  @ViewChild('phoneNumber', { static: false }) phoneNumber: ElementRef;
  @ViewChild('email', { static: false }) email: ElementRef;
  @ViewChild('cargo', { static: false }) cargo: ElementRef;
  save($event) {
    if (this.form.valid == false) {
      (this.form.get("firstName").valid) ? "" : this.firstname.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("firstLastName").valid) ? "" : this.firstLastname.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("identify").valid) ? "" : this.identifyNumber.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("phone").valid) ? "" : this.phoneNumber.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("email").valid) ? "" : this.email.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      (this.form.get("cargo").valid) ? "" : this.cargo.nativeElement.placeholder = 'Por favor ingrese información en este campo';;
      this.activeValidator = true;
    } else {
      if (!this.disabledButton) {
        this.disabledButton = true;
        if (this.userSelect != undefined) {
          var actualUser = JSON.parse(localStorage.getItem("actualUser"));
          const formReader = this.form.value;
          if (this.userSelect.correoElectronico != formReader.email) {
            this.fetchRolExist();
          } else {
            this.buildAndSend();
          }
        } else {
          this.fetchRolExist();
        }
      }
    }
  }

  public fetchRolExist() {
    const formReader = this.form.value;
    var fetchRol: fetchExistence = new fetchExistence();
    fetchRol.correoElectronico = formReader.email;
    fetchRol.numeroIdentificacion = formReader.identify;
    this.gestioUsuarioService.fetchUserExistence(fetchRol)
      .subscribe(result => {
        if (result.length == 0) {
          this.buildAndSend();
        } else {
          this.disabledButton = false;
          const dialogRef = this.modalService.open(AlertModalComponent, {
            backdrop: false,
            keyboard: false,
          });
          dialogRef.componentInstance.message = "<p class='mt-2 py-4 col-sm-12 text-center'>Por favor modifique el correo electrónico o número de documento ingresado pues ya existe otro usuario con esta misma información.</p>";
        }
      })
  }
  private editingRol: boolean = false;
  public buildAndSend() {
    this.spinner.show();
    var actualUser = JSON.parse(localStorage.getItem("actualUser"));
    if (this.userSelect != undefined) {
      const formReader = this.form.value;
      var rolToUpdate: user = new user();
      rolToUpdate.idUsuario = this.userSelect.idUsuario;
      rolToUpdate.primerNombre = formReader.firstName;
      rolToUpdate.segundoNombre = formReader.secondName;
      rolToUpdate.primerApellido = formReader.firstLastName;
      rolToUpdate.segundoApellido = formReader.secondLastName;
      rolToUpdate.correoElectronico = formReader.email;
      rolToUpdate.idRol = JSON.parse(formReader.rol);
      rolToUpdate.celular = formReader.phone;
      rolToUpdate.genero = formReader.sex;
      rolToUpdate.tipoDocumento = formReader.documentType;
      rolToUpdate.numeroIdentificacion = formReader.identify;
      if (this.canEditSecretarias) {
        rolToUpdate.idSecretaria = formReader.secretaria;
      } else {
        rolToUpdate.idSecretaria = this.userSelect.idSecretaria;
      }
      rolToUpdate.cargo = formReader.cargo;
      this.gestioUsuarioService.updateUser(rolToUpdate)
        .subscribe(data => {
          var back: Array<any> = ["update", true];
          this.spinner.hide();
          this.modal.close(back);
        })
    } else {
      const formReader = this.form.value;
      var rolToCreate: user = new user();
      rolToCreate.primerNombre = formReader.firstName;
      rolToCreate.segundoNombre = formReader.secondName;
      rolToCreate.primerApellido = formReader.firstLastName;
      rolToCreate.segundoApellido = formReader.secondLastName;
      rolToCreate.correoElectronico = formReader.email;
      rolToCreate.idRol = JSON.parse(formReader.rol);
      rolToCreate.celular = formReader.phone;
      rolToCreate.genero = formReader.sex;
      rolToCreate.tipoDocumento = formReader.documentType;
      rolToCreate.numeroIdentificacion = formReader.identify;
      if (this.canEditSecretarias) {
        rolToCreate.idSecretaria = formReader.secretaria;
      } else {
        rolToCreate.idSecretaria = actualUser.idSecretaria;
      }
      rolToCreate.cargo = formReader.cargo;
      this.gestioUsuarioService.saveUser(rolToCreate)
        .subscribe(data => {
          var back: Array<any> = ["create", true];
          this.spinner.hide();
          this.modal.close(back);
        })
    }
  }

  public numberValidate(event) {
    if (event.key >= 0 && event.key != " ") {
      return true;
    } else {
      return false;
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

  public validateEntityRol() {
    if (this.canEditSecretarias) {
      if (this.form.get("rol").value != "" && this.form.get("secretaria").value != "") {
        this.getUserRol(this.form.get("rol").value, this.form.get("secretaria").value);
      }
    } else {
      if (this.form.get("rol").value != "") {
        var actualUser = JSON.parse(localStorage.getItem("actualUser"));
        this.getUserRol(this.form.get("rol").value, actualUser.idSecretaria);
      }
    }
  }
  private isBlockedBySecretaria: boolean = false;
  private getUserRol(rol, secretaria) {
    this.gestioUsuarioService.getUserRolExistencebyEntity(rol, secretaria)
      .subscribe(data => {
        this.isBlockedBySecretaria = false;
        if (data.length > 0) {
          this.isBlockedBySecretaria = true;
          const dialogRef = this.modalService.open(AlertModalComponent, {
            backdrop: false,
            keyboard: false,
          });
          var actualUser = JSON.parse(localStorage.getItem("actualUser"));
          var secretria = (this.form.get("secretaria") != null) ? this.secretariasList.filter(secre => secre.idSecretaria == this.form.get("secretaria").value)[0].entidadTerritorial : actualUser.secretaria;
          dialogRef.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>No es posible asignar al nuevo usuario el rol seleccionado, pues ya está asignado al usuario ${data[0]['primerNombre']} ${data[0]['primerApellido']} en la secretaría ${secretria}</p>`;
          (this.form.get("secretaria") != null) ? this.form.get("secretaria").reset() : this.form.get("rol").reset();
        }
      });
  }
}
