import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';

@Component({
  selector: 'app-plantilla-footer',
  templateUrl: './plantilla-footer.component.html',
  styleUrls: ['./plantilla-footer.component.scss']
})
export class PlantillaFooterComponent implements OnInit {

  constructor(private builderService: BuilderEditorService, private sanitizer: DomSanitizer) { }

  public year: number;
  @Input() closeActionByOutsideClickPattern: any;
  @Input() template: templateStructure[];
  @Output() header = new EventEmitter<templateStructure>();
  @Input() builder: boolean;
  ngOnChanges(changes: SimpleChanges) {
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const templateEvent = changes["template"];
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (templateEvent && templateEvent.currentValue && templateEvent.currentValue.length > 0) {
      this.FooterTemplate = templateEvent.currentValue.filter(data => data.name == "Footer")[0];
      this.buildTemplate()
    }
  }
  ngOnInit() {
    var data = new Date();
    this.year = data.getFullYear();
  }

  @Output() templateReturn = new EventEmitter<templateStructure>();
  public configMediaEditor: actionsConfiguration = new actionsConfiguration(false, true, false, false, false, "imagen", false, true, false,false);
  public FooterTemplate: templateStructure;
  public textDataMaster: textData = new textData();
  private buildTemplate() {
    if (this.FooterTemplate) {
      this.textDataMaster.mediaUrl = this.FooterTemplate.attributes.filter(head => head.name == "logo_uno")[0].value;
      this.textDataMaster.uploadStatus = this.FooterTemplate.attributes.filter(head => head.name == "uploadStatus_logo_uno")[0].value;
      this.templateReturn.emit(this.FooterTemplate);
    } else {
      this.FooterTemplate = new templateStructure();
      this.FooterTemplate.id = 0;
      this.FooterTemplate.name = "Footer";
      this.FooterTemplate.idTemplate = 2029;
      this.FooterTemplate.state = "Activo";
      var list: Array<attribute> = [new attribute(0, "logo_uno", ""), new attribute(0, "uploadStatus_logo_uno", "")]
      this.FooterTemplate.attributes = list;
      this.buildTemplate()
    }
  }

  private fileData: any = null;
  public setData(event, type) {
    switch (type) {
      case 1:
        if (event) {
          this.fileData = event;
          const reader = new FileReader();
          reader.onload = e => this.FooterTemplate.attributes.filter(head => head.name == "logo_uno")[0].value = reader.result;
          reader.readAsDataURL(event);
          this.saveMedia(event, 1);
        }
        break;
    }
  }

  public mediaActivated: boolean = false;
  private saveMedia(file: any, index) {
    this.mediaActivated = true;
    let imageName: String = "uploadStatus_logo_uno";
    this.FooterTemplate.attributes.filter(head => head.name == imageName)[0].value = "uploading";
    var formData: FormData = new FormData();
    formData.append("multimediaComponent", file, file.name);
    this.builderService.uploadeMedia(file)
      .subscribe(data => {
        this.mediaActivated = false;
        let imageFound: String = "logo_uno";
        this.FooterTemplate.attributes.filter(head => head.name == imageFound)[0].value = "../../../../../assets/upload/ComponentesMultimediaHome/" + file.name;
        this.FooterTemplate.attributes.filter(head => head.name == imageName)[0].value = "uploaded";
        this.buildTemplate();
      })
  }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}
