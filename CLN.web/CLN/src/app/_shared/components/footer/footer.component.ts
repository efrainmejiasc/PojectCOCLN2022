import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private builderService: BuilderEditorService, private sanitizer: DomSanitizer) { }

  public year: number;

  ngOnInit() {
    var data = new Date();
    this.year = data.getFullYear();
    //this.initDataFooter();
   /*  this.builderService.actionReload.subscribe(data => {
      if (data == true) {
        this.initDataFooter();
      }
    }) */
  }
  public footerrConfiguration: attribute[] = [];
  public textDataMaster: textData = new textData();
  initDataFooter() {
    this.builderService.findDataBuilder()
      .subscribe(data => {
        this.footerrConfiguration = data.filter(data => data.name == "Footer")[0].attributes;
        this.textDataMaster.mediaUrl = this.footerrConfiguration.filter(head => head.name == "logo_uno")[0].value;
        this.textDataMaster.uploadStatus = this.footerrConfiguration.filter(head => head.name == "uploadStatus_logo_uno")[0].value;
      })
  }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  goHome(){
    
  }
}