import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/_services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bannerprincipal',
  templateUrl: './bannerprincipal.component.html',
  styleUrls: ['./bannerprincipal.component.scss']
})
export class BannerprincipalComponent implements OnInit {

  @ViewChild('content', { static: false }) modal;

  @Input('bannerInfo') bannerInfo: any;

  text_1: any;
  text_2: any;
  text_3: any;
  text_4: any;
  public textbanner = new Array();
  dataConfig: any[];
  is_bannerAcknow: any;
  Urlvideo: any;
  video: any;
  secretarias: any[] = [];
  textreconocimiento: any;


  constructor(
    private sanitizer: DomSanitizer,
    private admin: AdminService,
    config: NgbCarouselConfig,
    configModal: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.getConfig();
    this.getSecretarias();
  }

  ngOnInit() { }

  openModal(video, texto) {
    if (video !== null) {
      const video_id = video.split('v=')[1].split('&')[0];
      this.Urlvideo = 'https://www.youtube.com/embed/' + video_id;
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.Urlvideo);
    }
    this.textreconocimiento = texto;
    this.modalService.open(this.modal, { size: 'lg', centered: true });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.video = undefined;
    this.textreconocimiento = undefined;
  }

  getConfig() {
    this.admin.getConfig().subscribe(res => {
      this.dataConfig = res;
      this.is_bannerAcknow = this.dataConfig['bannerReconocimiento'];
    }, error => {
      console.log(error);
    });
  }

  getSecretarias() {
    this.admin.getSecretarias().subscribe(result => {
      result.forEach(element => {
        if (element.reconocida) {
          this.secretarias.push(element);
        }
      });
      if (this.secretarias.length === 0) {
        this.is_bannerAcknow = false;
      }
    }, error => {
      console.log(error);
    });
  }
}
