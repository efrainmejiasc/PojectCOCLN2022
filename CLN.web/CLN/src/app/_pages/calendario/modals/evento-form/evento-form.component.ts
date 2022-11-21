import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorFn } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { format, addDays } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';

// Services
import { CalendarioService } from 'src/app/_services/calendario/calendario.service';
import { MicrositiosService } from 'src/app/_services/micrositios/micrositios.service';
import { BibliotecaService } from 'src/app/_services/gestor-contenidos/biblioteca.service';
import { TemasService } from 'src/app/_services/gestor-contenidos/temas.service';
import { SecretariasService } from 'src/app/_services/secretarias/secretarias.service';
import { ContenidoService } from 'src/app/_services/gestor-contenidos/contenido.service';
import { TipoEventoService } from 'src/app/_services/calendario/tipo-evento.service';

// Components
import { ContenidoListComponent } from '../contenido-list/contenido-list.component';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

// Utils
import { Validaciones } from 'src/app/_shared/utils/validaciones';
import { FileLocal } from 'src/app/_pages/gestor-contenidos/utils/file-local';
import { NotificacionBuild, TipoMensaje } from '../../utils/notificacion-build';
import { DateAndTime } from '../../utils/date-and-time';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: [
    './../../../../_shared/styles/modals.scss',
    './../../../gestor-contenidos/shared/styles/tables.scss',
    './evento-form.component.scss'
  ]
})
export class EventoFormComponent implements OnInit {

  //#region Atributos

  disabledWhenSubmit = false;
  id = '0';
  form: FormGroup;
  formProperties = {
    nombre: {
      maxCaracteres: 100,
      validationMessages: {
        required: 'El nombre es requerido',
      },
      error: false,
    },
    descripcion: {
      maxCaracteres: 200,
      validationMessages: {
        required: 'La descripción es requerida',
      },
      error: false,
    },
    fechaEvento: {
      validationMessages: {
        required: 'La fecha es requerida',
        fecha_invalida: 'La fecha no está dentro de los días permitidos',
      },
      error: false,
    },
    horaInicio: {
      validationMessages: {
        hora_invalida: 'La hora no está dentro de los tiempos permitidos',
        rango_invalido: 'La hora inicial debe ser menor que la hora de finalización',
      },
      error: false,
    },
    horaFin: {
      validationMessages: {
        hora_invalida: 'La hora no está dentro de los tiempos permitidos',
        rango_invalido: 'La hora final debe ser mayor que la hora de incio',
      },
      error: false,
    },
    fechaInicioRepetir: {
      validationMessages: {
        required: 'La fecha es requerida',
        fecha_invalida: 'La fecha no está dentro de los días permitidos',
        rango_invalido: 'La fecha inicial debe ser menor que la fecha de finalización',
      },
      error: false,
    },
    fechaFinRepetir: {
      validationMessages: {
        required: 'La fecha es requerida',
        fecha_invalida: 'La fecha no está dentro de los días permitidos',
        rango_invalido: 'La fecha final debe ser mayor que la fecha de incio',
      },
      error: false,
    },
    direccion: {
      validationMessages: {
        required: 'El enlace o dirección es requerido',
      },
      error: false,
    },
    idTipoEvento: {
      validationMessages: {
        required: 'El tipo de evento es requerido',
      },
      error: false,
    },
    micrositios: {
      validationMessages: {
        required: 'Debe escoger como minimo un micrositio',
      },
      error: false,
    },
    secretarias: {
      validationMessages: {
        required: 'Debe escoger como minimo una secretaria',
      },
      error: false,
    },
    usuariosInvitados: {
      validationMessages: {
        required: 'Debe escoger como minimo un rol',
      },
      error: false,
    },
  };

  horamin = '7:00 am';
  horamax = '9:00 pm';
  fechamax: Date;
  fecha: Date;

  todoeldia = false;
  privado = false;
  repetir = false;

  dias = [
    { codigo: 'L', nombre: 'Lunes', value: 1, isChecked: false },
    { codigo: 'M', nombre: 'Martes', value: 2, isChecked: false },
    { codigo: 'M', nombre: 'Miercoles', value: 3, isChecked: false },
    { codigo: 'J', nombre: 'Jueves', value: 4, isChecked: false },
    { codigo: 'V', nombre: 'Viernes', value: 5, isChecked: false },
    { codigo: 'S', nombre: 'Sabado', value: 6, isChecked: false },
    { codigo: 'D', nombre: 'Domingo', value: 7, isChecked: false },
  ];

  frecuencias = ['Diaria', 'Semanal', 'Mensual', 'Personalizada'];

  secretarias: any[] = [];
  secretariasSelected: any[] = [];
  ddSecretariasSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'idSecretaria',
    textField: 'entidadTerritorial',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar'
  };

  roles: any[] = [];
  rolesSelected: any[] = [];
  ddRolesSettings = {
    singleSelection: false,
    idField: 'idRol',
    textField: 'nombre',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  temas: any[] = [];
  temasSelected: any[] = [];
  ddTemasSettings = {
    singleSelection: false,
    idField: 'idTema',
    textField: 'descripcion',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar'
  };

  micrositios: any[] = [];
  micrositiosSelected: any[] = [];
  ddMicrositiosSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'idMicrositio',
    textField: 'nombre',
    selectAllText: 'Todos Seleccionados',
    unSelectAllText: 'ninguno seleccionado',
    itemsShowLimit: 3,
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar'
  };

  esTipoEventoNuevo = false;
  tipoEventoNombre = '';
  tipoEventoColor = '#ffffff';
  tipoEventoError = false;
  tipoEventos: any[] = [];
  btnTipoEvento = false;

  hayContenidos = false;
  showFormContenido = false;
  contenido: any;
  contenidos: any[] = [];
  contenidosSelected: any[] = [];
  showContenido = false;
  contenidoTitulo = '';
  contenidoRuta = '';
  showOtraFuente = false;
  contenidoError = false;
  contenidoAdjuntoError = false;

  file: FileLocal = null;
  fileToUpload: File = null;

  nombreTipoEvento = '';

  secretariasEdit: any[] = [];
  rolEdit: any[] = [];

  msgSecretarias = false;
  msgRoles = false;
  secretariaDisabled = false;
  rolDisabled = false;

  btnContenido = false;

  //#endregion

  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal,
    private secretariasService: SecretariasService,
    private bibliotecaService: BibliotecaService,
    private temasService: TemasService,
    private contenidoService: ContenidoService,
    private micrositiosService: MicrositiosService,
    private calendarioService: CalendarioService,
    private tipoEventoService: TipoEventoService,
    private colorPickerService: ColorPickerService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.buildForm();
    this.file = new FileLocal();
  }

  ngOnInit() {
    this.fecha = new Date();
    this.fetchSecretarias();
    this.fetchRoles();
    this.fetchTipoEventos();
    this.fetchTemas();
    this.fetchMicrositios();
    this.getContent();
  }

  public disabledByOptions: boolean = false;
  getContent() {
    if (this.id !== '0') {
      this.calendarioService
        .getEventDetail(this.id.toString())
        .subscribe((response) => {
          this.form.patchValue(response[0]);
          this.privado = response[0].privado;
          this.repetir = response[0].repetir;
          this.form.controls.horaInicio.setValue(DateAndTime.convertTo12(response[0].horaInicio));
          this.form.controls.horaFin.setValue(DateAndTime.convertTo12(response[0].horaFin));
          this.form.controls.idTipoEvento.setValue(response[0].tipoEvento);
          const date: Date = addDays(new Date(response[0].fechaEvento), 1);
          this.form.get("fechaEvento").setValue(date);
          this.form.controls.fechaEvento.setValue(addDays(new Date(response[0].fechaEvento), 1));
          if (this.form.get('horaInicio').value === this.horamin && this.form.get('horaFin').value === this.horamax) {
            this.todoeldia = true;
            this.setTodoElDia();
          }

          if (this.repetir) {
            this.form.controls.frecuencia.setValue(response[0].EventoRepetir[0].frecuencia);
            if (response[0].EventoRepetir[0].frecuencia === 'Personalizada') {
              this.form.controls.fechaInicioRepetir.setValue(response[0].EventoRepetir[0].fechaInicial);
              this.form.controls.fechaFinRepetir.setValue(response[0].EventoRepetir[0].fechaFinal);
              const dias = response[0].EventoRepetir[0].dias.split(';');
              const checkArray: FormArray = this.form.get('diasRepetir') as FormArray;
              dias.forEach(element => {
                checkArray.push(new FormControl(element));
                this.dias[element - 1].isChecked = true;
              });
            }
          }
          let dateFormat = addDays(new Date(response[0].fechaEvento + " " + response[0].horaFin), 1)
          /*if(dateFormat < new Date()) {
            this.disabledByOptions = true;
          }*/

          if (this.privado) {
            this.secretariasEdit = response[0].EventoSecretarias;
            this.rolEdit = response[0].EventoRoles;
            this.secretariasSelected = this.secretariasEdit === undefined ? [] : this.secretariasEdit;
            this.secretariaDisabled = this.secretariasSelected.length === this.secretarias.length;
            this.rolesSelected = this.rolEdit === undefined ? [] : this.rolEdit;
            this.rolDisabled = this.rolesSelected.length === this.roles.length;
            this.nombreTipoEvento = response[0].tipoDesc;
            this.setPrivado();
          }

          this.temasSelected = response[0].EventoTemas === undefined ? [] : response[0].EventoTemas;
          this.micrositiosSelected = response[0].EventoMicrositios === undefined ? [] : response[0].EventoMicrositios;

          if (response[0].EventoContenidos !== undefined) {
            this.hayContenidos = true;
            response[0].EventoContenidos.forEach(element => {
              this.contenidosSelected.push(this.toContent(element));
            });
          }
        });
    }
  }

  fetchSecretarias() {
    this.secretariasService.getSecretarias().subscribe((response) => {
      this.secretarias = response;
    });
  }

  fetchRoles() {
    this.bibliotecaService.getRolesforList().subscribe((response) => {
      this.roles = response;
    });
  }

  fetchTipoEventos() {
    this.tipoEventos.push({ id: 0, nombre: 'Seleccione una opción' });
    this.tipoEventoService.getEventTypesforList().subscribe((response) => {
      this.tipoEventos = [...this.tipoEventos, ...response];
    });
  }

  fetchTemas() {
    this.temasService.getTopicsforList().subscribe((response) => {
      this.temas = response;
      if (this.temas !== null && this.temas.length > 0) {
        this.fetchContenido(this.temas[0].idTema);
      }
    });
  }

  fetchMicrositios() {
    this.micrositiosService
      .getAllMicrositiosSimpleList()
      .subscribe((micrositios) => {
        this.micrositios = micrositios;
      });
  }

  fetchContenido(idTema: string) {
    this.contenidoService.getContentbyTopic(idTema).subscribe((response) => {
      this.contenidos = response;
    });
  }

  setTodoElDia() {
    this.form.controls.horaInicio.setValue(this.horamin);
    this.form.controls.horaFin.setValue(this.horamax);
    if (this.todoeldia) {
      this.form.controls.horaInicio.disable();
      this.form.controls.horaFin.disable();
    } else {
      this.form.controls.horaInicio.enable();
      this.form.controls.horaFin.enable();
    }
  }

  setRepetir() {
    const frecuencia = this.form.controls.frecuencia;
    if (this.repetir) {
      frecuencia.setValidators([Validators.required]);
    } else {
      frecuencia.setValue(0);
      frecuencia.setValidators(null);
      this.limpiarCamposRepetir();
    }
  }

  limpiarCamposRepetir() {
    const fechaInicioRepetir = this.form.controls.fechaInicioRepetir;
    const fechaFinRepetir = this.form.controls.fechaFinRepetir;
    const diasRepetir = this.form.controls.diasRepetir;
    this.form.controls.fechaInicioRepetir.setValue('');
    this.form.controls.fechaFinRepetir.setValue('');
    fechaInicioRepetir.setValidators(null);
    fechaFinRepetir.setValidators(null);
    diasRepetir.setValidators(null);
  }

  setFrecuencia() {
    const frecuencia = this.form.value.frecuencia;
    const diasRepetir = this.form.controls.diasRepetir;
    if (frecuencia === 'Personalizada') {
      /*const date = addDays(new Date(), 1);
      this.form.controls['fechaInicioRepetir'].setValue(this.fecha);
      this.form.controls['fechaFinRepetir'].setValue(format(date, 'dd-mm-yyyy'));*/
      this.validacionesFechas();
      diasRepetir.setValidators([Validators.required]);
    } else {
      this.limpiarCamposRepetir();
    }
  }

  isPersonalizada(): boolean {
    const frecuencia = this.form.value.frecuencia;
    return frecuencia === 'Personalizada';
  }

  setPrivado() {
    const secretarias = this.form.get('secretarias');
    const usuariosInvitados = this.form.get('usuariosInvitados');
    if (this.privado) {
      secretarias.setValidators([Validators.required]);
      usuariosInvitados.setValidators([Validators.required]);
    } else {
      secretarias.setValidators(null);
      usuariosInvitados.setValidators(null);
      this.secretariasSelected = [];
      this.rolesSelected = [];
    }
  }

  onDeSelectSecretaria(item: any) {
    if (this.id !== '0') {
      const secretaria = this.secretariasEdit.find(x => x.idSecretaria === item.idSecretaria);
      if (secretaria !== null) {
        this.msgSecretarias = true;
        this.rolesSelected.push(item);
      }
    }
  }

  onDeSelectRol(item: any) {
    if (this.id !== '0') {
      const rol = this.rolEdit.find(x => x.idRol === item.idRol);
      if (rol !== null) {
        this.rolesSelected.push(item);
        this.msgRoles = true;
      }
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('diasRepetir') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  changeTipoEvento() {
    this.formProperties.idTipoEvento.error = this.form.controls.idTipoEvento.value === '0';
    const tipoEvento = this.tipoEventos.find(x => x.id === this.form.controls.idTipoEvento.value);
    this.nombreTipoEvento = tipoEvento !== undefined ? tipoEvento.nombre : '';
  }

  onChangeColor(color: string): Cmyk {
    const hsva = this.colorPickerService.stringToHsva(color);
    const rgba = this.colorPickerService.hsvaToRgba(hsva);
    const exist = this.tipoEventos.find((x) => x.color === rgba);
    if (exist === undefined) {
      return this.colorPickerService.rgbaToCmyk(rgba);
    } else {
      this.openAlert('Este color ya ha sido asignado a otro tipo de evento.');
      return null;
    }
  }

  nuevoTipoEvento() {
    this.tipoEventoError = false;
    this.esTipoEventoNuevo = true;
  }

  crearNuevoTipoEvento() {
    this.btnTipoEvento = true;
    if (this.tipoEventoNombre !== '') {
      this.spinner.show();
      this.tipoEventoService
        .createEventType({
          nombre: this.tipoEventoNombre,
          color: this.tipoEventoColor.substring(1),
        })
        .subscribe((response) => {
          this.cancelarNuevoTipoEvento();
          this.fetchTipoEventos();
          this.form.controls.idTipoEvento.setValue(response[0].id);
          this.spinner.hide();
          this.openAlert(
            `Se ha creado correctamente el tipo de evento <b>${response[0].nombre}</b>`
          );
        });
    } else {
      this.tipoEventoError = true;
    }
    this.btnTipoEvento = false;
  }

  cancelarNuevoTipoEvento() {
    this.tipoEventoNombre = '';
    this.tipoEventoColor = '#ffffff';
    this.esTipoEventoNuevo = false;
  }

  changeMicrositios() {
    this.formProperties.micrositios.error = this.micrositios.length === 0;
  }

  addNewContenido() {
    this.showFormContenido = true;
    this.showOtraFuente = false;
    this.contenido = {};
  }

  addNewContenidoExterno() {
    this.showOtraFuente = true;
    this.showFormContenido = false;
    this.contenido = {};
    setTimeout(() => {
      const file: any = document.getElementById('file');
      this.file.inputfiles(file);
      this.file.inputlink();
    }, 200);
  }

  chooseTema(idTema: string) {
    this.showContenido = false;
    this.contenido = {};
    this.fetchContenido(idTema);
  }

  chooseContenido(contenido: any) {
    this.showContenido = true;
    this.contenido = contenido;
  }

  addContenido() {
    if (this.contenido !== null) {
      this.contenidosSelected.push(this.contenido);
      this.hayContenidos = true;
      this.showContenido = false;
      this.openAlert(
        `<b>${this.contenido.nombre}<b> se ha agregado la lista de contenidos`
      );
    }
  }

  openModalContenidos() {
    const alert = this.modalService.open(ContenidoListComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    alert.componentInstance.contenidos = this.contenidosSelected;
    alert.result.then(
      (response) => {
        this.contenidosSelected = response.contenidos;
        this.hayContenidos = response.hayContenidos;
      },
      (cancel) => {
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  createContentLite() {
    if (this.contenidoTitulo === '' ||
      (this.contenidoRuta === '' && this.file.firstloadfile === false)) {
      if (this.contenidoTitulo === '') {
        this.contenidoError = true;
      }
      if (this.contenidoRuta === '' && this.file.firstloadfile === false) {
        this.contenidoAdjuntoError = true;
        this.file.FileNotAllow = true;
        this.file.errorMessage = 'por favor, selecciona un archivo o un enlace';
      }
    } else {
      this.spinner.show();
      this.btnContenido = true;
      const formData: FormData = new FormData();
      this.contenido.tipoContenido = this.file.fileenabled
        ? 'Archivo'
        : 'Enlace';
      const link: any = document.querySelector('#link');
      this.contenido.titulo = this.contenidoTitulo;
      this.contenido.descripcion = this.contenido.titulo;
      this.contenido.ruta = this.file.fileenabled ? '' : link.value;
      formData.append('jsonContent', JSON.stringify(this.contenido));
      if (this.file.fileenabled) {
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
      }
      this.contenidoService.createContentLite(formData)
        .subscribe(response => {
          this.contenido = this.toContent(response[0]);
          this.addContenido();
          this.contenido = {};
          this.showOtraFuente = false;
          this.btnContenido = false;
          this.spinner.hide();
        });
    }
  }

  toContent(element: any) {
    return {
      descripcion: element.descripcion,
      fecha: element.fecha,
      idContenido: element.idContenido,
      nombre: element.titulo,
      ruta: element.ruta,
      tipoContenido: element.TipoContenido
    };
  }

  private buildForm() {
    const today = new Date();
    this.form = this.formBuilder.group({
      id: '0',
      nombre: [
        '',
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
      fechaEvento: [
        format(today, 'dd-MM-yyyy'),
        [Validators.required],
      ],
      horaInicio: [this.horamin, [Validators.required]],
      horaFin: [this.horamax, [Validators.required]],
      fechaInicioRepetir: [format(today, 'dd-MM-yyyy')],
      fechaFinRepetir: [format(today, 'dd-MM-yyyy')],
      frecuencia: 0,
      direccion: ['', [Validators.required]],
      idTipoEvento: [0, [Validators.required]],
      diasRepetir: this.formBuilder.array([]),
      notificacion: [''],
      temas: [this.temasSelected],
      micrositios: [this.micrositiosSelected],
      secretarias: [this.secretariasSelected],
      usuariosInvitados: [this.rolesSelected],
    });

    /*this.form.controls.horaInicio.setValidators([
      Validators.required,
      Validaciones.rangoHora(this.form.controls.horaFin.value, '+')]);

    this.form.controls.horaFin.setValidators([
      Validators.required,
      Validaciones.rangoHora(this.form.controls.horaInicio.value, '-')]);*/
  }

  validacionesFechas() {
    this.form.controls.fechaInicioRepetir.setValidators([
      Validators.required,
      Validaciones.fecha]);

    this.form.controls.fechaFinRepetir.setValidators([
      Validators.required,
      Validaciones.fecha]);

    this.form.setValidators([this.validacionRangoFechas()]);
  }

  private validacionRangoFechas(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const inicio = group.controls.fechaInicioRepetir;
      const fin = group.controls.fechaFinRepetir;
      if (new Date(inicio.value) >= new Date(fin.value)) {
        inicio.setErrors({ rango_invalido: true });
        fin.setErrors({ rango_invalido: true });
      } else {
        inicio.setErrors(null);
        fin.setErrors(null);
      }
      return;
    };
  }

  save(event: Event) {
    event.preventDefault();
    if (this.form.valid && this.form.value.idTipoEvento > 0 && !this.disabledWhenSubmit) {
      this.disabledWhenSubmit = true;
      this.spinner.show();
      const evento = this.form.value;
      evento.temas = [];
      evento.micrositios = [];
      evento.secretarias = [];
      evento.usuariosInvitados = [];
      evento.contenidos = [];
      evento.diasRepetir = '';
      let notificacion = '';

      evento.fechaEvento = format(new Date(this.form.value.fechaEvento), 'yyyy-MM-dd');

      /// Todo el día
      if (this.todoeldia) {
        evento.horaInicio = this.horamin;
        evento.horaFin = this.horamax;
      } else {
        evento.horaInicio = DateAndTime.convertTo24(this.form.value.horaInicio);
        evento.horaFin = DateAndTime.convertTo24(this.form.value.horaFin);
      }

      this.temasSelected.forEach((element) => {
        evento.temas.push(element.idTema);
      });

      this.micrositiosSelected.forEach((element) => {
        evento.micrositios.push(element.idMicrositio);
      });

      /// Evento privado
      if (this.privado) {
        this.secretariasSelected.forEach((element) => {
          evento.secretarias.push(element.idSecretaria);
        });
        if (this.rolesSelected.length > 0) {
          this.rolesSelected.forEach((element) => {
            evento.usuariosInvitados.push(element.idRol);
          });
        }

        const tipoEvento = this.tipoEventos.find(x => x.id == this.form.value.idTipoEvento);
        notificacion = NotificacionBuild.get(
          this.form.value,
          this.temasSelected,
          tipoEvento !== undefined ? tipoEvento.nombre : '',
          TipoMensaje.invitacion);
      } else {
        notificacion = '';
      }

      /// Elementos cuando se repite un evento
      if (this.repetir) {
        if (this.form.value.frecuencia === 'Personalizada') {
          evento.fechaInicioRepetir = format(new Date(this.form.value.fechaInicioRepetir), 'yyyy-MM-dd');
          evento.fechaFinRepetir = format(new Date(this.form.value.fechaFinRepetir), 'yyyy-MM-dd');
          const checkArray: FormArray = this.form.get('diasRepetir') as FormArray;
          checkArray.value.forEach((element, i) => {
            evento.diasRepetir +=
              i < checkArray.value.length - 1 ? `${element};` : element;
          });
        }
      } else {
        evento.frecuencia = '';
      }

      this.contenidosSelected.forEach((element) => {
        evento.contenidos.push(element.idContenido);
      });

      const formData: FormData = new FormData();
      formData.append('jsonEvent', JSON.stringify(evento));
      formData.append('jsonEmail', JSON.stringify(notificacion));
      if (this.form.value.id === '0') {
        this.calendarioService
          .createEvent(formData)
          .subscribe((response) => {
            this.disabledWhenSubmit = false;
            this.spinner.hide();
            this.modal.close(response);
          });
      } else {
        this.calendarioService
          .updateEvent(formData)
          .subscribe((response) => {
            this.spinner.hide();
            this.modal.close(response);
          });
      }
    } else {
    }
  }

  openAlert(message: string) {
    const alert = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });
    alert.componentInstance.message = message;
  }

  validar(propiedad) {
    const rta = Validaciones.validar(this.form, propiedad, this.formProperties);
    if (rta !== null) {
      this.formProperties[propiedad].error = true;
      if (rta.length === 1) {
        return rta[0];
      } else if (rta.length > 1) {
        let msg = '';
        rta.forEach(x => {
          msg += `${msg}\n`;
        });
        return msg;
      }
    }
  }

  formatearFecha(fecha) {
    try {
      if (fecha !== null) {
        const fechaFormateada = format(new Date(this.form.value.fechaEvento), 'yyyy-MM-dd');
        return fechaFormateada;
      }
    } catch { }
  }

  validarCampo(propiedad) {
    return this.form.get(propiedad).status === 'INVALID' &&
      this.form.get(propiedad).errors &&
      this.form.get(propiedad).dirty;
  }
}
