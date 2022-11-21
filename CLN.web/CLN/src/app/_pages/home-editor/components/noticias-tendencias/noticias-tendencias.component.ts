import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { NewsTrendsService } from 'src/app/_services/news-trends/news-trends.service';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-noticias-tendencias',
  templateUrl: './noticias-tendencias.component.html',
  styleUrls: ['./noticias-tendencias.component.scss'],
})
export class NoticiasTendenciasComponent implements OnInit {

  public toTop() {
    window.scroll(0, 0);
    /*var valuue = window.scrollY;
   for (var i = valuue; i > 0; i--) {
     this.toTopFunction(i);
   }*/
  }
  private toTopFunction(i) {
    setTimeout(() => {
      window.scroll(0, i);
    }, 1);
  }

  constructor(
    private builderService: NewsTrendsService,
    private layoutService:LayoutService
    // private modalService: NgbModal
  ) {}
  public builder: boolean = false;
  public templates = ['1','2','3','4','5','6'];
  public sectionOne = [];
  public sectionTwo = [];
  public sectionThree = [];
  public sectionFour = [];
  public sectionFive = [];
  public sectionSix = [];
  public sectionSeven = [];
  public sectionEight = [];
  public rightOne: boolean = true;
  public rightTwo: boolean = true;
  public rightThree: boolean = true;
  
  ngOnInit() {
    this.builderService.actionReload.subscribe(data => {
      if (data == true) {
        this.initTemplate();
      }
    })
    this.initTemplate();
    
    $("footer").show();
    $("nav").show();
  }
  public EditorTemplates: templateStructure[] = [];
  initTemplate() {
    this.layoutService.showLoading();
    this.builderService.findDataBuilder()
      .subscribe(data => {
        this.EditorTemplates = data;
        if (data) {
          (this.EditorTemplates.filter(template => template.name == "Seccion1")[0]) ? this.sectionOne.push(this.EditorTemplates.filter(template => template.name == "Seccion1")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion2")[0]) ? this.sectionTwo.push(this.EditorTemplates.filter(template => template.name == "Seccion2")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion3")[0]) ? this.sectionThree.push(this.EditorTemplates.filter(template => template.name == "Seccion3")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion4")[0]) ? this.sectionFour.push(this.EditorTemplates.filter(template => template.name == "Seccion4")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion5")[0]) ? this.sectionFive.push(this.EditorTemplates.filter(template => template.name == "Seccion5")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion6")[0]) ? this.sectionSix.push(this.EditorTemplates.filter(template => template.name == "Seccion6")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion7")[0]) ? this.sectionSeven.push(this.EditorTemplates.filter(template => template.name == "Seccion7")[0].idTemplate) : "";
          (this.EditorTemplates.filter(template => template.name == "Seccion8")[0]) ? this.sectionEight.push(this.EditorTemplates.filter(template => template.name == "Seccion8")[0].idTemplate) : "";
        }

        this.layoutService.closeLoading();
      }, error => {
        this.layoutService.closeLoading();
      });
  }

  public findStatusSection(name: String) {
    return (this.EditorTemplates.filter(editor => editor.name == name)[0]) ? (this.EditorTemplates.filter(editor => editor.name == name)[0].state == "Inactivo") ? false : true : null;
  }
  public textStatusSection(name: String) {
    return (this.EditorTemplates.filter(editor => editor.name == name)[0]) ? (this.EditorTemplates.filter(editor => editor.name == name)[0].state == "Inactivo") ? "Habilitar" : "Inhabilitar" : "Habilitar";
  }

}