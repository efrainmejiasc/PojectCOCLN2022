import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './video.component.scss']
})
export class VideoComponent implements OnInit {
  videoUrl: String;
  public finalUrl: String;
  constructor(
    public modal: NgbActiveModal,
  ) { }
  ngOnInit() {
    var urlvideo = this.videoUrl.split("assets")
    console.log(window.location)
    let url = null;
    (window.location.hostname == "localhost") ? url = "https://escuelasecretarias.ivolucion.com" : url = window.location.origin;
    this.finalUrl = `${url}/assets${urlvideo[1]}`;

  }

}
