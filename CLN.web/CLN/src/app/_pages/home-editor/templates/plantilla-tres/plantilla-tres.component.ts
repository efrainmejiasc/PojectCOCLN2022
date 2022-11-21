import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';

@Component({
  selector: 'app-plantilla-tres',
  templateUrl: './plantilla-tres.component.html',
  styleUrls: ['./plantilla-tres.component.scss', '../../../../_shared/styles/modals.scss', '../../../../_shared/styles/tables.scss', '../../../../_shared/styles/transition.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlantillaTresComponent implements OnInit {

  private images: Array<attribute[]> = [[]];
  private array = [];
  public itemCarrousel: any;
  public indexCarrousel: number = 1;
  public lengthCarrousel: number[] = [];
  public configTextEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "paragraphBig", false, false, true, false);
  public configMediaEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "imagen", false, true, true, false);
  public configLinkEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "link", false, false, true, false);
  public configTitleEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "title", false, false, true, false);
  @Input() nameSection: string;
  @Input() closeActionByOutsideClickPattern: any;
  @Input() template: templateStructure[];
  @Output() templateReturn = new EventEmitter<templateStructure>();
  @Output() paginationData = new EventEmitter<number>();
  @Input() color: string;
  @Input() index: any;
  @Input() builder: boolean;
  @Input() pagination: boolean;
  @Input() pages: number;
  public templateOne: templateStructure;
  public background: string;
  private colorBackground: string;
  public textDataMaster: textData = new textData();
  public indexTemplate: any;
  public indexCarrouselEditor: number = 1;
  public viewImage: boolean = false;
  ngOnInit() {
    /*this.images.forEach((x, i) => {
      this.array.push({
        imagen: x,
        titulo: 'Conéctate con el MEN',
        subtitulo: '8 de enero de 2021 - 8:00 a.m',
        texto: 'El próximo viernes se realizará la primera versión de “Conéctate con el MEN” del año, en donde el tema a tratar será: Directiva 018 de 2020 - Calendario académico en alternancia y ejecución de recursos FOME.',
        url: 'https://hipertextual.com/2020/08/referencia-nolan-tenet'
      });
    });
    this.itemCarrousel = this.array[this.indexCarrousel];
    for (let i = 0; i < this.array.length; i++) {
      this.lengthCarrousel.push(i);
    }*/
    //this.activeAutomaticCarrousel();
    (!this.builder) ? this.initCarrousel(1) : "";
  }

  private activeAutomaticCarrousel() {
    setTimeout(() => {
      (this.indexCarrousel < this.array.length - 1) ? this.indexCarrousel++ : this.indexCarrousel = 0;
      this.itemCarrousel = this.array[this.indexCarrousel];
      this.activeAutomaticCarrousel();
    }, 10000);
  }

  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const templateEvent = changes["template"];
    const colorEvent = changes["color"];
    const indexEvent = changes["index"];
    const paginationEvent = changes["pagination"];
    const pagesEvent = changes["pages"];
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (paginationEvent && paginationEvent.currentValue) {
      if (!paginationEvent.currentValue) {
        this.sizePaginator = 1;
      } else {
        this.sizePaginator = paginationEvent.currentValue;
      }
      this.buildGenerateEditorByPage();
    }
    if (pagesEvent && pagesEvent.currentValue) {
      if (this.templateOne) {
        /*this.sizePaginator = pagesEvent.currentValue;
        this.buildGenerateEditorByPage();*/
        this.arrayPage = [];
        for (let i = 0; i < parseInt(pagesEvent.currentValue); i++) {
          this.arrayPage.push(i + 1);
        }
        this.templateOne.attributes.filter(head => head.name == "pages")[0].value = pagesEvent.currentValue.toString();
      }
    }
    if (colorEvent && colorEvent.currentValue) {
      this.colorBackground = colorEvent.currentValue;
      this.buildGenerateEditorByPage();
    }
    if (templateEvent && templateEvent.currentValue) {
      this.templateOne = templateEvent.currentValue.filter(data => data.name == this.nameSection && data.idTemplate == 3)[0];
      this.buildGenerateEditorByPage();
    }
    if (indexEvent && indexEvent.currentValue) {
      this.indexTemplate = indexEvent.currentValue;
    }
  }

  private buildTemplate() {
    if (this.templateOne) {
      this.textDataMaster = new textData();
      if (this.templateOne.attributes.filter(head => head.name == "pages")[0].value != "") {
        this.sizePaginator = parseInt(this.templateOne.attributes.filter(head => head.name == "pages")[0].value);
        this.arrayPage = [];
        for (let i = 0; i < this.sizePaginator; i++) {
          this.arrayPage.push(i + 1);
        }
      } else {
        this.templateOne.attributes.filter(head => head.name == "pages")[0].value = this.sizePaginator.toString();
      }
      this.paginationData.emit(this.sizePaginator);
      if (this.templateOne.attributes.filter(head => head.name == "title" + this.indexCarrouselEditor)[0]) {
        this.textDataMaster.titleEffect = this.templateOne.attributes.filter(head => head.name == "titleEffect" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.enlaceEffect = this.templateOne.attributes.filter(head => head.name == "enlaceEffect" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.title = this.templateOne.attributes.filter(head => head.name == "title" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.link = this.templateOne.attributes.filter(head => head.name == "link" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.enlace = this.templateOne.attributes.filter(head => head.name == "enlace" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.typelink = this.templateOne.attributes.filter(head => head.name == "typelink" + this.indexCarrouselEditor)[0].value;
        this.textDataMaster.text_roll = this.templateOne.attributes.filter(head => head.name == "textRoll" + this.indexCarrouselEditor)[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.indexCarrouselEditor)[0].value) {
          this.textDataMaster.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.indexCarrouselEditor)[0].value;
          this.viewImage = true;
        } else {
          this.textDataMaster.mediaUrl = null;
        }
        this.templateReturn.emit(this.templateOne);
      } else {
        var list: Array<attribute> = [new attribute(0, "title" + this.indexCarrouselEditor, ""), new attribute(0, "text_one" + this.indexCarrouselEditor, ""), new attribute(0, "link" + this.indexCarrouselEditor, ""), new attribute(0, "enlace" + this.indexCarrouselEditor, ""), new attribute(0, "enlaceEffect" + this.indexCarrouselEditor, ""), new attribute(0, "type_media" + this.indexCarrouselEditor, ""), new attribute(0, "media_url" + this.indexCarrouselEditor, ""), new attribute(0, "uploadStatus" + this.indexCarrouselEditor, ""), new attribute(0, "titleEffect" + this.indexCarrouselEditor, ""), new attribute(0, "textEffect" + this.indexCarrouselEditor, ""), new attribute(0, "mediaEffect" + this.indexCarrouselEditor, ""), new attribute(0, "typelink" + this.indexCarrouselEditor, "btn"), new attribute(0, "textRoll" + this.indexCarrouselEditor, "")]
        list.forEach(lt => {
          this.templateOne.attributes.push(lt);
        });
        this.buildTemplate();
      }
    } else {
      this.templateOne = new templateStructure();
      this.templateOne.id = 0;
      this.templateOne.name = this.nameSection;
      this.templateOne.idTemplate = 3;
      this.templateOne.state = "Activo";
      var list: Array<attribute> = [new attribute(0, "pages", "1"), new attribute(0, "title" + this.indexCarrouselEditor, ""), new attribute(0, "text_one" + this.indexCarrouselEditor, ""), new attribute(0, "link" + this.indexCarrouselEditor, ""), new attribute(0, "enlace" + this.indexCarrouselEditor, ""), new attribute(0, "enlaceEffect" + this.indexCarrouselEditor, ""), new attribute(0, "type_media" + this.indexCarrouselEditor, ""), new attribute(0, "media_url" + this.indexCarrouselEditor, ""), new attribute(0, "uploadStatus" + this.indexCarrouselEditor, ""), new attribute(0, "titleEffect" + this.indexCarrouselEditor, ""), new attribute(0, "textEffect" + this.indexCarrouselEditor, ""), new attribute(0, "mediaEffect" + this.indexCarrouselEditor, ""), new attribute(0, "typelink" + this.indexCarrouselEditor, "btn"), new attribute(0, "textRoll" + this.indexCarrouselEditor, "")]
      this.templateOne.attributes = list;
      this.buildTemplate();
    }
  }
  private sizePaginator: number = 1;
  public arrayPage: number[] = []
  public buildGenerateEditorByPage() {
    this.arrayPage = [];
    console.group("PAge size 3")
    console.log(this.sizePaginator)
    for (let i = 0; i < this.sizePaginator; i++) {
      this.arrayPage.push(i + 1);
    }
    console.log(this.arrayPage)
    console.groupEnd()
    this.buildTemplate();
  }


  public changeEditorByPage(page) {
    this.indexCarrouselEditor = page;
    this.timeOutIDs.forEach(id => clearTimeout(id));
    console.group("DATA BUILDER BOOLEAN")
    console.log(this.builder)
    console.groupEnd();
    if (!this.builder) {
      this.timeOutIDs.push(
        setTimeout(() => {
          ((this.indexCarrouselEditor + 1) < this.arrayPage.length) ? this.indexCarrouselEditor = this.indexCarrouselEditor + 1 : this.indexCarrouselEditor = 0;
          this.initCarrousel(this.indexCarrouselEditor)
        }, 20000)
      );

    }
    this.buildTemplate();
  }

  private timeOutIDs: any[] = [];
  public initCarrousel(index) {
    this.timeOutIDs.forEach(id => clearTimeout(id));
    this.indexCarrouselEditor = index;

    this.buildTemplate();
    //(index >= 0 && index < this.imageArray.length) ? this.imageUrl = this.imageArray[index].src : "";
    //(index >= 0 && index < this.imageArray.length) ? this.link = this.imageArray[index].link : "";
    this.timeOutIDs.push(
      setTimeout(() => {
        ((index + 1) < (this.arrayPage.length + 1)) ? index = index + 1 : index = 1;
        //console.log("SOLICITANDO EL INDICE NUMERO == " + index);
        this.initCarrousel(index);
      }, 20000)
    );
    console.groupEnd();
  }

  public next() {
    ((this.indexCarrouselEditor) < this.sizePaginator) ? this.indexCarrouselEditor = this.indexCarrouselEditor + 1 : "";
    this.buildTemplate();
  }

  url: string;
  public fourSection: boolean = false;
  public finalUrl: any;
  private fileData: any = null;
  public setData(event, type) {
    switch (type) {
      case 1:
        if (event) {
          this.fileData = event;
          this.templateOne.attributes.filter(head => head.name == "type_media" + this.indexCarrouselEditor)[0].value = "imagen";
          const reader = new FileReader();
          reader.onload = e => this.templateOne.attributes.filter(head => head.name == "media_url" + this.indexCarrouselEditor)[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event);
        }
        break;
      case 2:
        this.templateOne.attributes.filter(head => head.name == "title" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 4:
        this.templateOne.attributes.filter(head => head.name == "text_one" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 5:
        this.templateOne.attributes.filter(head => head.name == "enlace" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 6:
        this.templateOne.attributes.filter(head => head.name == "link" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 7:
        this.templateOne.attributes.filter(head => head.name == "typelink" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 8:
        this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 9:
        this.templateOne.attributes.filter(head => head.name == "titleEffect" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 11:
        this.templateOne.attributes.filter(head => head.name == "textEffect" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 12:
        this.templateOne.attributes.filter(head => head.name == "enlaceEffect" + this.indexCarrouselEditor)[0].value = event;
        break;
      case 13:
        this.templateOne.attributes.filter(head => head.name == "textRoll" + this.indexCarrouselEditor)[0].value = event;
        break;
    }
    this.buildTemplate();
  }

  public mediaActivated: boolean = false;
  private saveMedia(file: any) {
    if (this.templateOne) {
      this.mediaActivated = true;
      this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.indexCarrouselEditor)[0].value = "uploading";
      var formData: FormData = new FormData();
      formData.append("multimediaComponent", file, file.name);
      this.builderService.uploadeMedia(file)
        .subscribe(data => {
          this.mediaActivated = false;
          this.templateOne.attributes.filter(head => head.name == "media_url" + this.indexCarrouselEditor)[0].value = "../../../../../assets/upload/ComponentesMultimediaHome/" + data;
          this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.indexCarrouselEditor)[0].value = "uploaded";
          this.buildTemplate();
        })
    }
  }

  constructor(private builderService: BuilderEditorService, private router: Router) { }



  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }

  public hreFunction(route) {
    if (route != undefined && route != "" && !this.builder) window.open(route, '_blank');
  }

  public goTo(route) {
    if (route != undefined && route != "" && !this.builder) this.router.navigate([route]);
  }

  deleteHtml(data: string) {
    return (data) ? data.replace(/<[^>]*>?/g, '') : "";
  }

}
