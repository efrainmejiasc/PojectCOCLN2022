import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';

@Component({
  selector: 'app-template-switch-news-trends',
  templateUrl: './template-switch-news-trends.component.html',
  styleUrls: ['./template-switch-news-trends.component.scss']
})
export class TemplateSwitchNewsTrendsComponent implements OnInit {

  @Input() templateSelected: number;
  @Input() nameSection: String;
  @Input() template: templateStructure[];
  @Input() closeActionByOutsideClickPattern: any;
  @Input() paginationData: number;
  @Output() paginationDataExp = new EventEmitter<templateStructure>();
  @Input() color: String;
  @Input() index: any;
  @Input() builder: boolean;
  @Input() pagination: boolean;
  @Input() pages: number;
  @Input() backgroundImage: any;
  public colorBackground: String;
  public indexEvent: any;
  public backgroundImg: any;
  public EditorTemplates: templateStructure[] = [];
  ngOnChanges(changes: SimpleChanges) {
    const template = changes["templateSelected"];
    const templateStructure = changes["template"];
    const changeEvent = changes["closeActionByOutsideClickPattern"];
    const colorEvent = changes["color"];
    const indexEvent = changes["index"];
    const backgroundImgEvent = changes["backgroundImage"];
    if (template && template.currentValue != undefined) {
      this.activeTemplate(template.currentValue)
    }
    if (templateStructure && templateStructure.currentValue != undefined) {
      this.EditorTemplates = templateStructure.currentValue;
    }
    if (changeEvent && changeEvent.currentValue) {
      this.identifyClickOutSide(changeEvent.currentValue)
    }
    if (colorEvent && colorEvent.currentValue) {
      this.colorBackground = colorEvent.currentValue;
    }
    if (indexEvent && indexEvent.currentValue) {
      this.indexEvent = indexEvent.currentValue;
    }
    if (backgroundImgEvent) {
      this.backgroundImg = backgroundImgEvent.currentValue;
    }
  }
  constructor() { }

  ngOnInit() {
  }

  public paginationDataFn(event) {
    this.paginationDataExp.emit(event);
  }
  public templateOne: boolean = false;
  public templateTwo: boolean = false;
  public templateThree: boolean = false;
  public templateFour: boolean = false;
  public templateFive: boolean = false;
  public templateSix: boolean = false;
  private activeTemplate(template) {
    this.templateOne = false;
    this.templateTwo = false;
    this.templateThree = false;
    this.templateFour = false;
    this.templateFive = false;
    this.templateSix = false;
    switch (parseInt(template)) {
      case 1:
        this.templateOne = true;
        break;
      case 2:
        this.templateTwo = true;
        break;
      case 3:
        this.templateThree = true;
        break;
      case 4:
        this.templateFour = true;
        break;
      case 5:
        this.templateFive = true;
        break;
      case 6:
        this.templateSix = true;
        break;
    }
  }

  @Output() templateReturn = new EventEmitter<templateStructure>();
  public buildEditor(event) {
    this.templateReturn.emit(event);
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
}
