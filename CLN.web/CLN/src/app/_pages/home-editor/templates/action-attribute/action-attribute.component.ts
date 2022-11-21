import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentChange } from 'ngx-quill';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import * as Quill from 'quill';
@Component({
  selector: 'app-action-attribute',
  templateUrl: './action-attribute.component.html',
  styleUrls: ['./action-attribute.component.scss',
    "../../../../_shared/styles/modals.scss", '../../../../_shared/styles/transition.scss']
})
export class ActionAttributeComponent implements OnInit, OnChanges {

  concatenarTextoEdicion(arrayquillEditorOps:any) {
    let textoDeEdicion = "";
    for (let index = 0; index < arrayquillEditorOps.length; index++) {
      if (arrayquillEditorOps[index].insert) {
        textoDeEdicion += arrayquillEditorOps[index].insert;
      }
    }
    return textoDeEdicion;
  }

  editorStyle = {
    maxwidth: '500px'
  }
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
    textoMedium: {
      maxCaracteres: 357
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

  @Input() configAction: actionsConfiguration;
  @Input() textData: textData;
  @Input() closeActionByOutsideClick: any;
  @Input() index: number;
  @Input() templateId: any[];
  @Input() effectType: any[];
  @Input() pageConfig: number;
  @Output() fileReturn = new EventEmitter<File>();
  @Output() imageSizeReturn = new EventEmitter<String>();
  @Output() fileUrlReturn = new EventEmitter<String>();
  @Output() effect = new EventEmitter<String>();
  @Output() text = new EventEmitter<String>();
  @Output() text_roll = new EventEmitter<String>();
  @Output() link = new EventEmitter<String>();
  @Output() vinculo = new EventEmitter<String>();
  @Output() pagination = new EventEmitter<boolean>();
  @Output() pages = new EventEmitter<number>();
  @Output() deleteSelected = new EventEmitter<String>();
  @Output() linkType = new EventEmitter<String>();
  public indexInput: number;
  public configuration: actionsConfiguration = new actionsConfiguration(false, false, false, false, false, "", false, false, false, false);
  public textDataMaster: textData = new textData();
  public typeDataMedia: String;
  public booleanMedia: boolean = false;
  public booleanVideo: boolean = false;
  public booleanImage: boolean = false;
  public isConfig: boolean = false;
  public sectionMediaUpload: boolean = true;
  public canChangeBackground: boolean = true;
  private pageSize: number = 1;
  public pageSizeConfig: number;
  ngOnChanges(changes: SimpleChanges) {
    const configuration = changes["configAction"];
    const textData = changes["textData"];
    const changeEvent = changes["closeActionByOutsideClick"];
    const changeIndex = changes["index"];
    const templateIdEvent = changes["templateId"];
    const pageConfigEvent = changes["pageConfig"];
    if (configuration && configuration.currentValue != undefined) {
      this.configuration = configuration.currentValue;
    }
    if (textData && textData.currentValue != undefined) {
      this.textDataMaster = textData.currentValue;
      this.typeDataMedia = this.textDataMaster.typeMedia;
      switch (this.typeDataMedia) {
        case "video":
          this.booleanMedia = true;
          this.booleanVideo = true;
          break;
        case "image":
          this.booleanMedia = true;
          this.booleanImage = true;
          break;
      }
    }
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (changeIndex && changeIndex.currentValue) {
      this.indexInput = changeIndex.currentValue;
    }
    if (templateIdEvent && templateIdEvent.currentValue) {
      var numberId: number = templateIdEvent.currentValue;
      if (numberId == 3) {
        this.isConfig = true;
        this.canChangeBackground = false;
        this.pageSize = 1;
      } else if (numberId == 5 || numberId == 6) {
        this.isConfig = true;
        this.pageSize = 1;
      }
    }
    if (pageConfigEvent && pageConfigEvent.currentValue) {
      this.pageSizeConfig = pageConfigEvent.currentValue;
    }
  }
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.initForm();
    var FontAttributor = Quill.import('formats/font');
    var fonts = ['worksans', 'worksansmedium', 'worksanssemibold', 'worksansextrabold', 'bitterbold', 'bittermedium', 'bitterregular', 'firesansbold', 'firesanslight', 'firesansregular', 'opensanslight','opensansregular','opensansmedium','opensansbold'];
    FontAttributor.whitelist = fonts;
    Quill.register(FontAttributor, true);
  }
  public file: File[] = [];
  public exts = ["MP4"];
  public extsTwo = ["JPG", "PNG", "GIF", "JPEG"];
  public maxSize = [30, 2]
  public typeFile: String = null;
  public onFileDropped(event) {
    //console.log('event de carga imagenes ' + event);
    if (event.length <= 1) {
      for (const item of event) {
        if (this.file.length < 1) {
          var tipo = item.name.split(".");
          var isFile = null;
          (this.configuration.typeEditorText == 'imagen' || this.configuration.typeEditorText == 'imagen_link') ? isFile = this.extsTwo.filter(ext => ext.toLowerCase() == tipo[1].toLowerCase())[0] : (this.configuration.typeEditorText == 'video') ? isFile = this.exts.filter(ext => ext.toLowerCase() == tipo[1].toLowerCase())[0] : "";
          this.typeFile = isFile;
          var sizeMaxP = (isFile != "MP4") ? this.maxSize[1] * 1000000 : this.maxSize[0] * 1000000;
          if (isFile != null && sizeMaxP >= item.size) {
            this.preview(item);
            this.file.push(item)
          } else {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Archivo no permitido. El tamaño máximo para archivos de video es de 30Mb y para archivos de imágenes es de 2Mb</p>`;
          }
        } else {
          this.file = [];
          this.onFileDropped(event);
        }
      }
    } else {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Solo se puede cargar 1 archivo</p>`;
    }

  }
  public imagePath;
  imgURL: any = null;
  public message: string;
  preview(files) {
    if (files) {
      const file = files;
      const reader = new FileReader();
      reader.onload = e => this.imgURL = reader.result;
      reader.readAsDataURL(file);
      this.fileReturn.emit(file);
      (this.configuration.editorImageSize && this.form.get("size_img").value) ? this.imageSizeReturn.emit(this.form.get("size_img").value) : "";
      this.fileReturn.emit(null)
    }
  }

  addUrlMedia() {
    const formReader = this.form.value;
    const regex = new RegExp("https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)");
    let allFine: boolean = true;
    //(regex.test(String(formReader.mediaData.trim()).toLowerCase())) ? allFine = true : allFine = false;
    let linkVideo: String = this.form.get("mediaData").value;
    let other = linkVideo.search("https://www.youtube.com");
    let embed = linkVideo.search("embed");
    if (other == 0) {
      let dataToWork = linkVideo.split("?").join("").split("&")[0];
      let data = dataToWork.split("=")[1];
      if (embed != -1) {
        this.urlClean = linkVideo;
      } else {
        this.urlClean = "https://www.youtube.com/embed/" + data;
      }
    }
    (allFine) ? this.fileUrlReturn.emit(this.urlClean) : "";
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
      "textoMedium": new FormControl(""),
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

  public editorOpen: boolean = false;
  public editorOpenEffects: boolean = false;
  public editorOpenConfig: boolean = false;
  public actionBuild(action) {
    switch (action) {
      case 1:
        break;
      case 2:
        this.activeEditor();
        break;
      case 3:
        this.activeEditorConfguration();
        break;
      case 4:
        this.activeEditorEffects()
        break;
    }
  }

  @Output() actionEditorEffect = new EventEmitter<String>();
  @Output() isTextEditor = new EventEmitter<boolean>(false);
  @Output() isMediaEditor = new EventEmitter<boolean>(false);
  activeEditorEffects() {
    if (this.editorOpen == false) {
      (this.editorOpenEffects) ? this.editorOpenEffects = false : this.editorOpenEffects = true;
      (this.editorOpenEffects) ? this.form.reset() : "";
      (this.editorOpenEffects && (this.textDataMaster.titleEffect != "" || this.textDataMaster.subTitleEffect != "" || this.textDataMaster.textEffect != "" || this.textDataMaster.enlaceEffect != "" || this.textDataMaster.mediaEffect != "")) ? this.form.get("effect").setValue(this.effectType) : "";
      (this.editorOpenEffects && this.textDataMaster.subTitleEffect != "") ? this.form.get("effect").setValue(this.effectType) : "";
      if (this.editorOpenEffects) {
        this.isTextEditor.emit(true);
      } else {
        this.isTextEditor.emit(false);
      }
      let objectId = "windoweffects" + this.indexInput;
      setTimeout(() => {
        let id = document.getElementById(objectId);
        if (this.editorOpenEffects) {
          var rect = id.getBoundingClientRect();
          var windowSize = window.innerWidth;
          if (objectId.includes('1004')) {
            windowSize = window.innerHeight;
            if ((Math.ceil(rect.top) + id.offsetHeight) > windowSize) {
              var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 20;
              /*id.style.left = "-285px";
              id.style.top = "-235px";*/
            }

          } else if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
            var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 20;
            id.style.left = "-" + reducir + "px";
          }
        }
      }, 1);
    } else {
      this.editorOpenEffects = false;
    }
  }

  public activeAlertPages: boolean = false;
  activeEditorConfguration() {
    
    // ocultar editor de fondo
    this.editorBackgroundOpen = false;
    this.mediaActionBackground = false;
    if (this.editorOpenConfig)
      return;
    
    this.editorOpen = false;
    this.form.reset();
    (this.editorOpenConfig) ? (this.form.get("paginas").value >= this.pageSize) ? this.editorOpenConfig = false : "" : this.editorOpenConfig = true;
    (this.pageSizeConfig) ? this.form.get("paginas").setValue(this.pageSizeConfig) : "";
    var objectId = "windowconfiguration" + this.indexInput;
    setTimeout(() => {
      var id = document.getElementById(objectId);
      if (this.editorOpenConfig) {
        var rect = id.getBoundingClientRect();
        var windowSize = window.innerWidth;
        if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
          var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 20;
          id.style.left = "-" + reducir + "px";
        }
      }
    }, 1);
  }

  activeEditor() {
    if (this.editorOpenEffects == false) {
      (this.editorOpen) ? this.editorOpen = false : this.editorOpen = true;
      (this.editorOpen) ? this.form.reset() : "";
      // (this.editorOpen && this.textDataMaster.text != "") ? (this.configuration.typeEditorText == "paragraphBig") ? this.form.get("texto").setValue(this.textDataMaster.text) : this.form.get("textoSmall").setValue(this.textDataMaster.text) : "";
      (this.editorOpen && this.textDataMaster.text != "") ?
        (this.configuration.typeEditorText == "paragraphBig") ? this.form.get("texto").setValue(this.textDataMaster.text) :
        (this.configuration.typeEditorText == "paragraphMedium") ? this.form.get("textoMedium").setValue(this.textDataMaster.text) :
        this.form.get("textoSmall").setValue(this.textDataMaster.text) : "";
      //(this.editorOpen && this.textDataMaster.text2 != "") ? (this.configuration.typeEditorText == "paragraphBig") ? this.form.get("texto").setValue(this.textDataMaster.text2) : this.form.get("textoSmall").setValue(this.textDataMaster.text2) : "";
      (this.editorOpen && this.textDataMaster.button != "") ? this.form.get("menu").setValue(this.textDataMaster.button) : "";
      (this.editorOpen && this.textDataMaster.title != "") ? this.form.get("title").setValue(this.textDataMaster.title) : "";
      (this.editorOpen && this.textDataMaster.sub_title != "") ? this.form.get("sub_title").setValue(this.textDataMaster.sub_title) : "";
      (this.editorOpen && this.textDataMaster.enlace != "") ? this.form.get("link").setValue(this.textDataMaster.enlace) : "";
      (this.editorOpen && this.textDataMaster.link != "") ? this.form.get("enlace").setValue(this.textDataMaster.link) : "";
      (this.editorOpen && this.textDataMaster.typelink != "") ? (this.textDataMaster.typelink == "btn") ? this.form.get("typelink").setValue(0) : this.form.get("typelink").setValue(1) : "";    
      (this.textDataMaster.imageLink != "") ? this.form.get("image_link").setValue(this.textDataMaster.imageLink):"";
      if (this.configuration.editorText && this.editorOpen) {
        this.isTextEditor.emit(true);
      } else if (this.configuration.editorImage) {
        this.isMediaEditor.emit(true);
      } else {
        this.isMediaEditor.emit(false);
        this.isMediaEditor.emit(null);
        this.isTextEditor.emit(false);
        this.isTextEditor.emit(null);
      }

      (this.editorOpen && this.textDataMaster.text_roll != "") ? this.form.get("rollover").setValue(this.textDataMaster.text_roll) : "";
      var divIdName = "";
      (this.configuration.editorImage) ? divIdName = "windowmedia" : (this.configuration.editorBackground) ? divIdName = "windowbackground" : (this.configuration.editorText) ? divIdName = "windowtext" : "";
      var objectId = divIdName + this.indexInput;
      setTimeout(() => {
        var id = document.getElementById(objectId);
        if (this.editorOpen) {

          var rect = id.getBoundingClientRect();
          var windowSize = window.innerWidth;

          if (objectId.includes('1004')) {
            windowSize = window.innerHeight;
            id.style.top = "-" + 150 + "px";
            id.style.left = "-" + id.offsetWidth + "px";
          }
          else if (objectId.includes('1008')) {
            id.style.top = "0px";
            id.style.left = "-" + id.offsetWidth + "px";
          }
          else if (objectId.includes('1002')) {
            id.style.left = "-250px";
          }
          else if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
            var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 70;
            id.style.left = "-" + reducir + "px";
          }
        }
      }, 1);
      (!this.editorOpen) ? this.imgURL = null : "";
    }
  }
  public editorBackgroundOpen: boolean = false;
  editBackground() {
    // ocultar editor de paginacion
    if (this.form.get("paginas").value >= this.pageSize)
      this.editorOpenConfig = false;
    // else
      // return;

    this.edyting = false;
    this.editorColor = false;
    this.mediaActionBackground = false;
    (this.editorBackgroundOpen) ? this.editorBackgroundOpen = false : this.editorBackgroundOpen = true;
    if (!this.editorBackgroundOpen) {

    }
    var divIdName = "windowbackground";
    var objectId = divIdName + this.indexInput;
    setTimeout(() => {
      var id = document.getElementById(objectId);
      if (this.editorBackgroundOpen) {
        var rect = id.getBoundingClientRect();
        var windowSize = window.innerWidth;
        if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
          var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 20;
          id.style.left = "-" + reducir + "px";
        }
      }
    }, 1);
  }
  public identifyClickOutSide(e) {
    var id = 'selectLoop' + this.indexInput;
    var b = document.getElementById(id);
    if (b) {
      if (!b.contains(e.target)) {
        (this.configuration.editorText && this.editorOpen) ? "" : "";
        (this.configuration.editorImage && this.editorOpen) ? "" : "";
        this.editorOpen = false;
        this.editorOpenEffects = false;
        (this.editorOpenConfig) ? (this.form.get("paginas").value >= this.pageSize) ? this.editorOpenConfig = false : "" : "";
        this.editorBackgroundOpen = false;
        (!this.edytingAction) ? this.mediaActionBackground = false : "";
        (!this.editorOpen) ? this.imgURL = null : "";
      }
    }
  }
  private ListForm: string[] = ["", "", "link", "textoSmall", "rollover", "title", "enlace", "paginacion", "paginas", "typelink", "menu", "texto", "sub_title", "textoMedium"];
  private urlClean: String = null;
  public changeEventText($event, eventType) {
    switch (eventType) {
      case 1:
        this.text.emit(this.color);
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        this.validateAndEmit($event, this.formProperties[this.ListForm[eventType]].maxCaracteres, eventType)
        break;
      case 6:
        this.vinculo.emit(this.form.get("enlace").value)
        break;
      case 7:
        this.pagination.emit(this.form.get("paginacion").value)
        break;
      case 8:
        if (this.form.get("paginas").value >= this.pageSize && this.form.get("paginas").value <= 10) {
          this.pages.emit(this.form.get("paginas").value)
        }
        if (this.form.get("paginas").value > 10) {
          this.pages.emit(10)
        }//modificado
        break;
      case 9:
        (this.form.get("typelink").value == 0) ? this.linkType.emit("btn") : this.linkType.emit("link");
        break;
      case 10:
      case 11:
        this.validateAndEmit($event, this.formProperties[this.ListForm[eventType]].maxCaracteres, eventType)
        break;
      case 12:
        this.validateAndEmit($event, this.formProperties[this.ListForm[eventType]].maxCaracteres, eventType)
        break;
      case 13:
        this.vinculo.emit(this.form.get("image_link").value)
        break;

    }
  }
  validateAndEmit($event: ContentChange, maxLength: number, eventType: number) {
    if(this.form.get(this.ListForm[eventType]).value == " ") return;
    let dataOnlyText = this.deleteHtml(this.form.get(this.ListForm[eventType]).value);
    if (dataOnlyText.length > maxLength) {
      $event.editor.setContents($event.oldDelta, 'silent');
      return;
    }

    var toEmit = (dataOnlyText == "") ? "" : this.form.get(this.ListForm[eventType]).value;
    (eventType == 4) ? this.text_roll.emit(toEmit) : this.text.emit(toEmit);
  }

  public deleteAction() {
    this.deleteSelected.emit("delete")
  }

  descripcionlenght: number = 1000;
  private contentText: String = "";
  maxlengthdescripcion(e) {
    var content = e.editor.getData();
    this.contentText = content.replace(/<[^>]*>?/g, '');
    this.descripcionlenght = (this.formProperties.title.maxCaracteres + 1) - content.replace(/<[^>]*>?/g, '').length;
    if (e.editor.getLength() > 40) {
      e.editor.deleteText(40, e.editor.getLength());
    }
  }

  minLength() {
    this.activeAlertPages = false;
    (this.form.get("paginas").value < this.pageSize) ? this.activeAlertPages = true : "";
  }

  setEffect() {
    this.effect.emit(this.form.get("effect").value)
  }

  changeImageStyle() {
    this.imageSizeReturn.emit(this.form.get("size_img").value)
  }

  public color: String = "#FFF";
  public editorBackDisplay: boolean = true;
  public editorColor: boolean = false;
  public mediaActionBackground: boolean = false;
  public edyting: boolean = false;
  private edytingAction: boolean = false;
  actionBack(action) {
    this.editorColor = false;
    this.mediaActionBackground = false;
    switch (action) {
      case 1:
        this.edyting = true;
        this.editorColor = true;
        break;
      case 2:
        this.edytingAction = true;
        setTimeout(() => {
          this.edytingAction = false;
          this.editorBackgroundOpen = false;
        }, 1);
        this.mediaActionBackground = true;
        let divIdName = "windowmedia"
        let objectId = divIdName + this.indexInput;
        setTimeout(() => {
          var id = document.getElementById(objectId);
          if (this.mediaActionBackground) {
            var rect = id.getBoundingClientRect();
            var windowSize = window.innerWidth;
            if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
              var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 20;
              id.style.left = "-" + reducir + "px";
            }
          }
        }, 1);
        break;
    }
  }
  public numberValidate(event) {
    if (event.key >= 0 && event.key != " ") {
      return true;
    } else {
      return false;
    }
  }
  public numberMaxValidate(event) {
    if (this.form.get("paginas").value > 10) {
      this.form.get("paginas").setValue(10);
    }
  }
  public numberMinValidate(event) {
    if (this.form.get("paginas").value < this.pageSize) {
      this.form.get("paginas").setValue(this.pageSize)
    }
  }
  deleteHtml(data: String) {
    var toReturn = (data) ? data.replace(/<[^>]*>?/g, '') : "";
    toReturn = toReturn.replace(/(\r\n|\n|\r)/gm, "");

    return toReturn;
  }

  cerrarBackgroundEditor(){
    this.editorBackgroundOpen = false;
  }
}
