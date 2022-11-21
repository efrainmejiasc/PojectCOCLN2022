import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { replaceTexto } from 'src/utils/replaceTexto';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Output() setImagen = new EventEmitter<any>();
  @Output() setEnlace = new EventEmitter<any>();
  @Output() setTextoOne = new EventEmitter<any>();
  @Output() setTextoTwo = new EventEmitter<any>();
  @Output() setTipoPlantilla = new EventEmitter<any>();
  @Output() asignarTextoSugerido = new EventEmitter<any>();

  @Input() imagen: any;
  @Input() enlace: any;
  @Input() primerTextoI: any;
  @Input() segundoTextoI: any;
  @Input() plantilla: any;

  @Input() tipoNotificacion: any;
  @Input() textoSugerido = false;

  textoI: string;
  textoII: string;

  textoOne: string;

  plantillas: [
    {
      img: 'assets/imgs/iconos/plantilla_1.svg',
      value: 'plantilla_1',
      title: 'Plantilla 1'
    },
    {
      img: 'assets/imgs/iconos/plantilla_2.svg',
      value: 'plantilla_2',
      title: 'Plantilla 2'
    },
    {
      img: 'assets/imgs/iconos/plantilla_3.svg',
      value: 'plantilla_3',
      title: 'Plantilla 3'
    }
  ];

  alerta = {
    plantilla: '',
    textoSugerido: false
  }

  imgURL: any;
  primerTexto: string;
  primerTextoTwo: string;
  segundoTexto: string;
  primerTexto3: string;

  textosSugeridos = [
    { 
      title: "Anuncios de compra",
      contenido: `<b>Anuncios de compra</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Queremos informarte que hay anuncios de compra disponibles en el sitio de Compra Lo Nuestro.</div><div><br></div><div>Ingresa al sitio para obtener informaci&#243;n:</div><div><a href="https://compralonuestro.co/business-oppotunities" target="_blank">https://compralonuestro.co/business-oppotunities</a><br></div>`
    },
    { 
      title: "Eventos / Contenidos",
      contenido: `<b>Eventos / Contenidos</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Te invitamos a que te unas a los siguientes eventos:</div><div><br></div><div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><br></div><div><a href="https://compralonuestro.com/events" target="_blank">https://compralonuestro.com/events</a><br></div>`
    },
    { 
      title: "Noticias / Novedades / Campañas",
      contenido: `<b>Noticias / Novedades / Campa&#241;as</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Te invitamos a conocer las &#250;ltimas novedades en:</div><div><br></div><div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/events" target="_blank">https://compralonuestro.co/events</a><br></div>`
    },
    { 
      title: "Beneficios",
      contenido: `<b>Beneficios</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Hemos logrado obtener los siguientes beneficios para tu empresa:</div><div><br></div><div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/articles/details/222446" target="_blank">https://compralonuestro.co/articles/details/222446</a><br></div>`
    },
    { 
      title: "Servicios de apoyo",
      contenido: `<b>Servicios de apoyo</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Recuerda que en Compra Lo Nuestro encuentras la asistencia disponible para el crecimiento de tu empresa:</div><div><br></div><div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/services" target="_blank">https://compralonuestro.co/services</a><br></div>`
    },
    { 
      title: "Comunidades",
      contenido: `<b>Comunidades</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Interact&#250;e con usuarios afines a tus intereses o con sectores e industrias relacionadas con tu empresa.</div><div><br></div><div>¡S&#250;mate a nuestras comunidades para compartir informaci&#243;n sobre oportunidades de negocio y darle a conocer con posibles socios, clientes, proveedores, inversores y expertos!</div><div><br></div><div>Ingresa al sitio para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/communities" target="_blank">https://compralonuestro.co/communities</a><br></div>`
    },
  ];

  textosSugeridosPlantilla2 = [
    { 
      title: "Anuncios de compra",
      contenido: `<b>Anuncios de compra</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Queremos informarte que hay anuncios de compra disponibles en el sitio de Compra Lo Nuestro.</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio para obtener informaci&#243;n:</div><div><a href="https://compralonuestro.co/business-oppotunities" target="_blank">https://compralonuestro.co/business-oppotunities</a><br></div>`
    },
    { 
      title: "Eventos / Contenidos",
      contenido: `<b>Eventos / Contenidos</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Te invitamos a que te unas a los siguientes eventos:</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><br></div><div><a href="https://compralonuestro.com/events" target="_blank">https://compralonuestro.com/events</a><br></div>`
    },
    { 
      title: "Noticias / Novedades / Campañas",
      contenido: `<b>Noticias / Novedades / Campa&#241;as</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Te invitamos a conocer las &#250;ltimas novedades en:</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/events" target="_blank">https://compralonuestro.co/events</a><br></div>`
    },
    { 
      title: "Beneficios",
      contenido: `<b>Beneficios</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Hemos logrado obtener los siguientes beneficios para tu empresa:</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/articles/details/222446" target="_blank">https://compralonuestro.co/articles/details/222446</a><br></div>`
    },
    { 
      title: "Servicios de apoyo",
      contenido: `<b>Servicios de apoyo</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Recuerda que en Compra Lo Nuestro encuentras la asistencia disponible para el crecimiento de tu empresa:</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio de Compra Lo Nuestro para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/services" target="_blank">https://compralonuestro.co/services</a><br></div>`
    },
    { 
      title: "Comunidades",
      contenido: `<b>Comunidades</b><div><br></div><div>Querido(a) empresario(a)</div><div><br></div><div>Interact&#250;e con usuarios afines a tus intereses o con sectores e industrias relacionadas con tu empresa.</div><div><br></div><div>¡S&#250;mate a nuestras comunidades para compartir informaci&#243;n sobre oportunidades de negocio y darle a conocer con posibles socios, clientes, proveedores, inversores y expertos!</div><div><br></div>`,
      constenidoSecundario: `<div>Ingresa al sitio para obtener m&#225;s informaci&#243;n:</div><div><a href="https://compralonuestro.co/communities" target="_blank">https://compralonuestro.co/communities</a><br></div>`
    },
  ];

  opciones: any[] = [
    {
      editor: 1,
      onClick: (option: number) => this.selectOption(option),
      mostrar: false,
      valor: ''
    },
    {
      editor: 2,
      onClick: (option: number) => this.selectOption(option),
      mostrar: false,
      valor: ''
    },
  ];

  selectOption( opcion: number ){
    
    this.opciones[ opcion - 1 ].mostrar = !this.opciones[ opcion - 1 ].mostrar;


    // if(this.opciones[ opcion - 1 ].editor === 1) {
    //   this.primerTexto = localStorage.getItem("pTexto");
    // }
    // if(this.opciones[ opcion - 1 ].editor === 2) {
    //   this.segundoTexto = localStorage.getItem("sTexto");
    // }

    // return
    if( this.opciones[ opcion - 1 ].valor.trim() == '' ) return;

    if( this.opciones[ opcion - 1 ].editor == 1 ){
      this.primerTexto = this.opciones[ opcion - 1 ].valor;
      this.setTextoOne.emit(this.primerTexto);
      // localStorage.setItem("pTexto", this.opciones[ opcion - 1 ].valor);
    }

    if( this.opciones[ opcion - 1 ].editor == 2 ){
      this.segundoTexto = this.opciones[ opcion - 1 ].valor;
      this.setTextoTwo.emit(this.segundoTexto );
      // localStorage.setItem("sTexto", this.opciones[ opcion - 1 ].valor);
    }
  }


  constructor() { }

  ngOnInit() {
    this.imgURL = this.imagen;
    this.primerTexto = this.primerTextoI;
    this.segundoTexto = this.segundoTextoI;
    // this.primerTexto = localStorage.getItem("pTexto");
    // this.segundoTexto = localStorage.getItem("sTexto");
  }

  showImg(files) {
    if (files) {
      const file = files;
      const reader = new FileReader();
      reader.onload = e => {
        this.imgURL = reader.result
        this.setImagen.emit(file);
      };
      reader.readAsDataURL(file);
  
    }
  }

  asignarEnlace(enlace: string) {
    this.setEnlace.emit(enlace);
  }

  selecccionar() {
    this.textoSugerido = !this.textoSugerido;

    if(this.textoSugerido){

      if(this.tipoNotificacion.length === 0) return;

      if( this.plantilla == 2 ){

        const valor = this.textosSugeridosPlantilla2.find( texto => texto.title === this.tipoNotificacion[0].name);
        this.agregarTextoPTwo(valor.contenido)
        this.agregarSegundoTexto(valor.constenidoSecundario);

        this.opciones[0].valor = valor.contenido;
        this.opciones[1].valor = valor.constenidoSecundario;

      }else{

        const valor = this.textosSugeridos.find( texto => texto.title === this.tipoNotificacion[0].name);
        this.agregarTextoPTwo(valor.contenido);
        this.agregarSegundoTexto(valor.contenido);
        this.opciones[0].valor = valor.contenido;
        this.opciones[1].valor = valor.contenido;

      }

    }else{
      this.agregarTextoPTwo('');
      this.agregarSegundoTexto('');
      this.opciones[0].valor = '';
      this.opciones[1].valor = '';
    }

  }

  setPlantilla(){

    this.setTipoPlantilla.emit(this.plantilla);
    
    if(this.textoSugerido){

      if( this.plantilla == 2 ){

        const valor = this.textosSugeridosPlantilla2.find( texto => texto.title === this.tipoNotificacion[0].name);
      
        if(valor){
          this.primerTextoI = valor.contenido;
          this.segundoTextoI = valor.constenidoSecundario;
          
          this.textoI = valor.contenido;
          this.textoII = valor.constenidoSecundario;

          this.primerTexto = valor.contenido;
          this.segundoTexto = valor.constenidoSecundario;

          this.setTextoOne.emit(this.textoI);
          this.setTextoTwo.emit(this.textoII);
  
        }else{
          this.primerTextoI = '';
          this.segundoTextoI = '';
  
          this.textoI = '';
          this.textoII = '';

          this.primerTexto = '';
          this.segundoTexto = '';

          this.setTextoOne.emit(this.textoI);
          this.setTextoTwo.emit(this.textoII);
  
        }

      }else{

        const valor = this.textosSugeridos.find( texto => texto.title === this.tipoNotificacion[0].name);
      
        if(valor){
          this.primerTextoI = valor.contenido;
          this.segundoTextoI = valor.contenido;
          
          this.textoI = valor.contenido;
          this.textoII = valor.contenido;

          this.primerTexto = valor.contenido;
          this.segundoTexto = valor.contenido;
  
          this.asignarTextoSugerido.emit(valor.contenido);
        }else{
          this.primerTextoI = '';
          this.segundoTextoI = '';
  
          this.textoI = '';
          this.textoII = '';

          this.primerTexto = '';
          this.segundoTexto = '';
  
          this.asignarTextoSugerido.emit('');
        }

      }

    }else{
   
    }

  }

  agregarTextoPOne(texto: string) {
    this.primerTexto = texto;
    this.setTextoOne.emit(texto);
  }

  agregarPrimerTexto(texto: string) {
    this.primerTexto3 = texto;
    this.setTextoOne.emit(texto);
  }

  agregarTextoPTwo(texto: string) {
    this.primerTextoTwo = texto;
    this.setTextoOne.emit(texto);
  }

  agregarSegundoTexto(texto: string) {
    this.segundoTexto = texto;
    this.setTextoTwo.emit(texto);
  }

  setText( text: string ) {
    
    if( text ) {
      return replaceTexto(text);
    };

    return '';

  }

}
