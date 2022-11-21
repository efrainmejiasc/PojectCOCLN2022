import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-estrategia',
  templateUrl: './estrategia.component.html',
  styleUrls: ['./estrategia.component.scss']
})
export class EstrategiaComponent implements OnInit {
  dataConfig: any[];
  Urlvideo: any;
  video:any;

  constructor(public admin: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getConfig();
  }

  getConfig() {
    this.admin.getConfig().subscribe(res => {

      this.Urlvideo = res['videoEstrategia'];
      var video_id = this.Urlvideo.split('v=')[1].split('&')[0];
      this.Urlvideo = 'https://www.youtube.com/embed/' + video_id;
      this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.Urlvideo);
     // console.log(this.video);
    }), error => {
      console.log(error);
    }
  }

}
