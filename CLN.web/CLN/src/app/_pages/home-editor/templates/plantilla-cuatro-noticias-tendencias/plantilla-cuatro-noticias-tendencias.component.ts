import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { NewsTrendsService } from 'src/app/_services/news-trends/news-trends.service';

@Component({
  selector: 'app-plantilla-cuatro-noticias-tendencias',
  templateUrl: './plantilla-cuatro-noticias-tendencias.component.html',
  styleUrls: ['./plantilla-cuatro-noticias-tendencias.component.scss', '../../../../_shared/styles/modals.scss', '../../../../_shared/styles/transition.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlantillaCuatroNoticiasTendenciasComponent  {

  @Input() color: string;
  @Input() backgroundImage: File;
  @Input() nameSection: string;
  @Input() closeActionByOutsideClickPattern: any;
  @Input() index: any;
  @Input() builder: boolean;
  @Input() template: templateStructure[];
  @Output() templateReturn = new EventEmitter<templateStructure>();
  @Input() pagination: boolean;
  @Input() pages: number;
  private colorBackground: string;
  public templateOne: templateStructure;
  public background: string;
  public textDataMaster: textData = new textData();
  public indexTemplate: any;
  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const templateEvent = changes["template"];
    const colorEvent = changes["color"];
    const indexEvent = changes["index"];
    const bckimgEvent = changes["backgroundImage"];

    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (colorEvent && colorEvent.currentValue) {
      this.colorBackground = colorEvent.currentValue;
      this.saveMediaBackground(this.colorBackground, 2);
    }
    if (templateEvent && templateEvent.currentValue) {
      this.templateOne = templateEvent.currentValue.filter(data => data.name == this.nameSection && data.idTemplate == 4)[0];
      this.buildTemplate()
    }
    if (indexEvent && indexEvent.currentValue) {
      this.indexTemplate = indexEvent.currentValue;
    }
    if (bckimgEvent && bckimgEvent.currentValue) {
      this.saveMediaBackground(bckimgEvent.currentValue, 1)
    }
  }

  private buildTemplate() {

    if (this.templateOne) {
      this.textDataMaster.mediaUrl = null;
      this.textDataMaster.background = this.templateOne.attributes.filter(head => head.name == "background")[0].value;
      this.textDataMaster.title = this.templateOne.attributes.filter(head => head.name == "title")[0].value;
      this.textDataMaster.text = this.templateOne.attributes.filter(head => head.name == "text_one")[0].value;
      this.textDataMaster.link = this.templateOne.attributes.filter(head => head.name == "link")[0].value;
      this.textDataMaster.enlace = this.templateOne.attributes.filter(head => head.name == "enlace")[0].value;
      this.textDataMaster.typeMedia = this.templateOne.attributes.filter(head => head.name == "type_media")[0].value;
      this.textDataMaster.uploadStatus = this.templateOne.attributes.filter(head => head.name == "uploadStatus")[0].value;
      this.textDataMaster.titleEffect = this.templateOne.attributes.filter(head => head.name == "titleEffect")[0].value;
      this.textDataMaster.textEffect = this.templateOne.attributes.filter(head => head.name == "textEffect")[0].value;
      this.textDataMaster.enlaceEffect = this.templateOne.attributes.filter(head => head.name == "enlaceEffect")[0].value;
      this.textDataMaster.mediaEffect = this.templateOne.attributes.filter(head => head.name == "mediaEffect")[0].value;
      this.textDataMaster.typelink = this.templateOne.attributes.filter(head => head.name == "typelink")[0].value;
      this.textDataMaster.text_roll = this.templateOne.attributes.filter(head => head.name == "textRoll")[0].value;
      this.textDataMaster.mediaImageSize = this.templateOne.attributes.filter(head => head.name == "mediaSize")[0].value;
      if (this.templateOne.attributes.filter(head => head.name == "media_url")[0].value != "") {
        this.textDataMaster.mediaUrl = this.templateOne.attributes.filter(head => head.name == "media_url")[0].value;
      }
      this.templateReturn.emit(this.templateOne);
    } else {
      this.templateOne = new templateStructure();
      this.templateOne.id = 0;
      this.templateOne.name = this.nameSection;
      this.templateOne.idTemplate = 4;
      this.templateOne.state = "Activo";
      var list: Array<attribute> = [new attribute(0, "background", ""), new attribute(0, "backgroundStatus", ""), new attribute(0, "title", ""), new attribute(0, "titleEffect", ""), new attribute(0, "text_one", ""), new attribute(0, "textEffect", ""), new attribute(0, "link", ""), new attribute(0, "typelink", "btn"), new attribute(0, "enlace", ""), new attribute(0, "textRoll", ""), new attribute(0, "enlaceEffect", ""), new attribute(0, "type_media", ""), new attribute(0, "media_url", ""), new attribute(0, "mediaEffect", ""), new attribute(0, "uploadStatus", ""), new attribute(0, "mediaSize", "medium")];
      this.templateOne.attributes = list;
      this.buildTemplate();
    }
  }

  url: string;
  public fourSection: boolean = false;
  public finalUrl: any;
  private fileData: any = null;
  public setData(event, type) {
    switch (type) {
      case 1:
        this.templateOne.attributes.filter(head => head.name == "title")[0].value = event;
        break;
      case 2:
        this.templateOne.attributes.filter(head => head.name == "text_one")[0].value = event;
        break;
      case 3:
        this.templateOne.attributes.filter(head => head.name == "enlace")[0].value = event;
        break;
      case 4:
        this.templateOne.attributes.filter(head => head.name == "link")[0].value = event;
        break;
      case 5:
        if (event) {
          this.fileData = event;
          this.templateOne.attributes.filter(head => head.name == "type_media")[0].value = "video";
          const reader = new FileReader();
          reader.onload = e => this.templateOne.attributes.filter(head => head.name == "media_url")[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event);
        }
        break;
      case 6:
        this.templateOne.attributes.filter(head => head.name == "media_url")[0].value = event;
        break;
      case 8:
        this.templateOne.attributes.filter(head => head.name == "mediaEffect")[0].value = event;
        break;
      case 9:
        this.templateOne.attributes.filter(head => head.name == "titleEffect")[0].value = event;
        break;
      case 10:
        this.templateOne.attributes.filter(head => head.name == "textEffect")[0].value = event;
        break;
      case 11:
        this.templateOne.attributes.filter(head => head.name == "enlaceEffect")[0].value = event;
        break;
      case 12:
        this.templateOne.attributes.filter(head => head.name == "typelink")[0].value = event;
        break;
      case 13:
        this.templateOne.attributes.filter(head => head.name == "textRoll")[0].value = event;
        break;
      case 14:
        this.templateOne.attributes.filter(head => head.name == "mediaSize")[0].value = event;
        break;
    }
    this.buildTemplate();
  }

  constructor(private builderService: NewsTrendsService, private spinner: NgxSpinnerService, private router: Router) { }
  public configTextEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "paragraphBig", false, false, true, false);
  public configMediaEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "imagen", false, true, true, true);
  public configLinkEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "link", false, false, true, false);
  public configTitleEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "title", false, false, true, false);

  public mediaActivated: boolean = false;
  private saveMedia(file: any) {
    if (this.templateOne) {
      this.mediaActivated = true;
      this.templateOne.attributes.filter(head => head.name == "uploadStatus")[0].value = "uploading";
      var formData: FormData = new FormData();
      formData.append("multimediaComponent", file, file.name);
      this.builderService.uploadeMedia(file)
        .subscribe(data => {
          this.mediaActivated = false;
          this.templateOne.attributes.filter(head => head.name == "media_url")[0].value = "../../../../../assets/upload/ComponentesMultimediaNewsTrends/" + data;
          this.templateOne.attributes.filter(head => head.name == "uploadStatus")[0].value = "uploaded";
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
              console.log(data);
              this.templateOne.attributes.filter(head => head.name == "background")[0].value = "url(../../../../../assets/upload/ComponentesMultimediaNewsTrends/" + data + ")";
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

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    if (this.builder) {
      this.closeActionByOutsideClick = event;
    }
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
  indexAction: number[] = [0, 2, 1, 4]
  updateIndex(event, index) {
    if (event) {
      (index == 0) ? this.indexAction = [3, 0, 1, 2] : "";
      (index == 1) ? this.indexAction = [0, 3, 1, 2] : "";
      (index == 2) ? this.indexAction = [0, 1, 3, 2] : "";
      (index == 3) ? this.indexAction = [0, 1, 2, 3] : "";
    }
  }

  updateIndexMedia(event) {
    if (event) {
      this.indexAction = [4, 2, 1, 0];
    } else {
      this.indexAction = [0, 2, 1, 4];
    }
  }
}