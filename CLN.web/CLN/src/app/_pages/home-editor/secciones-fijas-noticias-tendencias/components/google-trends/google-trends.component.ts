import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GoogleTrendsService } from 'src/app/_services/news-trends/google-trends.service';

import { get } from 'scriptjs';
declare var trends: any;

@Component({
  selector: 'app-google-trends',
  templateUrl: './google-trends.component.html',
  styleUrls: ['./google-trends.component.scss']
})
export class GoogleTrendsComponent implements OnInit {

  data: any;

  constructor(
    private _dataService: GoogleTrendsService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.obtenerCargarData();
  }

  obtenerCargarData() {
    this.layoutService.showLoading();
    this._dataService.getGoogleTrendsJsonModel().subscribe(
      (response: any) => {
        if (response.succeeded && response.data) {
          console.log("response data trends", response);
          this.data = response.data;
          // this.cargarTendencias(response.data);
        }
        else {
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

  isBtnVisualiza:boolean = true;
  cargarTendencias() {
    const divTrend = document.getElementById("div-trends");
    $("#trends-widget-1").remove();
    get("https://ssl.gstatic.com/trends_nrtr/2884_RC01/embed_loader.js", () => {
      new trends.embed.renderWidgetTo(
        divTrend,
        this.data.type,
        this.data.property,
        {
          geo: this.data.comparisonItem[0].geo,
          guestPath: this.data.guestPath
        }
      );
      // "dailytrends", "", { "geo": "CO", "guestPath": "https://trends.google.es:443/trends/embed/" }
      
      // en caso de obtener una busqueda por alguna palabra
      // new trends.embed.renderWidgetTo(
      // new trends.embed.renderExploreWidgetTo(
      //   divTrend,
      //   this.data.type,
      //   {
      //     comparisonItem: this.data.comparisonItem,
      //     category: this.data.category,
      //     property: this.data.property
      //   },
      //   {
      //     exploreQuery: this.data.exploreQuery,
      //     guestPath: this.data.guestPath
      //   }
      // );
    });
    this.isBtnVisualiza = false;
  }
}
