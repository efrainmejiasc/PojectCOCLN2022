import { Component, OnInit, Input, ɵConsole, ViewEncapsulation } from '@angular/core';
import { AutodiagnosticoService } from '../../_services/autodiagnostico.service';
import { Router } from '@angular/router';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';
import { configurationAtributes } from 'src/app/_model/home-editor/configurationAtributes.model';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { textData } from 'src/app/_model/home-editor/textData.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bannersup',
  templateUrl: './bannersup.component.html',
  styleUrls: ['./bannersup.component.scss', '../../_shared/styles/modals.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BannersupComponent implements OnInit {

  @Input('bannersup') bannersup: any[];
  diagnosticoFinish: boolean;
  constructor(private builderService: BuilderEditorService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initDataHeader();
    this.builderService.actionReload.subscribe(data => {
      if (data == true) {
        this.initDataHeader();
      }
    })
    /*this.diagnosticoFinish = true;
    setTimeout(() => {
      if (this.bannersup != undefined) {
        console.log(this.bannersup);
      }
    }, 1000);*/
    //console.log("bannersuperior");
    //this.do_CheckDiagnostico();
  }
  public headerConfiguration: attribute[] = [];
  public textDataMaster: textData = new textData();
  public textDataMasterTwo: textData = new textData();
  public textDataMasterThree: textData = new textData();
  public textDataMasterFour: textData = new textData();
  public firstSection: boolean = false;
  public secondSection: boolean = false;
  public thirdSection: boolean = false;
  public fourSection: boolean = false;
  public initDataHeader() {
    this.builderService.findDataBuilder()
      .subscribe(data => {
        this.headerConfiguration = data.filter(data => data.name == "Header")[0].attributes;
        this.textDataMaster.mediaUrl = this.headerConfiguration.filter(head => head.name == "logo_uno")[0].value;
        this.textDataMaster.uploadStatus = this.headerConfiguration.filter(head => head.name == "uploadStatus_logo_uno")[0].value;
        this.textDataMaster.text = this.headerConfiguration.filter(head => head.name == "text_one")[0].value;
        this.textDataMaster.text_roll = this.headerConfiguration.filter(head => head.name == "text_one_roll")[0].value;
        this.textDataMasterTwo.text = this.headerConfiguration.filter(head => head.name == "text_two")[0].value;
        this.textDataMasterTwo.text_roll = this.headerConfiguration.filter(head => head.name == "text_two_roll")[0].value;
        this.textDataMasterThree.text = this.headerConfiguration.filter(head => head.name == "text_three")[0].value;
        this.textDataMasterThree.text_roll = this.headerConfiguration.filter(head => head.name == "text_three_roll")[0].value;
        this.textDataMasterFour.text = this.headerConfiguration.filter(head => head.name == "text_four")[0].value;
        this.textDataMasterFour.text_roll = this.headerConfiguration.filter(head => head.name == "text_four_roll")[0].value;
        this.textDataMasterFour.uploadStatus = this.headerConfiguration.filter(head => head.name == "uploadStatus_logo_dos")[0].value;
        this.textDataMasterFour.mediaUrl = this.headerConfiguration.filter(head => head.name == "logo_dos")[0].value;
      }, error => {

      })
  }

  goHome() {
    this.router.navigate(['/'], {});
  }
  do_CheckDiagnostico() {
    /*     this.service_Auto.checkDiagnostico().subscribe(result => {
    
          console.log(result['terminado']);
          if (!result['terminado']) {
            this.diagnosticoFinish = false;
          } else {
            this.diagnosticoFinish = true;
          }
        }, error => {
          console.log(error);
        }); */
  }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
