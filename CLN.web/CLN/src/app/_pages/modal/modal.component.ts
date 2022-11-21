import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() text;
  @Input() sioNoBoton;
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private sanitized: DomSanitizer
  ) {
    this.text = this.sanitized.bypassSecurityTrustHtml(this.text);
  }

  si() {
    this.notifyParent.emit('si');
    this.activeModal.close('Close click');
  }
  no() {
    this.notifyParent.emit('no');
    this.activeModal.close('Close click');
  }
}
