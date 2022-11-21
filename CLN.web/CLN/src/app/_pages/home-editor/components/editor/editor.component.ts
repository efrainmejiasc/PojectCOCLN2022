import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { BuilderEditorService } from 'src/app/_services/editorHeader/builder-editor.service';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/_shared/modals/confirmation-modal/confirmation-modal.component';
import { attribute } from 'src/app/_model/home-editor/attribute.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss',
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss"]
})
export class EditorComponent implements OnInit {

  constructor(
    private builderService: BuilderEditorService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,private changeDedectionRef: ChangeDetectorRef
  ) {
    /* window.addEventListener("beforeunload", (event) => {
       event.preventDefault();
       event.returnValue = "Unsaved modifications";
       return event;
     });*/
  }
  public mostrarInfoOculta:boolean = false;
  public builder: boolean = true;

  public templates = [
    '1', //sección 1
    '2', //sección 2 etc....
    '3',
    '4',
    '5'
  ];
  public sectionsStatus = [null,true,null,null,null,null,null,null];
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
  public configEditor: actionsConfiguration = new actionsConfiguration(false, false, false, true, false, "", true, false, false, false)
  public configEditorComponent: actionsConfiguration = new actionsConfiguration(true, false, false, true, false, "imagen", true, false, false, false)
  ngOnInit() {
    this.initTemplate();
  }

  public EditorTemplates: templateStructure[] = [];

  initTemplate() {
    this.builderService.findDataBuilderSerice()
      .subscribe(data => {
        this.EditorTemplates = [];
        this.sectionOne = [];
        this.sectionTwo = [];
        this.sectionThree = [];
        this.sectionFour = [];
        this.sectionFive = [];
        this.sectionSix = [];
        this.sectionSeven = [];
        this.sectionEight = [];
        this.EditorTemplates = data;
        if(this.EditorTemplates.filter(template => template.name == "Seccion1")[0]){
          this.sectionOne.push(this.EditorTemplates.filter(template => template.name == "Seccion1")[0].idTemplate);
           this.findStatusSection('Seccion1',0);
        }
        if(this.EditorTemplates.filter(template => template.name == "Seccion2")[0]){
          this.sectionTwo.push(this.EditorTemplates.filter(template => template.name == "Seccion2")[0].idTemplate);
          this.findStatusSection('Seccion2',1);
        }
        if(this.EditorTemplates.filter(template => template.name == "Seccion3")[0]) {
          this.sectionThree.push(this.EditorTemplates.filter(template => template.name == "Seccion3")[0].idTemplate);
          this.findStatusSection('Seccion3',2);
        }
        if(this.EditorTemplates.filter(template => template.name == "Seccion4")[0]) {
          this.sectionFour.push(this.EditorTemplates.filter(template => template.name == "Seccion4")[0].idTemplate);
          this.findStatusSection('Seccion4',3);
        }
        if(this.EditorTemplates.filter(template => template.name == "Seccion5")[0]) {
          this.sectionFive.push(this.EditorTemplates.filter(template => template.name == "Seccion5")[0].idTemplate);
          this.findStatusSection('Seccion5',4);
        }
        if(this.EditorTemplates.filter(template => template.name == "Seccion6")[0]) {
          this.sectionSix.push(this.EditorTemplates.filter(template => template.name == "Seccion6")[0].idTemplate);
          this.findStatusSection('Seccion6',5);
        }

        console.log('Primer editor template ', this.EditorTemplates);
      });
  }

  drop(event: CdkDragDrop<string[]>, section: number) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.findStatusSection('Seccion'+ (section+1), section);
  }

  dragEnd(event: CdkDragEnd) {
    this.templates = [
      '1',
      '2',
      '3',
      '4',
      '5'
    ];
    setTimeout(() => {
      (this.sectionOne.length > 1) ? this.confirmateReplace(1) : "";
      (this.sectionTwo.length > 1) ? this.confirmateReplace(2) : "";
      (this.sectionThree.length > 1) ? this.confirmateReplace(3) : "";
      (this.sectionFour.length > 1) ? this.confirmateReplace(4) : "";
      (this.sectionFive.length > 1) ? this.confirmateReplace(5) : "";
      (this.sectionSix.length > 1) ? this.confirmateReplace(6) : "";
      (this.sectionSeven.length > 1) ? this.confirmateReplace(7) : "";
      (this.sectionEight.length > 1) ? this.confirmateReplace(8) : "";
    }, 1);
  }
  // en este orden    [color,colorOne,colorTwo,colorThree,colorFour,colorFive,colorSix,colorSeven,colorEight,pagination,pages,paginationTwo,pagesTwo,paginationThree,pagesThree,paginationFour,pagesFour,paginationFive,pagesFive,paginationSix,pagesSix,paginationSeven,pagesSeven,paginationHeight,pagesHeight,fileReturnBackgroundOne,fileReturnBackgroundTwo,fileReturnBackgroundThree,fileReturnBackgroundFourth,fileReturnBackgroundFive,fileReturnBackgroundSix]
  public attributeSet = [null, null, null, null, null, null, null, null, null, false, 1, false, 1, false, 1, false, 1, false, 1, false, 1, false, 1, false, 1, null, null, null, null, null, null];
  setData(event, index) {
    if (event) {
      this.attributeSet.splice((index - 1), 1, event);
    }

  }
  private sectionNames: String[] = ["Seccion1", "Seccion2", "Seccion3", "Seccion4", "Seccion5", "Seccion6", "Seccion7", "Seccion8"]
  private prevDeleted: any;
  private errorMessages: string[] = ["Ha ocurrido un error al eliminar el contenido de la sección"]
  private confirmateReplace(position): any {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
    <p class="px-2">¿Está segura/o de remover la plantilla y toda su información?</p>`;
    this.prevDeleted = null;
    switch (position) {
      case 1:
        this.prevDeleted = this.sectionOne[0];
        this.sectionOne.splice(0, 1)
        break;
      case 2:
        this.prevDeleted = this.sectionTwo[0];
        this.sectionTwo.splice(0, 1)
        break;
      case 3:
        this.prevDeleted = this.sectionThree[0];
        this.sectionThree.splice(0, 1)
        break;
      case 4:
        this.prevDeleted = this.sectionFour[0];
        this.sectionFour.splice(0, 1)
        break;
      case 5:
        this.prevDeleted = this.sectionFive[0];
        this.sectionFive.splice(0, 1)
        break;
      case 6:
        this.prevDeleted = this.sectionSix[0];
        this.sectionSix.splice(0, 1)
        break;
      case 7:
        this.prevDeleted = this.sectionSeven[0];
        this.sectionSeven.splice(0, 1)
        break;
      case 8:
        this.prevDeleted = this.sectionEight[0];
        this.sectionEight.splice(0, 1)
        break;
    }
    ref.result.then(confirm => {
      if (confirm) {
        //this.deleteSection(this.sectionNames[position - 1])
        switch (position) {
          case 1:
            this.sectionOne = [];
            this.deleteSection("Seccion1")
            setTimeout(() => {
              this.sectionOne.push(this.prevDeleted);
            }, 400);
            break;
          case 2:
            this.sectionTwo = [];
            this.deleteSection("Seccion2")
            setTimeout(() => {
              this.sectionTwo.push(this.prevDeleted);
            }, 400);
            break;
          case 3:
            this.sectionThree = [];
            this.deleteSection("Seccion3")
            setTimeout(() => {
              this.sectionThree.push(this.prevDeleted);
            }, 400);
            break;
          case 4:
            this.sectionFour = [];
            this.deleteSection("Seccion4")
            setTimeout(() => {
              this.sectionFour.push(this.prevDeleted);
            }, 400);
            break;
          case 5:
            this.sectionFive = [];
            this.deleteSection("Seccion5")
            setTimeout(() => {
              this.sectionFive.push(this.prevDeleted);
            }, 400);
            break;
          case 6:
            this.sectionSix = [];
            this.deleteSection("Seccion6")
            setTimeout(() => {
              this.sectionSix.push(this.prevDeleted);
            }, 400);
            break;
          case 7:
            this.sectionSeven = [];
            this.deleteSection("Seccion7")
            setTimeout(() => {
              this.sectionSeven.push(this.prevDeleted);
            }, 400);
            break;
          case 8:
            this.sectionEight = [];
            this.deleteSection("Seccion8")
            setTimeout(() => {
              this.sectionEight.push(this.prevDeleted);
            }, 400);
            break;
        }
      } else {

      }
    })
  }

  public closeActionByOutsideClick: any;
  public identifyClickOutSide(event) {
    this.closeActionByOutsideClick = event;
  }
  public paginationNumberData: number[] = [null, null, null, null, null, null];
  public paginationData(event, item) {
    this.paginationNumberData.splice(item, 1, event);
  }

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }

  public buildEditor(event) {
    //console.log('EditorTemplates del builder', this.EditorTemplates);
    //console.log('event del builder', event);
    let section = this.EditorTemplates.filter(template => template.name == event.name && template.idTemplate == event.idTemplate)[0];
    console.log('Section', section);
    if (section != undefined) {
      this.EditorTemplates.filter(template => template.name == event.name)[0].idTemplate = event.idTemplate;
      this.EditorTemplates.filter(template => template.name == event.name)[0].attributes = event.attributes;
    }
    else { this.EditorTemplates.push(event) };
    //console.log('Segundo editor template', this.EditorTemplates);
  }

  private principalContent = ["title", "text_one", "enlace", "media_url", "link"]
  private toUpdate: templateStructure[] = [];
  private toCreate: templateStructure[] = [];

  public saveTemplates() {
    this.spinner.show();
    this.toCreate = [];
    this.toUpdate = [];
    let toUpdateData: templateStructure[] = [];
    var attUploading: attribute = null;
    let isComplet: boolean = true;

    console.log('editor template del save', this.EditorTemplates);
    this.EditorTemplates.forEach(attFind => {
      console.log('Entro al foreach del editor templates para validar si todo esta ok');
     /* console.log('AttF', attFind); */
      if (attFind.name !== 'Seccion2') {
        this.principalContent.forEach(data => {
          /*attFind.attributes.forEach(attF => {
            (attF.name.includes(data) && (attF.value == "" || attF.value == undefined || attF.value == null)) ? attF.value : "";
          });*/

          if (attFind.idTemplate == 3) {
          } else if (attFind.idTemplate != 5) {
            attUploading = attFind.attributes.filter(attF =>
              attF.name.includes(data)
              && !attF.name.includes("titleEffect")
              && !attF.name.includes("enlaceEffect")
              && (attF.value == "" || attF.value == undefined || attF.value == null))[0]
              //console.log(attUploading);
          } else {
            attUploading = attFind.attributes.filter(attF =>
              attF.name.includes(data)
              && !attF.name.includes("titleEffect")
              && !attF.name.includes("enlaceEffect")
              && attF.name == "title"
              && (attF.value == "" || attF.value == undefined || attF.value == null))[0]
          }
          if (attUploading != null) {
            if (attUploading.value == "" || attUploading.value == undefined || attUploading.value == null) {
              isComplet = false;
            }
          }
        });
      }
    });
    if (!isComplet) {
      this.spinner.hide();
      this.modal("No se pueden guardar campos vacíos")
      return;
    }
    attUploading = null;
    this.EditorTemplates.forEach(attFind => {
      (attFind.attributes && attFind.attributes.length > 0) ? attUploading = attFind.attributes.filter(attF => attF.name == "uploadStatus" && attF.value == "uploading")[0] : attUploading = null;
    })
    if (attUploading != null) {
      this.spinner.hide();
      this.modal("Algunos archivos se están cargando, intente de nuevo una vez todos los archivos se carguen por completo");
      return;
    }

    this.EditorTemplates.forEach(data => {
      if (data.id == 0) {
        console.log('entro al if, nuevo template');
        this.toCreate.push(data);
      } else {
        console.log('entro al else, update template');
        toUpdateData.push(data);
      }
    })

    console.log('toCreate', this.toCreate);
    console.log('toUpdateData', toUpdateData);
    console.log('Editor template', this.EditorTemplates);

    if (toUpdateData.length > 0) {
      this.builderService.findDataBuilderSerice()
        .subscribe(data => {
          toUpdateData.forEach(temp => {
            let tempEx = null;
            for(var index in data)
            {
              let i = 0;
              console.group("COMPARANDO DATOS")
              console.log(JSON.stringify(data[index]))
              console.log(JSON.stringify(temp))
              if (data[index].id == temp.id) {
                if(JSON.stringify(data[index]) !== JSON.stringify(temp)) {
                  console.log("SEGÚN ESTA MIERDA SON DIFERENTES")
                  this.toUpdate.push(temp);
                }
                break;
              }
              console.groupEnd();
            }
          });

          console.group("DATA TO send");
          console.log(this.toUpdate.length + " - " + this.toCreate.length);
          console.groupEnd();

          if (this.toUpdate.length > 0) {
            this.updateComponent(this.toUpdate)
          } else {
            if (this.toCreate.length == 0) {
              this.spinner.hide();
              this.modal("No hay nada que guardar, por favor realice algun cambio")
            }
          }
        });
    }
    if (this.toCreate.length > 0) {
      console.log('Entro a crear')
      this.creteTemplate(this.toCreate)
    }
  }

  public postTemplate() {
    this.spinner.show();
    var pendientes = this.EditorTemplates.filter(template => template.id == 0);
    if (pendientes.length > 0) {
      this.spinner.hide();
      this.modal(`Antes de publicar debes guardar las plantilas que se han agregado`);
    } else {
      this.builderService.publishTemplate(this.EditorTemplates)
        .subscribe(data => {
          this.spinner.hide();
          this.modal(`El home se ha publicado correctamente`);
          this.finalUpdateEditor();
        })
    }
  }

  private contEditorActionsService: number = 0;
  private creteTemplate(template) {
    console.log('createtemplate',template)
    this.builderService.createComponent(template)
      .subscribe(data => {
        this.reactionSave();
      }, error => {
        this.spinner.hide();
        this.modal(`Tenemos problemas al guardar tu plantilla, por favor espera un momento y vuelve a intentarlo.`);
      })
  }

  private updateComponent(template) {
    console.log('entro a update', template)
    this.builderService.updateComponent(template)
      .subscribe(data => {
        console.log('respuesta update', data)
        this.reactionSave();
      }, error => {
        this.spinner.hide();
        this.modal(`Tenemos problemas al guardar tu plantilla, por favor espera un momento y vuelve a intentarlo.`);
      })
  }

  private sizeReaction = 0;
  private reactionSave() {
    this.sizeReaction++;
    let size = 0;
    (this.toUpdate.length > 0 && this.toCreate.length > 0) ? size = 2 : size = 1;
    if (this.sizeReaction == size) {
      this.sizeReaction = 0;
      this.initTemplate();
      this.spinner.hide();
      this.modal(`Se ha guardado el home y todas sus plantillas`);
    }
  }

  private finalUpdateEditor() {
    this.contEditorActionsService++;
    if (this.contEditorActionsService == this.EditorTemplates.length) {
      this.contEditorActionsService = 0;
      this.builderService.updateEditor()
      setTimeout(() => {
        this.builderService.updateEditor()
      }, 1);
    }
  }

  public statusSection(name: string, section: number) {
    const dataActive = this.EditorTemplates.filter(editor => editor.state != "Inactivo" && editor.name != "Header" && editor.name != "Footer");
    if (this.EditorTemplates.filter(editor => editor.name == name)[0]) {
      if (this.EditorTemplates.filter(editor => editor.name == name)[0].state == "Inactivo") {
        this.EditorTemplates.filter(editor => editor.name == name)[0].state = "Activo";
      } else {
        if (dataActive.length > 1) {
          this.EditorTemplates.filter(editor => editor.name == name)[0].state = "Inactivo";
        } else {
          this.modal("No puede inhabilitar todas las secciones")
        }
      }
      this.findStatusSection(name, section);
    }
  }
  public findStatusSection(name: string, section: number) {
    console.log('status', name, section)
    var template = this.EditorTemplates.filter(editor => editor.name == name)[0];
    if(template == undefined || template == null){
      return null;
    }
    var status = template.state == "Inactivo" ? false : true;
    this.sectionsStatus[section] = status;
    return status;
  }
  public textStatusSection(name: string) {
    return (this.EditorTemplates.filter(editor => editor.name == name)[0]) ? (this.EditorTemplates.filter(editor => editor.name == name)[0].state == "Inactivo") ? "Habilitar" : "Inhabilitar" : "Habilitar";
  }

  private removeinTemplate(name: string) {
    let indexOf = this.EditorTemplates.map(function (e) { return e.name; }).indexOf(name);
    this.EditorTemplates.splice(indexOf, 1);
  }

  public removeData(event, item) {
    const ref = this.modalService.open(ConfirmationModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.buttons = ["Cancelar", "Aceptar"]
    ref.componentInstance.message = `
      <p class="px-2">¿Está segura/o de remover la plantilla y toda su información?</p>`;
    ref.result.then(confirm => {
      if (confirm) {
        this.deleteSection(this.sectionNames[parseInt(item) - 1])
        switch (parseInt(item)) {
          case 1:
            this.sectionOne = [];
            break;
          case 2:
            this.sectionTwo = [];
            break;
          case 3:
            this.sectionThree = [];
            break;
          case 4:
            this.sectionFour = [];
            break;
          case 5:
            this.sectionFive = [];
            break;
          case 6:
            this.sectionSix = [];
            break;
          case 7:
            this.sectionSeven = [];
            break;
          case 8:
            this.sectionEight = [];
            break;
        }
      }
    });
  }


  private deleteSection(name): boolean {
    if (this.EditorTemplates.filter(edt => edt.name == name)[0] && this.EditorTemplates.filter(edt => edt.name == name)[0].id != 0) {
      this.builderService.deleteComponent(this.EditorTemplates.filter(edt => edt.name == name)[0].id)
        .subscribe(data => {
          this.removeinTemplate(name)
        }, error => {
          return false;
        })
      return true;
    } else {
      this.removeinTemplate(name)
      return true;
    }
  }

  modal(msg: string) {
    const ref = this.modalService.open(AlertModalComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>${msg}</p>`;
  }

  valueResponseMicrositios() {

  }

  palancaInfoOculta(){
    this.mostrarInfoOculta = !this.mostrarInfoOculta;
  }

}
