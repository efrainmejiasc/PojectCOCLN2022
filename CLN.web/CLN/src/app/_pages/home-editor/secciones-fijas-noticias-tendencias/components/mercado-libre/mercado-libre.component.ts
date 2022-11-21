import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { FreeMarketService } from 'src/app/_services/news-trends/free-market.service';

// import { MatDialog } from '@angular/material';

// export interface TendenciaData {
//   keywords: string;
//   results: TendenciaResult[];
// }
// export interface TendenciaPicture {
//   id: string;
//   url: string;
// }
// export interface TendenciaResult {
//   id: string;
//   status: string;
//   domain_Id: string;
//   settings: any;
//   name: string;
//   main_Features: any[];
//   attributes: any[];
//   pictures: TendenciaPicture[];
//   parent_Id: string;
//   children_Ids: any[];
// }

@Component({
  selector: 'app-mercado-libre',
  templateUrl: './mercado-libre.component.html',
  styleUrls: ['./mercado-libre.component.scss']
})
export class MercadoLibreComponent implements OnInit {

  constructor(
    private _dataService: FreeMarketService,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.obtenerTendencias();
    this.obtenerCategorias();
  }

  tendencias = [];
  categorias = [];
  // subcategorias = [];
  // tendencia: TendenciaData;
  tendenciaSelected: any = {
    "id": "",
    "name": ""
  };

  obtenerTendencias() {
    this.layoutService.showLoading();
    this._dataService.GetFreeMarketTrendsAsync().subscribe(
      (response: any) => {
        if (response.succeeded && response.data) {
          if (response.data.length > 30)
            response.data.splice(30);
          this.tendencias = response.data;
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

  obtenerCategorias() {
    this.layoutService.showLoading();
    this._dataService.GetFreeMarketCategoriesAsync().subscribe(
      (response: any) => {
        if (response.succeeded && response.data) {
          this.categorias = response.data;
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

  obtenerTendenciasPorCategoriaId(idCategoria) {
    this.layoutService.showLoading();
    if (idCategoria) {
      this._dataService.GetFreeMarketTrendsCategorieAsync(idCategoria).subscribe(
        (response: any) => {
          if (response.succeeded && response.data) {
            if (response.data.length > 30)
              response.data.splice(30);
            this.tendencias = response.data;
            // this.obtenerSubcategoriasPorCategoriaId(idCategoria);
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
    } else {
      this.obtenerTendencias();
    }
  }

  idTendenciaSelected(id: string) {
    // this.layoutService.showLoading();
    // setTimeout(() => {
    this.tendenciaSelected = null;
    this.tendenciaSelected = this.categorias.find(item => item.id === id);
    this.obtenerTendenciasPorCategoriaId(id)
    // this.layoutService.closeLoading();
    // }, 700);
    // this.dataService.setIdCompanyProfile(id);
  };

  // en caso de agregar mas funcionalidades
  // obtenerSubcategoriasPorCategoriaId(idCategoria) {
  //   this.layoutService.showLoading();
  //   this._dataService.GetFreeMarketCategoriesAsync().subscribe(
  //     (response: any) => {
  //       if (response.succeeded && response.data) {
  //         if (response.data.length > 10)
  //           response.data.splice(10);
  //         // console.log("response obtener categorias id", response);
  //         this.subcategorias = response.data;
  //       }
  //       else {
  //         console.log("Data no recibida");
  //       }
  //       this.layoutService.closeLoading();
  //     },
  //     (error: any) => {
  //       console.log(error);
  //       this.layoutService.closeLoading();
  //     }
  //   );
  // }

  // obtenerUnaTendencia(idTendencia: string, templateRef: any) {
  //   this.layoutService.showLoading();
  //   if (idTendencia) {
  //     this._dataService.GetFreeMarketProductAsync(idTendencia).subscribe(
  //       (response: any) => {
  //         if (response.succeeded && response.data) {
  //           console.log("tendencia ", response.data.keywords, " - ", response.data);
  //           this.dialog.open(templateRef, {
  //             width: '70%'
  //           });
  //           this.tendencia = response.data;

  //           if (this.tendencia.results.length > 6)
  //             this.tendencia.results.splice(6);
  //         }
  //         else {
  //           console.log("Data no recibida");
  //         }
  //         this.layoutService.closeLoading();
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.layoutService.closeLoading();
  //       }
  //     );
  //   } else {
  //     this.obtenerTendencias();
  //   }
  // }
  // cerrarDialogTemplate() {
  //   this.dialog.closeAll();
  // }
}
