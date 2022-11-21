import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { AdministrarFormularioService } from '../../_services/_administrar-formulario/administrar-formulario.service';

// export interface ConclusionsForm {
//   id: number;
//   isToShow: boolean;
//   name: string;
//   questionType: QuestionType;
//   answersOptions: AnswersOption[];
//   isRequiredDiligence: boolean;
//   condition: Condition;
// }

// export interface AnswersOption {
//   id: number;
//   name: string;
// }

// export interface Condition {
//   isCondition: boolean;
//   idConditionQuestion: number;
//   idConditionResponseOption: number;
// }

// export interface QuestionType {
//   id: number;
//   name: string;
// }

export interface IdName {
  id: number;
  name: string;
}

export interface ManageConclusionsForm1 {
  id: number;
  idUser: number;
  firstName: string;
  firstSurName: string;
  email: string;
  idState: number;
  propertysCitationFindingsForm: ConclusionsForm1[];
}

export interface ConclusionsForm1 {
  id: number;
  idState: number;
  isToShow: boolean;
  name: string;
  questionType: QuestionType1;
  answersOptions: AnswersOption1[];
  isRequiredDiligence: boolean;
  condition: Condition1;
}

export interface AnswersOption1 {
  id: number;
  name: string;
  questionNumber: number;
  position: number;
}

export interface QuestionType1 {
  id: number;
  name: string;
  position: number;
}

export interface Condition1 {
  isConditionQuestion: boolean;
  isConditionAnswer: boolean;
  idConditionQuestion: number;
  idConditionAnswer: number;
}

@Component({
  selector: 'app-citas-administrar-formulario-conclusiones',
  templateUrl: './citas-administrar-formulario-conclusiones.component.html',
  styleUrls: ['./citas-administrar-formulario-conclusiones.component.scss']
})
export class CitasAdministrarFormularioConclusionesComponent implements OnInit {

  // @Output() linkTo = "/panel";
  linkTo = "/panel";
  @Output() titulo = "GESTIONAR FORMULARIO DE CONCLUSIONES DE CITAS";
  // @Output() buttonText = "COMPRAS PÚBLICAS";
  @Output() icono = "assets/imgs/iconos/conclusiones.svg";
  @Output() alertaIcono = "assets/imgs/home-editor/alerta.svg";
  @Output() infoAyuda = "Bienvenido(a), acá podrás administrar el formulario de conclusiones de citas.";

  ejecutar = {
    name: null,
    index: null
  }

  gestionarFormularioConclusiones: ManageConclusionsForm1;
  formularioConclusiones: ConclusionsForm1[] = [];
  formularioConclusionesGuardado: ConclusionsForm1[];
  
  gestionarFormularioConclusionesPublicado: ManageConclusionsForm1;
  formularioConclusionesPublicado: ConclusionsForm1[];

  mensajePopupCambios = "";
  isPopupCambios = false;
  mensajePopupConfirmacion = "";
  isPopupConfirmacion = false;

  isBtnPublicar = false;

  constructor(private router: Router,
    private _administrarFormularioService: AdministrarFormularioService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    // this.actualizarPreguntas();
    this.obtenerFormulario();
    this.obtenerFormularioPublicado();

    // this.formularioConclusionesGuardado = [
    //   {
    //     id: 1,
    //     isToShow: true,
    //     name: "¿La reunión se realizó?",
    //     questionType:
    //     {
    //       id: 1,
    //       name: "Selección Única"
    //     },

    //     answersOptions: [
    //       {
    //         id: 1,
    //         name: "Si"
    //       },
    //       {

    //         id: 2,
    //         name: "No"
    //       }
    //     ],
    //     isRequiredDiligence: true,
    //     condition: {
    //       isCondition: false,
    //       idConditionQuestion: null,
    //       idConditionResponseOption: null,
    //     }
    //   },
    //   {
    //     id: 4,
    //     isToShow: true,
    //     name: "Pregunta dos",
    //     questionType: {
    //       id: 2,
    //       name: "Selección Múltiple"
    //     },
    //     answersOptions: [
    //       {
    //         id: 1,
    //         name: "Respuesta 1"
    //       },
    //       {
    //         id: 2,
    //         name: "Respuesta 2"
    //       }
    //     ],
    //     isRequiredDiligence: false,
    //     condition: {
    //       isCondition: true,
    //       idConditionQuestion: 1,
    //       idConditionResponseOption: 1
    //     }
    //   }
    // ];

    // this.formularioConclusiones = JSON.parse(JSON.stringify(this.formularioConclusionesGuardado));
  }

  obtenerFormulario() {
    this.layoutService.showLoading();
    this._administrarFormularioService.obtenerFormularioPorUsuario(1,1).subscribe(
      (res) => {
        if (res.succeeded && res.data) {
          // console.log("obtenerFormularioPorUsuario res", res);
          this.gestionarFormularioConclusiones = res.data;

          const data: ConclusionsForm1[] = res.data.propertysCitationFindingsForm;
          if (data.length) {
            // console.log("obtenerFormularioPorUsuario data", data);
            this.formularioConclusionesGuardado = data.map((pregunta: ConclusionsForm1) => {
              pregunta.id = pregunta.questionType.position;
              return pregunta;
            })
            this.formularioConclusiones = JSON.parse(JSON.stringify(this.formularioConclusionesGuardado));
          }
          else {
            console.log("No hay formularios");
          }
        } else {
          console.log("No succeeded", res.message);

        }
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  obtenerFormularioPublicado() {
    this.layoutService.showLoading();
    this._administrarFormularioService.obtenerFormularioPorUsuario(1, 4).subscribe(
      (res) => {
        // console.log("formulario publicado res", res);
        if (res.succeeded && res.data) {
          this.gestionarFormularioConclusionesPublicado = res.data;

          const data: ConclusionsForm1[] = res.data.propertysCitationFindingsForm;
          if (data.length) {
            this.formularioConclusionesPublicado = data.map((pregunta: ConclusionsForm1) => {
              pregunta.idState = 1;
              pregunta.id = pregunta.questionType.position;
              return pregunta;
            })
            // console.log("formularioConclusionesPublicado", this.formularioConclusionesPublicado);
            // console.log("formularioConclusionesGuardado", this.formularioConclusionesGuardado);
          }
          else {
            console.log("No hay formularios");
          }
        } else {
          console.log("No succeeded", res.message);
        }
        this.layoutService.closeLoading();
      }
    );
    (error: any) => {
      console.log(error);
      this.layoutService.closeLoading();
    };
  }

  getIdMax(data: ConclusionsForm1[]): number {
    let idMax = 1;
    data.forEach(element => {
      if (element.id >= idMax) {
        idMax = element.id + 1;
      }
    });
    return idMax;
  }
  // addPregunta(index: number) {
  //   this.formularioConclusiones.splice(index, 0, {
  //     id: this.getIdMax(this.formularioConclusiones),
  //     isToShow: true,
  //     name: "",
  //     questionType: {
  //       name: "Selección única",
  //       id: 1,
  //     },
  //     answersOptions: [
  //       {
  //         id: 1,
  //         name: ""
  //       },
  //       {
  //         id: 2,
  //         name: ""
  //       }
  //     ],
  //     isRequiredDiligence: false,
  //     condition: {
  //       isCondition: false,
  //       idConditionQuestion: null,
  //       idConditionResponseOption: null,
  //     }
  //   });
  // }

  addPregunta(index: number) {
    let id = this.getIdMax(this.formularioConclusiones);
    this.formularioConclusiones.splice(index, 0, {
      id,
      idState: 1,
      isToShow: true,
      name: "",
      questionType: {
        id: 1,
        name: "Selección Única",
        position: id
      },
      answersOptions: [
        {
          id: 1,
          name: "",
          questionNumber: 0,
          position: 1
        },
        {
          id: 2,
          name: "",
          questionNumber: 0,
          position: 2
        }
      ],
      isRequiredDiligence: false,
      condition: {
        // isCondition: false,
        isConditionQuestion: false,
        isConditionAnswer: false,
        idConditionQuestion: 0,
        idConditionAnswer: 0
      }
    });
  }

  eliminarPregunta(index: number) {
    this.ejecutar = {
      name: "eliminarPregunta",
      index
    }
    this.mensajePopupCambios = "¿Estás seguro de eliminar la pregunta del formulario de conclusiones?";
    this.isPopupCambios = true;
    // this.objetoFormulariosConclusiones.splice(index, 1)
    // this.actualizarPreguntas();
  }

  verficarFormulariosGuardados() {
    const cambio = (JSON.stringify(this.formularioConclusionesGuardado) == JSON.stringify(this.formularioConclusiones))
    this.actualizarLocalStorage(!cambio);
    return cambio;
  }
  verficarCamposObligatoriosDeTodoElFormulario() {
    for (let index = 0; index < this.formularioConclusiones.length; index++) {
      const element = this.formularioConclusiones[index];
      if (!this.verficarCamposObligatoriosObjetoPregunta(element)) {
        return false;
      }
    }
    return true;
  }
  verficarCamposObligatoriosObjetoPregunta(data: ConclusionsForm1) {
    if (!data.name || !data.id) {
      return false;
    }

    if (!data.questionType || !data.questionType.id || !data.questionType.name) {
      return false;
    }

    if (!data.condition) {
      return false;
    }
    else {
      if (data.condition.isConditionQuestion || data.condition.isConditionAnswer) {
        if (!data.condition.idConditionQuestion || !data.condition.idConditionAnswer) {
          return false;
        }
      }
    }

    if (data.answersOptions.length >= 2) {
      for (let index = 0; index < data.answersOptions.length; index++) {
        const element = data.answersOptions[index];
        if (!element.id || !element.name) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  guardar() {
    if (this.formularioConclusiones.length >= 1) {
      this.layoutService.showLoading();
      this.gestionarFormularioConclusiones.propertysCitationFindingsForm = JSON.parse(JSON.stringify(this.formularioConclusiones));
      // console.log("gestionarFormularioConclusiones", this.gestionarFormularioConclusiones);
      this._administrarFormularioService.actualizarFormulario(this.gestionarFormularioConclusiones).subscribe(
        (res: any) => {
          // console.log("guardar", res);
          if (res.succeeded) {
            this.formularioConclusionesGuardado = JSON.parse(JSON.stringify(this.formularioConclusiones));
            this.mensajePopupConfirmacion = "La información ha sido guardada exitosamente";
            this.isPopupConfirmacion = true;
            this.isBtnPublicar = true;
          } else {
            this.mensajePopupConfirmacion = res.message;
            this.isPopupConfirmacion = true;
          }
          this.layoutService.closeLoading();
        }
      );
      (error: any) => {
        console.log("prueba error", error);
        this.layoutService.closeLoading();
      };
    }
  }

  verficarFormularioPublicar() {
    // console.log("Verificar publicar", JSON.stringify(this.formularioConclusionesGuardado), JSON.stringify(this.formularioConclusionesPublicado));
    // console.log("Verificar publicar", JSON.stringify(this.formularioConclusionesGuardado) == JSON.stringify(this.formularioConclusionesPublicado));
    return (JSON.stringify(this.formularioConclusionesGuardado) == JSON.stringify(this.formularioConclusionesPublicado));
  }
  publicar() {
    if (this.formularioConclusionesGuardado.length >= 1) {
      this.layoutService.showLoading();
      this.gestionarFormularioConclusionesPublicado = JSON.parse(JSON.stringify(this.gestionarFormularioConclusiones));
      this.gestionarFormularioConclusionesPublicado.propertysCitationFindingsForm = JSON.parse(JSON.stringify(this.formularioConclusionesGuardado));

      this.gestionarFormularioConclusionesPublicado.idState = 4;
      if (this.gestionarFormularioConclusionesPublicado.propertysCitationFindingsForm.length) {
        // console.log("obtenerFormularioPorUsuario data", data);
        this.gestionarFormularioConclusionesPublicado.propertysCitationFindingsForm = this.gestionarFormularioConclusionesPublicado.propertysCitationFindingsForm.map((pregunta: ConclusionsForm1) => {
          pregunta.idState = 4;
          return pregunta;
        })
      }
      // console.log("Publicar", this.gestionarFormularioConclusionesPublicado);
      // console.log("Guardado", this.gestionarFormularioConclusiones);
      this._administrarFormularioService.actualizarFormularioPublicado(this.gestionarFormularioConclusionesPublicado).subscribe(
        (res: any) => {
          // console.log("Publicar", res);
          if (res.succeeded) {
            this.obtenerFormularioPublicado();
            // this.formularioConclusionesGuardado = JSON.parse(JSON.stringify(this.formularioConclusiones));
            this.mensajePopupConfirmacion = "El formulario ha sido publicado exitosamente";
            this.isPopupConfirmacion = true;
            this.isBtnPublicar = false;
          } else {
            this.mensajePopupConfirmacion = res.message;
            this.isPopupConfirmacion = true;
          }
          this.layoutService.closeLoading();
        }
      );
      (error: any) => {
        console.log("prueba error", error);
        this.layoutService.closeLoading();
      };
    }
  }

  closePopupCambios(event: boolean) {
    this.isPopupCambios = false;
    if (event) {
      switch (this.ejecutar.name) {
        case "eliminarPregunta":

          this.limpiarCondicionPreguntaRelacionada(this.formularioConclusiones[this.ejecutar.index].id);
          this.formularioConclusiones.splice(this.ejecutar.index, 1);
          this.mensajePopupConfirmacion = "La pregunta ha sido eliminada exitosamente";
          this.isPopupConfirmacion = true;
          break;

        case "regresar":
          this.router.navigate([this.linkTo]);
          break;

        default:
          break;
      }
    }
    this.ejecutar = null;
  }
  closePopupConfimacion(event: boolean) {
    this.isPopupConfirmacion = false;
  }

  idPreguntaEliminada:number = 0;
  limpiarCondicionPreguntaRelacionada(id: number) {
    // console.log("id",id);
    this.idPreguntaEliminada = id;
    this.formularioConclusiones.map((pregunta) => {
      if (pregunta.condition.idConditionQuestion == id) {
        pregunta.condition.isConditionQuestion = false;
        pregunta.condition.isConditionAnswer = false;
        pregunta.condition.idConditionQuestion = 0;
        pregunta.condition.idConditionAnswer = 0;
      }
    })
  }

  mensajeConsole(mensaje: string = 'mensaje') {
    console.log(mensaje);
  }
  regresar() {
    if (this.verficarFormulariosGuardados()) {
      this.router.navigate([this.linkTo]);
    }
    else {
      this.ejecutar = {
        name: "regresar",
        index: null
      }
      this.mensajePopupCambios = "¿Desea salir sin guardar los cambios?";
      this.isPopupCambios = true;
    }
  }

  actualizarLocalStorage(valor: boolean) {
    let localStorageStates = JSON.parse(localStorage.getItem('validations'))

    if (localStorageStates) {

      localStorageStates.map(local => {
        if (local.tipo === 'disponibilidad') local.valor = valor;
      });

      const estados = [...localStorageStates];
      localStorage.setItem('validations', JSON.stringify(estados));

    } else {
      const estados = [
        {
          tipo: 'disponibilidad',
          valor,
          mensaje: '¿Desea salir sin guardar los cambios?'
        }
      ];
      localStorage.setItem('validations', JSON.stringify(estados));
    }
  }
}