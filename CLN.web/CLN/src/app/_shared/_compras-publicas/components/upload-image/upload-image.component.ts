import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { actionsConfiguration } from 'src/app/_model/home-editor/actionsConfiguration.model';
import { AlertModalComponent } from 'src/app/_shared/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  public configuration: actionsConfiguration = new actionsConfiguration(false, false, false, false, false, "", false, false, false, false);
  public file: File[] = [];
  public exts = ["MP4"];
  public extsTwo = ["JPG", "PNG", "GIF", "JPEG"];
  public maxSize = [30, 5]
  public typeFile: String = null;
  public imagePath;
  public message: string;
  public form: FormGroup;

  showPanel  = false;
  sectionMediaUpload = true;

  @Output() onClick = new EventEmitter<any>();
  @Output() asignarEnlace = new EventEmitter<any>();
  @Input() imgURL: any;
  @Input() enlace: any;

  constructor(private modalService: NgbModal,) { }

  @HostListener('document:click', ['$event']) documentClickEvent($event: MouseEvent) {
    if (!document.getElementById('container-upload-img').contains($event.target as Node)) {
      this.showPanel = false;
    }
  }

  ngOnInit() {
  }

  public actionBuild(action) {
    switch (action) {
      case 1:
        break;
      case 2:
        // this.activeEditor();
        this.showPanel = !this.showPanel;
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }

  activeEditor() {
    // if (this.editorOpenEffects == false) {
    //   (this.editorOpen) ? this.editorOpen = false : this.editorOpen = true;
    //   (this.editorOpen) ? this.form.reset() : "";
    //   (this.editorOpen && this.textDataMaster.text != "") ? (this.configuration.typeEditorText == "paragraphBig") ? this.form.get("texto").setValue(this.textDataMaster.text) : this.form.get("textoSmall").setValue(this.textDataMaster.text) : "";
    //   (this.editorOpen && this.textDataMaster.button != "") ? this.form.get("menu").setValue(this.textDataMaster.button) : "";
    //   (this.editorOpen && this.textDataMaster.title != "") ? this.form.get("title").setValue(this.textDataMaster.title) : "";
    //   (this.editorOpen && this.textDataMaster.sub_title != "") ? this.form.get("sub_title").setValue(this.textDataMaster.sub_title) : "";
    //   (this.editorOpen && this.textDataMaster.enlace != "") ? this.form.get("link").setValue(this.textDataMaster.enlace) : "";
    //   (this.editorOpen && this.textDataMaster.link != "") ? this.form.get("enlace").setValue(this.textDataMaster.link) : "";
    //   (this.editorOpen && this.textDataMaster.typelink != "") ? (this.textDataMaster.typelink == "btn") ? this.form.get("typelink").setValue(0) : this.form.get("typelink").setValue(1) : "";    
    //   (this.textDataMaster.imageLink != "") ? this.form.get("image_link").setValue(this.textDataMaster.imageLink):"";
    //   if (this.configuration.editorText && this.editorOpen) {
    //     this.isTextEditor.emit(true);
    //   } else if (this.configuration.editorImage) {
    //     this.isMediaEditor.emit(true);
    //   } else {
    //     this.isMediaEditor.emit(false);
    //     this.isMediaEditor.emit(null);
    //     this.isTextEditor.emit(false);
    //     this.isTextEditor.emit(null);
    //   }

    //   (this.editorOpen && this.textDataMaster.text_roll != "") ? this.form.get("rollover").setValue(this.textDataMaster.text_roll) : "";
    //   var divIdName = "";
    //   (this.configuration.editorImage) ? divIdName = "windowmedia" : (this.configuration.editorBackground) ? divIdName = "windowbackground" : (this.configuration.editorText) ? divIdName = "windowtext" : "";
    //   var objectId = divIdName + this.indexInput;
    //   setTimeout(() => {
    //     var id = document.getElementById(objectId);
    //     if (this.editorOpen) {

    //       var rect = id.getBoundingClientRect();
    //       var windowSize = window.innerWidth;

    //       if (objectId.includes('1004')) {
    //         windowSize = window.innerHeight;
    //         id.style.top = "-" + 150 + "px";
    //         id.style.left = "-" + id.offsetWidth + "px";
    //       }
    //       else if (objectId.includes('1008')) {
    //         id.style.top = "0px";
    //         id.style.left = "-" + id.offsetWidth + "px";
    //       }
    //       else if (objectId.includes('1002')) {
    //         id.style.left = "-250px";
    //       }
    //       else if ((Math.ceil(rect.left) + id.offsetWidth) > windowSize) {
    //         var reducir = (Math.ceil(rect.left) + id.offsetWidth) - windowSize + 70;
    //         id.style.left = "-" + reducir + "px";
    //       }
    //     }
    //   }, 1);
    //   (!this.editorOpen) ? this.imgURL = null : "";
    // }
  }

  changeEnlace(){
    const isHttp = this.enlace.substring(0, 7) === 'http://';
    const isHttps = this.enlace.substring(0, 8) === 'https://';

    if( this.enlace === 'https://' ){
      this.enlace = '';
    }else{
      if( !isHttp && !isHttps ){
        this.enlace = `https://${ this.enlace }`;
      }else{
       this.enlace = this.enlace;
      }
    }
    
    this.asignarEnlace.emit(this.enlace);
  }

  public onFileDropped(event) {

    if (event.length <= 1) {
      for (const item of event) {
        if (this.file.length < 1) {
          var tipo = item.name.split(".");
          var isFile = this.extsTwo.filter(ext => ext.toLowerCase() == tipo[1].toLowerCase())[0];
          
          this.typeFile = isFile;
          var sizeMaxP = (isFile != "MP4") ? this.maxSize[1] * 1000000 : this.maxSize[0] * 1000000;
          
          if (isFile != null && sizeMaxP >= item.size) {
            this.preview(item);
            this.file.push(item)
          } else {
            const ref = this.modalService.open(AlertModalComponent, {
              centered: true,
              backdrop: 'static',
              keyboard: false
            });
            ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Archivo no permitido, tamaño maximo para archivos de video es de 30Mb y archivos de imagenes es de 2Mb</p>`;
          }
        } else {
          this.file = [];
          this.onFileDropped(event);
        }
      }
    } else {
      const ref = this.modalService.open(AlertModalComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false
      });
      ref.componentInstance.message = `<p class='mt-2 py-4 col-sm-12 text-center'>Solo se puede cargar 1 archivo</p>`;
    }

  }

  preview(files) {
    if (files) {
      const file = files;
      const reader = new FileReader();
      reader.onload = e => this.imgURL = reader.result;
      reader.readAsDataURL(file);

      this.handleClick(file)
      // this.fileReturn.emit(file);
      // (this.configuration.editorImageSize && this.form.get("size_img").value) ? this.imageSizeReturn.emit(this.form.get("size_img").value) : "";
      // this.fileReturn.emit(null)
    }
  }

  public handleClick(event: any) {
    this.onClick.emit(event);
  }

}
