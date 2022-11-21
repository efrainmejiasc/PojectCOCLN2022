import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SocialMediaService } from 'src/app/_services/news-trends/social-media.service';

import { get } from 'scriptjs';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.scss']
})
export class RedesSocialesComponent implements OnInit {

  funcionesSociales: any;

  verRedSocial: string;

  videosItems: any[] = [];
  videoId: string;

  flickrGaleria: any[] = [];
  flickrImagenSeleccionada: any;

  instagramGaleria: any[] = [];
  instagramImagenSeleccionada: any;

  constructor(
    private _dataService: SocialMediaService,
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    // this.obtenerFacebook();
    this.obtenerFuncionesSociales();
  }

  obtenerFuncionesSociales() {
    this.layoutService.showLoading();
    this._dataService.getSocialFeatures().subscribe(
      (response: any) => {
        
        if (response.succeeded && response.data) {
          this.funcionesSociales = response.data;
          this.obtenerFacebook();
        } else {
          console.log("Data no recibida");
        }
        this.layoutService.closeLoading();
      },
      (error: any) => {
        this.layoutService.closeLoading();
        console.log(error);
      }
    );
  }

  obtenerFacebook() {
    if (this.verRedSocial != "facebook") {
      this.layoutService.showLoading();
      this.verRedSocial = "facebook";
      setTimeout(() => {
        this.layoutService.closeLoading();
      }, 1000);
    }
  }

  obtenerTwitter() {
    if (this.verRedSocial != "twitter") {
      this.layoutService.showLoading();
      this.verRedSocial = "twitter";
      get("https://platform.twitter.com/widgets.js");
      setTimeout(() => {
        this.layoutService.closeLoading();
      }, 1000);
    }
  }

  obtenerCanalYoutube() {
    if (this.verRedSocial != "youtube") {
      this.layoutService.showLoading();
      this.verRedSocial = "youtube";
      this._dataService.getYoutube(this.funcionesSociales.youtube).subscribe(
        (response: any) => {
          if (response) {
            if (response.items) {
              this.videosItems = response.items;

            }
          } else {
            console.log("Data no recibida");
          }
          this.layoutService.closeLoading();
        },
        (error: any) => {
          console.log(error);
          this.layoutService.closeLoading();
        }
      );
    }
  }

  obtenerFlickrGaleria() {
    if (this.verRedSocial != "flickr") {
      this.layoutService.showLoading();
      this.verRedSocial = "flickr";
      this._dataService.getFlickr(this.funcionesSociales.flickr).subscribe(
        (response: any) => {
          if (response) {
            this.flickrGaleria = response;
          } else {
            console.log("Data no recibida");
          }
          this.layoutService.closeLoading();
        },
        (error: any) => {
          this.layoutService.closeLoading();
          console.log(error);
        }
      );
    }
  }

  obtenerInstagram() {
    if (this.verRedSocial != "instagram") {
      this.layoutService.showLoading();
      this.verRedSocial = "instagram";
      this._dataService.getInstagram(this.funcionesSociales.instagram).subscribe(
        (response: any) => {
          if (response) {
            if (response.data) {
              this.instagramGaleria = response.data;
            }
          } else {
            console.log("Data no recibida");
          }
          this.layoutService.closeLoading();
        },
        (error: any) => {
          console.log(error);
          this.layoutService.closeLoading();
        }
      );
    }
  }

  detalleVideoYoutube(id: string, templateRef: any) {
    this.videoId = id;
    this.dialog.open(templateRef, {
      width: '800px'
    });
  }
  detalleImagenFlickr(imagen: string, templateRef: any) {
    this.flickrImagenSeleccionada = imagen;
    this.dialog.open(templateRef, {
      width: '800px'
    });
  }
  detalleImagenInstagram(imagen: string, templateRef: any) {
    this.instagramImagenSeleccionada = imagen;
    this.dialog.open(templateRef, {
      width: '800px'
    });
  }

  cerrarDialogTemplate() {
    this.dialog.closeAll();
  }
}
