import { Component, EventEmitter, Input, OnInit, Output, OnChanges, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as Quill from 'quill';
import { ContentChange } from 'ngx-quill';
@Component({
  selector: 'app-upload-text',
  templateUrl: './upload-text.component.html',
  styleUrls: ['./upload-text.component.scss']
})
export class UploadTextComponent implements OnInit, OnChanges {

  @Output() setText = new EventEmitter<string>();

  @Input() html:string = '';
  @Input() maxLength = 500;
  @Input() tipoNotificacion: any;
  @Input() idEditor: string = 'container-editor';
  @Input() opcion: any;

  valorAnterior: string = '';

  htmls: any = {
    value: this.html
  };

  editorLength: number = 0;

  editorStyle = {
    maxwidth: '500px'
  }

  showPanel  = false;

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large"] }],
      ["bold"],
      ["italic"],
      ["underline"],
      [{ color: [] }],
      [{ align: [] }],
    ]
  };

  public modulesQuill = {
    toolbar: [
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }],
      [{ size: ['small', false, 'large'] }],
      [{ align: [] }],
      ['link'],
    ]
  };

  formProperties = {
    title: {
      maxCaracteres: 40
    },
    rollover: {
      maxCaracteres: 100
    },
    menu: {
      maxCaracteres: 20
    },
    texto: {
      maxCaracteres: 500
    },
    textoSmall: {
      maxCaracteres: 100
    },
    link: {
      maxCaracteres: 20
    },
    vinculo: {
      maxCaracteres: 100
    },
    sub_title: {
      maxCaracteres: 300
    }

  };

  private ListForm: string[] = ["", "", "link", "textoSmall", "rollover", "title", "enlace", "paginacion", "paginas", "typelink", "menu", "texto", "sub_title"];
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  @HostListener('document:click', ['$event']) documentClickEvent($event: MouseEvent) {
    if (!document.getElementById(this.idEditor).contains($event.target as Node)) {
      // this.opcion.mostrar = false;
    }
  }

  isSetText = true;

  ngOnInit() {

    this.opcion.valor = this.html

    this.htmls = {value: this.html};
    if( this.isSetText ) {
      this.htmls = {value: this.html};
      this.isSetText = false;
    }
    
    this.initForm();
    var FontAttributor = Quill.import('formats/font');
    var fonts = ['worksans', 'worksansmedium', 'worksanssemibold', 'worksansextrabold', 'bitterbold', 'bittermedium', 'bitterregular', 'firesansbold', 'firesanslight', 'firesansregular', 'opensanslight','opensansregular','opensansmedium','opensansbold'];
    FontAttributor.whitelist = fonts;
    Quill.register(FontAttributor, true);
   
  }

  ngOnChanges(){

  }

  public actionBuild() {
    this.showPanel = !this.showPanel;

    // if(!this.showPanel) this.changeEventText()
  }

  public initForm() {
    this.form = this.formBuilder.group({
      "typelink": new FormControl(0),
      "link": new FormControl(""),
      "paginacion": new FormControl(true),
      "paginas": new FormControl(null),
      "enlace": new FormControl(""),
      "rollover": new FormControl(""),
      "texto": new FormControl(""),
      "textoSmall": new FormControl(""),
      "menu": new FormControl(""),
      "title": new FormControl(""),
      "effect": new FormControl(""),
      "size_img": new FormControl("big"),
      "mediaData": new FormControl(""),
      "sub_title": new FormControl(""),
      "image_link": new FormControl(""),
    })
  }

  caracteres = '';

  public changeEventText() {

    const boxes = document.getElementsByClassName('angular-editor-textarea')[0] as any; 

    this.caracteres = boxes.innerText;
    // this.opcion.valor = boxes.innerHTML;

    // console.log(boxes.innerText.length);
    
    // return;
    if (this.caracteres.length > this.maxLength) {

      $('.angular-editor-textarea').empty();
      this.html = this.valorAnterior;

      $('.angular-editor-textarea').append(this.html);
      this.opcion.valor = boxes.innerHTML;

      // this.editorLength = boxes[0].children[0].innerText.length;
      
    }else{
      
      this.editorLength = this.caracteres.length;
      
      if(this.caracteres.replace(/\s+/g, "").replace(/&nbsp;/g, '') == ''){
        // this.opcion.valor = '';
        localStorage.setItem("pTexto", '')
      }else{
        this.opcion.valor = boxes.innerHTML;
        // if(this.opcion.editor === 1) localStorage.setItem("pTexto", boxes.innerHTML);
        // if(this.opcion.editor === 2) localStorage.setItem("sTexto", boxes.innerHTML);
      }

      // this.valorAnterior = this.opcion.valor
      this.valorAnterior = boxes.innerHTML
    }
  
  }

  validateAndEmit($event: ContentChange, maxLength: number, eventType: number) {
    if(this.form.get(this.ListForm[eventType]).value == " ") return;
    let dataOnlyText = this.deleteHtml(this.form.get(this.ListForm[eventType]).value);  

    if (dataOnlyText.length > this.maxLength) {
      $event.editor.deleteText(this.maxLength, dataOnlyText.length);
    }else{
      this.editorLength = dataOnlyText.length;
      let toEmit = (dataOnlyText == "") ? "" : this.form.get(this.ListForm[eventType]).value;
      
      if(toEmit.replace(/\s+/g, "") == '<p></p>'){
        this.setText.emit('');
      }else{
        this.setText.emit(toEmit);
      }
    }

  }

  deleteHtml(data: String) {
    var toReturn = (data) ? data.replace(/<[^>]*>?/g, '') : "";
    toReturn = toReturn.replace(/(\r\n|\n|\r)/gm, "");

    return toReturn;
  }


  editorConfig = {
    editable: true,
    maxHeight: 10,
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };


}

