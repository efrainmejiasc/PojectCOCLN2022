import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appUploadFile]'
})
export class UploadFileDirective {

  @HostBinding('class.fileover') fileOver: boolean;

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLEave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @Output() fileDropped = new EventEmitter<any>();
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
