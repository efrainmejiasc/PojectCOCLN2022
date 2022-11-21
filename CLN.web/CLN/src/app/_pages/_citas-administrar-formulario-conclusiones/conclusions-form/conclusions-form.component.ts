import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConclusionsForm1, QuestionType1 } from '../citas-administrar-formulario-conclusiones.component';

@Component({
  selector: 'app-conclusions-form',
  templateUrl: './conclusions-form.component.html',
  styleUrls: ['./conclusions-form.component.scss']
})
export class ConclusionsFormComponent implements OnInit, OnChanges {

  @Input() formularioConclusiones: ConclusionsForm1;
  @Input() objetoFormularioConclusiones: ConclusionsForm1[];
  @Input() index: number;
  @Input() idPreguntaEliminada: number;
  // @Input() listaPreguntas: any;

  objetoBase: any = {
    "id": 0,
    "name": "",
  }

  condicionPreguntaSeleccionada = this.objetoBase;

  listaCondicionRespuesta: any = [this.objetoBase];
  condicionRespuestaSeleccionada = this.objetoBase;

  isMostrarFormulario = null;
  pregunta = "";

  listaTipoRespuestas = [
    {
      id: 1,
      name: "Selección única",
      position: 1
    },
    {
      id: 2,
      name: "Selección Múltiple",
      position: 2
    }
  ];
  tipoRespuestasSeleccionada: QuestionType1;

  isDiligenciamientoRequerido = null;

  // listaTipoRespuestas: any = [];

  listaRespuestas: any = [];

  isCondicion: boolean = false;

  claseInputControl = "";

  isPopupCambios: boolean = false;
  mensajePopupCambios: string = "";
  ejecutar: any;

  isPopupConfirmacion: boolean = false;
  mensajePopupConfirmacion: string = "";

  constructor(
    // private dialog: MatDialog,
    // private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.isMostrarFormulario = this.formularioConclusiones.isToShow;
    this.pregunta = this.formularioConclusiones.name;
    this.tipoRespuestasSeleccionada = this.formularioConclusiones.questionType;
    // this.listaTipoRespuestas = this.formularioConclusiones.questionType;
    this.listaRespuestas = this.formularioConclusiones.answersOptions;
    // this.idTipoRespuestaSeleccionada(1);
    this.isDiligenciamientoRequerido = this.formularioConclusiones.isRequiredDiligence;

    this.isCondicion = (this.formularioConclusiones.condition.isConditionQuestion && this.formularioConclusiones.condition.isConditionAnswer);
    if (this.isCondicion) {
      let preguntaPadre = this.buscarPorId(this.objetoFormularioConclusiones, this.formularioConclusiones.condition.idConditionQuestion);
      let respuestaPadre = null;
      if (preguntaPadre && preguntaPadre.answersOptions.length >= 2) {
        respuestaPadre = this.buscarPorId(preguntaPadre.answersOptions, this.formularioConclusiones.condition.idConditionAnswer);
      }
      if (preguntaPadre && preguntaPadre.id && respuestaPadre && respuestaPadre.id) {
        // console.log("preguntaPadre - respuestaPadre", preguntaPadre.id, respuestaPadre.id);
        this.idCondicionPreguntaSeleccionada(preguntaPadre.id);
        this.idCondicionRespuestaSeleccionada(respuestaPadre.id);
      }
    }
    // this.actualizarPreguntas();

    // this.mostrarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("changes ", changes)
    if (!changes.idPreguntaEliminada.firstChange) {
      // console.log("changes2 ", changes.idPreguntaEliminada.currentValue, this.formularioConclusiones.condition.idConditionQuestion)

      if (this.formularioConclusiones.condition.idConditionQuestion == 0) {
        this.isCondicion = false;
        this.condicionPreguntaSeleccionada = this.objetoBase;
        this.condicionRespuestaSeleccionada = this.objetoBase;
      }
    }
  }

  buscarPorId(array: any[], id: number) {
    return array.find((item: any) => item.id == id);
  }

  idTipoRespuestaSeleccionada(id: number) {
    this.tipoRespuestasSeleccionada = null;

    for (let i = 0; i < this.listaTipoRespuestas.length; i++) {
      const item = this.listaTipoRespuestas[i];
      if (item.id === id) {
        this.tipoRespuestasSeleccionada = item;
        this.formularioConclusiones.questionType = item;
      };
    };
  }

  isPreguntaValidaParaCondicion(data: ConclusionsForm1): boolean {
    let isRespuesta = true;
    if (data.name && data.id && data.answersOptions.length >= 2) {
      data.answersOptions.forEach(element => {
        if (!element.id || !element.name) {
          isRespuesta = false;
        }
      });
      return isRespuesta;
    }
    return false;
  }

  filtroObjetoPreguntas() {
    let objetoPreguntas: any = [];
    this.objetoFormularioConclusiones.forEach((pregunta, index) => {
      if (index + 1 != this.index && this.isPreguntaValidaParaCondicion(pregunta) && pregunta.isToShow) {
        objetoPreguntas = [...objetoPreguntas, pregunta];
      }
    });
    return objetoPreguntas;
  }

  filtroCondicionDosPreguntas() {
    let btnCondicion2Preguntas: number = 0;
    this.objetoFormularioConclusiones.forEach((pregunta) => {
      if (this.isPreguntaValidaParaCondicion(pregunta) && pregunta.isToShow) {
        btnCondicion2Preguntas += 1;
      }
    });
    return btnCondicion2Preguntas;
  }


  activarCondicion() {
    this.isCondicion = true;
    this.objetoFormularioConclusiones[this.index - 1].condition.isConditionQuestion = true;
  }

  idCondicionPreguntaSeleccionada(id: number) {
    for (let i = 0; i < this.objetoFormularioConclusiones.length; i++) {
      const item = this.objetoFormularioConclusiones[i];
      if (item.id === id) {
        if (this.condicionPreguntaSeleccionada != item) {
          if (id > 0) {
            this.listaCondicionRespuesta = [
              // this.objetoBase,
              ...item.answersOptions
            ];
          } else {
            this.listaCondicionRespuesta = [this.objetoBase];
          }
          this.condicionRespuestaSeleccionada = this.objetoBase;
        }
        this.condicionPreguntaSeleccionada = item;
        // this.objetoFormularioConclusiones[this.index - 1].condition.idConditionQuestion = id;
      }
    }
  }

  idCondicionRespuestaSeleccionada(id: number) {

    if ( !id ) return; 

    this.condicionRespuestaSeleccionada = this.objetoBase;
    this.condicionRespuestaSeleccionada = this.listaCondicionRespuesta.find( lista => lista.id === id );
    
  }

  isBtnCrearCondicion() {
    return (
      !(this.condicionPreguntaSeleccionada.id && this.condicionPreguntaSeleccionada.name
        && this.condicionRespuestaSeleccionada.id && this.condicionRespuestaSeleccionada.name) ||
      (
        JSON.stringify({
          "isConditionQuestion": this.isCondicion,
          "isConditionAnswer": this.isCondicion,
          "idConditionQuestion": this.condicionPreguntaSeleccionada.id,
          "idConditionAnswer": this.condicionRespuestaSeleccionada.id
        }) == JSON.stringify(this.objetoFormularioConclusiones[this.index - 1].condition)
      )
    );
  }

  crearCondicion() {
    this.objetoFormularioConclusiones[this.index - 1].condition.idConditionQuestion = this.condicionPreguntaSeleccionada.id;
    this.objetoFormularioConclusiones[this.index - 1].condition.idConditionAnswer = this.condicionRespuestaSeleccionada.id;
    this.objetoFormularioConclusiones[this.index - 1].condition.isConditionQuestion = this.isCondicion;
    this.objetoFormularioConclusiones[this.index - 1].condition.isConditionAnswer = this.isCondicion;

    this.mensajePopupConfirmacion = "La condición ha sido creada exitosamente";
    this.isPopupConfirmacion = true;
  }

  addRespuesta() {

    let id = this.getIdMax(this.listaRespuestas);
    this.listaRespuestas.push({
      id,
      name: "",
      questionNumber: 0,
      position: id
    })
  }
  eliminarRespuesta(index: number) {
    this.ejecutar = {
      name: "eliminarRespuesta",
      index
    }
    this.mensajePopupCambios = "¿Estás seguro de eliminar la opción de respuesta?";
    this.isPopupCambios = true;
  }

  cancelarCondicion() {
    this.isCondicion = false;
    this.condicionRespuestaSeleccionada = this.objetoBase;
    this.condicionPreguntaSeleccionada = this.objetoBase;
    this.objetoFormularioConclusiones[this.index - 1].condition.idConditionQuestion = 0;
    this.objetoFormularioConclusiones[this.index - 1].condition.idConditionAnswer = 0;
    this.objetoFormularioConclusiones[this.index - 1].condition.isConditionQuestion = false;
    this.objetoFormularioConclusiones[this.index - 1].condition.isConditionAnswer = false;
    this.listaCondicionRespuesta = this.objetoBase;
  }

  eliminarCondicion() {
    this.ejecutar = {
      name: "eliminarCondicion",
      index: this.index - 1
    }
    this.mensajePopupCambios = "¿Estás seguro de eliminar la condición?";
    this.isPopupCambios = true;
  }

  mensajeConsola(mensaje: string = "Mensajeconsola") {
    console.log(mensaje);
  }

  getIdMax(data: any[]): number {
    let idMax = 1;
    data.forEach(element => {
      if (element.id >= idMax) {
        idMax = element.id + 1;
      }
    });
    return idMax;
  }
  // addPregunta(index: number) {
  //   this.objetoFormularioConclusiones.splice(index, 0, {
  //     id: this.getIdMax(this.objetoFormularioConclusiones),
  //     isToShow: true,
  //     name: "",
  //     questionType: {
  //       name: "Selección única",
  //       id: 1
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
  //     isRequiredDiligence: true,
  //     condition: {
  //       isCondition: false,
  //       idConditionQuestion: null,
  //       idConditionResponseOption: null,
  //     }
  //   });
  //   // this.actualizarPreguntas();
  // }
  // eliminarPregunta(index: number) {
  //   this.ejecutar = {
  //     name: "eliminarPregunta",
  //     index
  //   }
  //   this.mensajePopupCambios = "¿Estás seguro de eliminar la pregunta del formulario de conclusiones?";
  //   this.isPopupCambios = true;
  //   // this.objetoFormularioConclusiones.splice(index, 1)
  //   // this.actualizarPreguntas();
  // }

  // actualizarPreguntas() {
  //   console.log("objeto", this.objetoFormularioConclusiones);
  //   console.log("pregunta individual", this.formularioConclusiones);

  //   this.listaPreguntas = [this.objetoBase];
  //   console.log("pregunta", this.pregunta, "actualizar lista", this.listaPreguntas);

  //   this.objetoFormularioConclusiones.map((pregunta, index) => {
  //     if (index + 1 != this.index) {
  //       let obj = {
  //         "id": index + 1,
  //         "name": pregunta.question,
  //       }
  //       this.listaPreguntas.push(obj);
  //     }
  //   });
  //   return this.listaPreguntas;
  // }

  closePopupCambios(event: boolean) {
    this.isPopupCambios = false;
    if (event) {
      switch (this.ejecutar.name) {
        // case "eliminarPregunta":
        //   this.mensajePopupConfirmacion = "La pregunta ha sido eliminada exitosamente";
        //   this.isPopupConfirmacion = true;

        //   this.objetoFormularioConclusiones.splice(this.ejecutar.index, 1);
        //   break;

        case "eliminarRespuesta":
          this.listaRespuestas.splice(this.ejecutar.index, 1);

          this.mensajePopupConfirmacion = "La opción de respuesta ha sido eliminada exitosamente";
          this.isPopupConfirmacion = true;
          break;

        case "eliminarCondicion":
          this.isCondicion = false;
          this.condicionRespuestaSeleccionada = this.objetoBase;
          this.condicionPreguntaSeleccionada = this.objetoBase;
          this.objetoFormularioConclusiones[this.index - 1].condition.idConditionQuestion = 0;
          this.objetoFormularioConclusiones[this.index - 1].condition.idConditionAnswer = 0;
          this.objetoFormularioConclusiones[this.index - 1].condition.isConditionQuestion = false;
          this.objetoFormularioConclusiones[this.index - 1].condition.isConditionAnswer = false;
          this.listaCondicionRespuesta = this.objetoBase;

          this.mensajePopupConfirmacion = "La condición ha sido eliminada exitosamente";
          this.isPopupConfirmacion = true;
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

  changePregunta(value: string) {
    this.objetoFormularioConclusiones[this.index - 1].name = value;
  }
  changeIsMostrarFormulario() {
    this.isMostrarFormulario = !this.isMostrarFormulario;
    this.objetoFormularioConclusiones[this.index - 1].isToShow = this.isMostrarFormulario;
  }
  changeIsDiligenciamientoRequerido() {
    this.isDiligenciamientoRequerido = !this.isDiligenciamientoRequerido;
    this.objetoFormularioConclusiones[this.index - 1].isRequiredDiligence = this.isDiligenciamientoRequerido;
  }
}
