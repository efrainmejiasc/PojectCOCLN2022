import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';

@Component({
  selector: 'app-plantilla-seis',
  templateUrl: './plantilla-seis.component.html',
  styleUrls: ['./plantilla-seis.component.scss', '../../../../_shared/styles/modals.scss', '../../../../_shared/styles/transition.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlantillaSeisComponent implements OnInit {

  constructor(private builderService: BuilderEditorService, private sanitizer: DomSanitizer) { }

  public configTextEditorMedium: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "paragraphBig", false, false, true, false);
  public configTextEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "paragraph", false, false, true, false);
  public configMediaEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "imagen_link", false, true, true, false);
  public configLinkEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "link", false, false, true, false);
  public configTitleEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "title", false, false, true, false);

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  @Input() nameSection: string;
  @Input() closeActionByOutsideClickPattern: any;
  @Input() template: templateStructure[];
  @Output() templateReturn = new EventEmitter<templateStructure>();
  @Input() color: string;
  @Input() index: any;
  @Input() builder: boolean;
  @Input() pagination: boolean;
  @Output() paginationData = new EventEmitter<number>();
  @Input() pages: number;
  @Input() backgroundImage: File;
  public templateOne: templateStructure;
  public background: string;
  private colorBackground: string;
  public indexTemplate: any;
  public title: string;
  public textDataMaster: textData = new textData();
  public textDataMasterTwo: textData = new textData();
  public textDataMasterThree: textData = new textData();
  // public textDataMasterOneMedium: textData = new textData();
  // public textDataMasterTwoMedium: textData = new textData();
  // public textDataMasterThreeMedium: textData = new textData();

  // public textDataMasterButton: textData = new textData();

  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const templateEvent = changes["template"];
    const colorEvent = changes["color"];
    const indexEvent = changes["index"];
    const paginationEvent = changes["pagination"];
    const pagesEvent = changes["pages"];
    const bckimgEvent = changes["backgroundImage"];
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (colorEvent && colorEvent.currentValue) {
      this.colorBackground = colorEvent.currentValue;
      this.saveMediaBackground(this.colorBackground, 2);
    }
    if (paginationEvent && paginationEvent.currentValue) {
      if (!paginationEvent.currentValue) {
        this.sizePaginator = 2;
      }
      this.buildGenerateEditorByPage();
    }
    if (pagesEvent && pagesEvent.currentValue) {
      if (this.templateOne) {
        // this.sizePaginator = pagesEvent.currentValue;
        // this.buildGenerateEditorByPage();
        this.arrayPage = [];
        var first = 0;
        if (pagesEvent.currentValue > 10) {
          pagesEvent.currentValue = 10;
        }
        if (pagesEvent.currentValue < 2) {
          pagesEvent.currentValue = 2;
        }
        for (let i = 0; i < pagesEvent.currentValue; i++) {
          this.arrayPage.push([])
          for (let j = first; j < first + 3; j++) {
            this.arrayPage[i].push(j);
          }
          first = first + 3
        }
        this.templateOne.attributes.filter(head => head.name == "pages")[0].value = pagesEvent.currentValue.toString();
      }
    }
    if (templateEvent && templateEvent.currentValue) {
      this.templateOne = templateEvent.currentValue.filter(data => data.name == this.nameSection && data.idTemplate == 6)[0];
      this.buildGenerateEditorByPage();
    }
    if (indexEvent && indexEvent.currentValue) {
      this.indexTemplate = indexEvent.currentValue;
    }
    if (bckimgEvent && bckimgEvent.currentValue) {
      this.saveMediaBackground(bckimgEvent.currentValue, 1)
    }
  }

  public indexCarrouselEditor: number = 1;
  public viewImage: boolean = false;
  public viewImageTwo: boolean = false;
  public viewImageThree: boolean = false;
  // public viewImageOneMedium: boolean = false;
  // public viewImageTwoMedium: boolean = false;
  // public viewImageThreeMedium: boolean = false;

  public viewImageButton: boolean = false;
  private buildTemplate() {
    // console.log("buildTemplate - this.templateOne", this.templateOne);
    // console.log("link", this.templateOne.attributes.filter(head => head.name == "link" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value)
    
    if (this.templateOne) {

      this.textDataMaster = new textData();
      this.textDataMasterTwo = new textData();
      this.textDataMasterThree = new textData();
      // this.textDataMasterOneMedium = new textData();
      // this.textDataMasterTwoMedium = new textData();
      // this.textDataMasterThreeMedium = new textData();

      // this.textDataMasterButton = new textData();
      if (this.templateOne.attributes.filter(head => head.name == "pages")[0].value != "") {
        this.sizePaginator = parseInt(this.templateOne.attributes.filter(head => head.name == "pages")[0].value);
        this.arrayPage = [];
        var first = 0;
        if (this.sizePaginator > 10) {
          this.sizePaginator = 10;
        }
        if (this.sizePaginator < 2) {
          this.sizePaginator = 2;
        }
        for (let i = 0; i < this.sizePaginator; i++) {
          this.arrayPage.push([])
          for (let j = first; j < first + 3; j++) {
            this.arrayPage[i].push(j);
          }
          first = first + 3
        }
      } else {
        this.templateOne.attributes.filter(head => head.name == "pages")[0].value = this.sizePaginator.toString();
      }
      //this.templateOne.attributes.filter(head => head.name == "pages")[0].value = this.sizePaginator;
      this.paginationData.emit(this.sizePaginator);
      this.background = this.templateOne.attributes.filter(head => head.name == "background")[0].value;
      this.textDataMaster.title = this.templateOne.attributes.filter(head => head.name == "title")[0].value;
      this.textDataMaster.titleEffect = this.templateOne.attributes.filter(head => head.name == "titleEffect")[0].value;
      if (this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0]) {
        this.textDataMaster.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        this.textDataMaster.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        this.textDataMaster.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        // this.textDataMaster.text2 = this.templateOne.attributes.filter(head => head.name == "text_dos" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        this.textDataMaster.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        this.textDataMaster.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        this.textDataMaster.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value != "") {
          this.textDataMaster.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;
          this.viewImage = true;
        } else if (this.fileData != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMaster.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileData);
          this.fileData = null;
          this.viewImage = true;
        } else {
          this.textDataMaster.mediaUrl = null;
        }
        this.textDataMaster.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][0])[0].value;

        //Second section
        this.textDataMasterTwo.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        this.textDataMasterTwo.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        this.textDataMasterTwo.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        this.textDataMasterTwo.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        this.textDataMasterTwo.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        this.textDataMasterTwo.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value != "") {
          this.textDataMasterTwo.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
          this.viewImageTwo = true;
        } else if (this.fileDataTwo != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMasterTwo.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileDataTwo);
          this.fileDataTwo = null;
          this.viewImageTwo = true;
        } else {
          this.textDataMasterTwo.mediaUrl = null;
        }
        this.textDataMasterTwo.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][1])[0].value;
        
        //Third section
        this.textDataMasterThree.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        this.textDataMasterThree.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        this.textDataMasterThree.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;

        this.textDataMasterThree.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        this.textDataMasterThree.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        this.textDataMasterThree.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value != "") {
          this.textDataMasterThree.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
          this.viewImageThree = true;
        } else if (this.fileDataThree != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMasterThree.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileDataThree);
          this.fileDataThree = null;
          this.viewImageThree = true;
        } else {
          this.textDataMasterThree.mediaUrl = null;
        }
        this.textDataMasterThree.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][2])[0].value;
        
        /*//
        this.textDataMasterOneMedium.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        this.textDataMasterOneMedium.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        this.textDataMasterOneMedium.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        this.textDataMasterOneMedium.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        this.textDataMasterOneMedium.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        this.textDataMasterOneMedium.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value != "") {
          this.textDataMasterOneMedium.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;
          this.viewImageOneMedium = true;
        } else if (this.fileDataOneMedium != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMasterOneMedium.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileDataOneMedium);
          this.fileDataOneMedium = null;
          this.viewImageOneMedium = true;
        } else {
          this.textDataMasterOneMedium.mediaUrl = null;
        }
        this.textDataMasterOneMedium.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][3])[0].value;

        // 
        this.textDataMasterTwoMedium.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        this.textDataMasterTwoMedium.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        this.textDataMasterTwoMedium.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        this.textDataMasterTwoMedium.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        this.textDataMasterTwoMedium.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        this.textDataMasterTwoMedium.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value != "") {
          this.textDataMasterTwoMedium.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;
          this.viewImageTwoMedium = true;
        } else if (this.fileDataTwoMedium != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMasterTwoMedium.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileDataTwoMedium);
          this.fileDataTwoMedium = null;
          this.viewImageTwoMedium = true;
        } else {
          this.textDataMasterTwoMedium.mediaUrl = null;
        }
        this.textDataMasterTwoMedium.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][4])[0].value;

        // 
        this.textDataMasterThreeMedium.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        this.textDataMasterThreeMedium.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        this.textDataMasterThreeMedium.text = this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        this.textDataMasterThreeMedium.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        this.textDataMasterThreeMedium.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        this.textDataMasterThreeMedium.enlace = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        if (this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value != "") {
          this.textDataMasterThreeMedium.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
          this.viewImageThreeMedium = true;
        } else if (this.fileDataThreeMedium != null) {
          const reader = new FileReader();
          reader.onload = e => this.textDataMasterThreeMedium.mediaUrl = reader.result;
          reader.readAsDataURL(this.fileDataThreeMedium);
          this.fileDataThreeMedium = null;
          this.viewImageThreeMedium = true;
        } else {
          this.textDataMasterThreeMedium.mediaUrl = null;
        }
        this.textDataMasterThreeMedium.imageLink = this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][5])[0].value;
        */
        // fin secciones

        this.templateReturn.emit(this.templateOne);
      } else {
        console.log("buildTemplate - else (this.templateOne)", this.templateOne);
        this.arrayPage[this.indexCarrouselEditor - 1].forEach(element => {
          var list: Array<attribute> = [new attribute(0, "textEffect" + element, ""), new attribute(0, "mediaEffect" + element, ""), new attribute(0, "text_one" + element, ""), new attribute(0, "type_media" + element, ""), new attribute(0, "uploadStatus" + element, ""), new attribute(0, "media_url" + element, ""), new attribute(0, "media_enlace" + element, "")];
          list.forEach(lt => {
            this.templateOne.attributes.push(lt);
          });
        });
        this.buildTemplate();
      }
    } else {

      console.log("else buildTemplate - this.templateOne", this.templateOne);

      this.templateOne = new templateStructure();
      this.templateOne.id = 0;
      this.templateOne.name = this.nameSection;
      this.templateOne.state = "Activo";
      this.templateOne.idTemplate = 6;

      this.arrayPage[this.indexCarrouselEditor - 1].forEach(element => {
        var list: Array<attribute> = [
          new attribute(0, "titleEffect" + element, ""), new attribute(0, "textEffect" + element, ""),
          new attribute(0, "mediaEffect" + element, ""), new attribute(0, "text_one" + element, ""),
          new attribute(0, "type_media" + element, ""), new attribute(0, "uploadStatus" + element, ""),
          new attribute(0, "media_url" + element, ""), new attribute(0, "media_enlace" + element, ""),
          // new attribute(0, "link" + element, ""), new attribute(0, "typelink" + element, "btn"),
          // new attribute(0, "enlace" + element, "Ver mas")
        ];
        (element == 1) ? list.unshift(new attribute(0, "title", "")) : "";
        (element == 1) ? list.unshift(new attribute(0, "titleEffect", "")) : "";
        (element == 1) ? list.unshift(new attribute(0, "background", "")) : "";
        (element == 1) ? list.unshift(new attribute(0, "backgroundStatus", "")) : "";
        (element == 1) ? list.unshift(new attribute(0, "pages", this.sizePaginator.toString())) : "";

        list.forEach(lt => {
          this.templateOne.attributes.push(lt);
        });
      });
      this.buildTemplate();
    }
  }
  private sizePaginator: number = 1;
  public arrayPage: Array<number[]> = []
  public buildGenerateEditorByPage() {
    this.arrayPage = [];
    var first = 0;
    if (this.sizePaginator > 10) {
      this.sizePaginator = 10;
    }
    for (let i = 0; i < this.sizePaginator; i++) {
      this.arrayPage.push([])
      for (let j = first; j < first + 6; j++) {
        this.arrayPage[i].push(j);
      }
      first = first + 6
    }
    this.buildTemplate();
  }


  public changeEditorByPage(page) {
    this.indexCarrouselEditor = (page + 1);
    this.buildTemplate();
  }

  public next() {
    ((this.indexCarrouselEditor) < this.sizePaginator) ? this.indexCarrouselEditor = this.indexCarrouselEditor + 1 : "";
    this.buildTemplate();
  }

  url: string;
  public finalUrl: any;
  private fileData: any = null;
  private fileDataTwo: any = null;
  private fileDataThree: any = null;
  // private fileDataOneMedium: any = null;
  // private fileDataTwoMedium: any = null;
  // private fileDataThreeMedium: any = null;

  public setData(event, type, index) {

    switch (type) {
      case 1:
        if (event) {
          (index == 1) ? this.fileData = event : (index == 2) ? this.fileDataTwo = event : (index == 3) ? this.fileDataThree = event :
            // (index == 4) ? this.fileDataOneMedium = event : (index == 5) ? this.fileDataTwoMedium = event : (index == 6) ? this.fileDataThreeMedium = event :
            "";
          this.templateOne.attributes.filter(head => head.name == "type_media" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = "imagen";
          const reader = new FileReader();
          reader.onload = e => this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event, index);
        }
        break;
      case 2:
        this.templateOne.attributes.filter(head => head.name == "text_one" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
        this.buildTemplate();
        break;
      case 3:
        
        this.templateOne.attributes.filter(head => head.name == "title")[0].value = event;
        console.log("this.templateOne.attributes caso 7 pre buildTemplate", this.templateOne.attributes);
        this.buildTemplate();
        console.log("this.templateOne.attributes caso 7 pos buildTemplate", this.templateOne.attributes);
        break;
      case 4:
        this.templateOne.attributes.filter(head => head.name == "titleEffect")[0].value = event;
        this.buildTemplate();
        break;
      case 5:
        this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
        this.buildTemplate();
        break;
      case 6:
        this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
        this.buildTemplate();
        break;
      case 7:
        this.templateOne.attributes.filter(head => head.name == "media_enlace" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
        console.log("this.templateOne.attributes caso 7 pre buildTemplate", this.templateOne.attributes);        
        this.buildTemplate();
        console.log("this.templateOne.attributes caso 7 pos buildTemplate", this.templateOne.attributes);

        break;
      // case 8:
      //   this.templateOne.attributes.filter(head => head.name == "mediaEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 9:
      //   // this.templateOne.attributes.filter(head => head.name == "titleEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 10:
      //   this.templateOne.attributes.filter(head => head.name == "textEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 11:
      //   this.templateOne.attributes.filter(head => head.name == "enlaceEffect" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 12:
      //   this.templateOne.attributes.filter(head => head.name == "typelink" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 13:
      //   this.templateOne.attributes.filter(head => head.name == "textRoll" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 14:
      //   this.templateOne.attributes.filter(head => head.name == "mediaSize" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   break;
      // case 23:
      //   console.log("plantilla 6 - setData enlace 23", event);
      //   this.templateOne.attributes.filter(head => head.name == "enlace" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event; //)[0].value = event;
      //   break;
      // case 24:
      //   this.templateOne.attributes.filter(head => head.name == "l" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;//)[0].value = event;

      // case 103:
      //   this.templateOne.attributes.filter(head => head.name == "enlace")[0].value = event;
      //   this.buildTemplate();
      //   break;
      // case 104:
      //   this.templateOne.attributes.filter(head => head.name == "link")[0].value = event;
      //   this.buildTemplate();
      //   break;
      // case 108:
      //   this.templateOne.attributes.filter(head => head.name == "mediaEffect")[0].value = event;
      //   break;
      // case 109:
      //   this.templateOne.attributes.filter(head => head.name == "titleEffect")[0].value = event;
      //   break;
      // case 110:
      //   this.templateOne.attributes.filter(head => head.name == "textEffect")[0].value = event;
      //   break;
      // case 111:
      //   this.templateOne.attributes.filter(head => head.name == "enlaceEffect")[0].value = event;
      //   break;
      // case 112:
      //   this.templateOne.attributes.filter(head => head.name == "typelink")[0].value = event;
      //   break;
      // case 113:
      //   this.templateOne.attributes.filter(head => head.name == "textRoll")[0].value = event;
      //   break;
      // case 114:
      //   this.templateOne.attributes.filter(head => head.name == "mediaSize")[0].value = event;
      //   break;
      // case 8:
      //   // textMedium
      //   this.templateOne.attributes.filter(head => head.name == "text_dos" + this.arrayPage[this.indexCarrouselEditor - 1][index - 1])[0].value = event;
      //   this.buildTemplate();
      //   break;
    }
  }

  public mediaActivated: boolean = false;
  private saveMedia(file: any, index) {
    if (this.templateOne) {
      const position = this.indexCarrouselEditor;
      this.mediaActivated = true;
      this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[position - 1][index - 1])[0].value = "uploading";
      var formData: FormData = new FormData();
      formData.append("multimediaComponent", file, file.name);
      this.builderService.uploadeMedia(file)
        .subscribe(data => {
          this.templateOne.attributes.filter(head => head.name == "media_url" + this.arrayPage[position - 1][index - 1])[0].value = "../../../../../assets/upload/ComponentesMultimediaHome/" + data;
          this.templateOne.attributes.filter(head => head.name == "uploadStatus" + this.arrayPage[position - 1][index - 1])[0].value = "uploaded";
          this.buildTemplate();
        })
    }
  }

  private saveMediaBackground(file: any, type) {
    if (this.templateOne) {
      switch (type) {
        case 1:
          this.templateOne.attributes.filter(head => head.name == "backgroundStatus")[0].value = "uploading";
          var formData: FormData = new FormData();
          formData.append("multimediaComponent", file, file.name);
          this.builderService.uploadeMedia(file)
            .subscribe(data => {
              this.templateOne.attributes.filter(head => head.name == "background")[0].value = "url(../../../../../assets/upload/ComponentesMultimediaHome/" + data + ")";
              this.templateOne.attributes.filter(head => head.name == "backgroundStatus")[0].value = "uploaded";
              this.buildTemplate();
            })
          break;
        case 2:
          this.templateOne.attributes.filter(head => head.name == "backgroundStatus")[0].value = "color";
          this.templateOne.attributes.filter(head => head.name == "background")[0].value = file;
          this.buildTemplate();
          break;
      }
    }
  }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }

  public hreFunction(route) {
    if (route != undefined && route != "" && !this.builder) window.open(route, '_blank');
  }



  // indexAction: number[] = [0, 2, 1, 4]
  // updateIndex(event, index) {
  //   if (event) {
  //     (index == 0) ? this.indexAction = [3, 0, 1, 2] : "";
  //     (index == 1) ? this.indexAction = [0, 3, 1, 2] : "";
  //     (index == 2) ? this.indexAction = [0, 1, 3, 2] : "";
  //     (index == 3) ? this.indexAction = [0, 1, 2, 3] : "";
  //   }
  // }



}
