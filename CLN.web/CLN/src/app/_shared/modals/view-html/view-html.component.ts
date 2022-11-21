import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-html',
  templateUrl: './view-html.component.html',
  styleUrls: ['./view-html.component.scss']
})
export class ViewHtmlComponent implements OnInit {
  message: any;
  sendedData: any;
  constructor(
    public modal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

}
