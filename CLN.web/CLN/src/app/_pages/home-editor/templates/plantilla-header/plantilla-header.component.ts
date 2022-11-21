import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';

@Component({
  selector: 'app-plantilla-header',
  templateUrl: './plantilla-header.component.html',
  styleUrls: ['./plantilla-header.component.scss', '../../../../_shared/styles/modals.scss']
})
export class PlantillaHeaderComponent implements OnInit {

  public firstSection = false;
  public secondSection = false;
  public thirdSection = false;
  public fourSection = false;
  constructor(private builderService: BuilderEditorService, private sanitizer: DomSanitizer) { }
  @Input() closeActionByOutsideClickPattern: any;
  @Input() color: String;
  @Input() template: templateStructure[];
  @Output() header = new EventEmitter<templateStructure>();
  @Input() builder: boolean;
  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const templateEvent = changes["template"];
    const colorEvent = changes["color"];
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (templateEvent && templateEvent.currentValue && templateEvent.currentValue.length > 0) {
      this.HeaderTemplate = templateEvent.currentValue.filter(data => data.name == "Header")[0];
      this.buildTemplate()
    }
    if (colorEvent && colorEvent.currentValue) {
      this.background = colorEvent.currentValue;
    }
  }

  ngOnInit() {
    this.buildTemplate();
  }

  public configTextEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "menu_roll", false, false, false,false);
  public configMediaEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "imagen", false, true, false,false);
  public configLinkEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "link", false, false, false,false);
  public configTitleEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, true, "title", false, false, false,false);
  public configEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "", false, false, false,false);
  public HeaderTemplate: templateStructure;
  public background: String;
  public textDataMaster: textData = new textData();
  public textDataMasterTwo: textData = new textData();
  public textDataMasterThree: textData = new textData();
  public textDataMasterFour: textData = new textData();
  private buildTemplate() {
    if (this.HeaderTemplate) {
      this.textDataMaster.mediaUrl = this.HeaderTemplate.attributes.filter(head => head.name == "logo_uno")[0].value;
      this.textDataMaster.uploadStatus = this.HeaderTemplate.attributes.filter(head => head.name == "uploadStatus_logo_uno")[0].value;
      this.textDataMaster.button = this.HeaderTemplate.attributes.filter(head => head.name == "text_one")[0].value;
      this.textDataMaster.text_roll = this.HeaderTemplate.attributes.filter(head => head.name == "text_one_roll")[0].value;
      this.textDataMasterTwo.button = this.HeaderTemplate.attributes.filter(head => head.name == "text_two")[0].value;
      this.textDataMasterTwo.text_roll = this.HeaderTemplate.attributes.filter(head => head.name == "text_two_roll")[0].value;
      this.textDataMasterThree.button = this.HeaderTemplate.attributes.filter(head => head.name == "text_three")[0].value;
      this.textDataMasterThree.text_roll = this.HeaderTemplate.attributes.filter(head => head.name == "text_three_roll")[0].value;
      this.textDataMasterFour.button = this.HeaderTemplate.attributes.filter(head => head.name == "text_four")[0].value;
      this.textDataMasterFour.text_roll = this.HeaderTemplate.attributes.filter(head => head.name == "text_four_roll")[0].value;
      this.textDataMasterFour.uploadStatus = this.HeaderTemplate.attributes.filter(head => head.name == "uploadStatus_logo_dos")[0].value;
      this.textDataMasterFour.mediaUrl = this.HeaderTemplate.attributes.filter(head => head.name == "logo_dos")[0].value;
    } else {
      this.HeaderTemplate = new templateStructure();
      this.HeaderTemplate.id = 0;
      this.HeaderTemplate.name = "Header";
      this.HeaderTemplate.idTemplate = 2027;
      this.HeaderTemplate.state = "Activo";
      var list: Array<attribute> = [new attribute(0, "logo_uno", ""), new attribute(0, "uploadStatus_logo_uno", ""), new attribute(0, "logo_dos", ""), new attribute(0, "uploadStatus_logo_dos", ""), new attribute(0, "text_one", ""), new attribute(0, "text_one_roll", ""), new attribute(0, "text_two", ""), new attribute(0, "text_two_roll", ""), new attribute(0, "text_three", ""), new attribute(0, "text_three_roll", ""), new attribute(0, "text_four", ""), new attribute(0, "text_four_roll", "")]
      this.HeaderTemplate.attributes = list;
    }
    this.header.emit(this.HeaderTemplate);
  }

  private fileData: any = null;
  public setData(event, type) {
    switch (type) {
      case 1:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_one")[0].value = event;
        this.buildTemplate();
        break;
      case 2:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_two")[0].value = event;
        this.buildTemplate();
        break;
      case 3:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_three")[0].value = event;
        this.buildTemplate();
        break;
      case 4:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_four")[0].value = event;
        this.buildTemplate();
        break;
      case 5:
        if (event) {
          this.fileData = event;
          const reader = new FileReader();
          reader.onload = e => this.HeaderTemplate.attributes.filter(head => head.name == "logo_uno")[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event, 1);
        }
        break;
      case 6:
        if (event) {
          this.fileData = event;
          const reader = new FileReader();
          reader.onload = e => this.HeaderTemplate.attributes.filter(head => head.name == "logo_dos")[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event, 2);
        }
        break;
      case 7:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_one_roll")[0].value = event;
        this.buildTemplate();
        break;
      case 8:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_two_roll")[0].value = event;
        this.buildTemplate();
        break;
      case 9:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_three_roll")[0].value = event;
        this.buildTemplate();
        break;
      case 10:
        this.HeaderTemplate.attributes.filter(head => head.name == "text_four_roll")[0].value = event;
        this.buildTemplate();
        break;
    }
  }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  public mediaActivated: boolean = false;
  private saveMedia(file: any, index) {
    this.mediaActivated = true;
    let imageName: String;
    (index == 1) ? imageName = "uploadStatus_logo_uno" : imageName = "uploadStatus_logo_dos";
    this.HeaderTemplate.attributes.filter(head => head.name == imageName)[0].value = "uploading";
    var formData: FormData = new FormData();
    formData.append("multimediaComponent", file, file.name);
    this.builderService.uploadeMedia(file)
      .subscribe(data => {
        this.mediaActivated = false;
        let imageFound: String;
        (index == 1) ? imageFound = "logo_uno" : imageFound = "logo_dos";
        this.HeaderTemplate.attributes.filter(head => head.name == imageFound)[0].value = "../../../../../assets/upload/ComponentesMultimediaHome/" + file.name;
        this.HeaderTemplate.attributes.filter(head => head.name == imageName)[0].value = "uploaded";
        this.buildTemplate();
      })
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }

}
