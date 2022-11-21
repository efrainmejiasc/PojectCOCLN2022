import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { emptyConfiguration } from 'src/app/_model/table-dynamic/emptyConfiguration.model';
import { rowOrder } from 'src/app/_model/table-dynamic/rowOrder.model';
import { searchBox } from 'src/app/_model/table-dynamic/searchBox.model';
import { sortingHistory } from 'src/app/_model/table-dynamic/sortingHistory.model';
import { permitsUserFetch } from 'src/app/_model/user-data/permitsUserFetch.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-dynamic-reportes',
  templateUrl: './table-dynamic-reportes.component.html',
  styleUrls: [
    "../../../../_shared/styles/tables.scss",
    './table-dynamic-reportes.component.scss']
})
export class TableDynamicReportesComponent implements OnInit, OnChanges {

  @Input() dataRow: Array<rowOrder>;
  @Input() permitsUser: permitsUserFetch;
  @Input() dataToPrint: Array<any>;
  @Input() searchConfig: searchBox;
  @Input() emptyConfiguration: emptyConfiguration;
  public formSizePage: FormGroup;
  public masterArrayToPrint: Array<any> = [];
  private backupArrayToPrint: Array<any> = [];
  ngOnChanges(changes: SimpleChanges) {
    const changePrint = changes["dataToPrint"];
    if (changePrint && changePrint.currentValue) {
      this.masterArrayToPrint = changePrint.currentValue;
      this.backupArrayToPrint = changePrint.currentValue;
      this.sizePage = this.masterArrayToPrint.length;
      this.formSizePage.get("search").reset();
      this.buildPaginator();
    }
  }
  constructor(private formBuilder: FormBuilder) { }
  public sizePagePaginator: Array<number> = [10, 20, 30, 40, 50];
  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.formSizePage = this.formBuilder.group({
      "size": new FormControl("10", [Validators.required]),
      'search': new FormControl("", [Validators.required])
    })
  }

  public arrayToPrint: Array<any>;
  public sizePage: number = 10;
  private sortingOne: boolean = false;
  private sortingHistory: Array<sortingHistory> = [];
  sortBy(column, action) {
    if (!this.sortingHistory.filter(sort => sort.key == column)[0]) {
      var sorting: sortingHistory = new sortingHistory();
      sorting.key = column;
      sorting.status = false;
      this.sortingHistory.push(sorting);
    }
    if (column.toLowerCase().toLowerCase().indexOf(" + ") != -1) {

      var cont: number = 1;
      var aux;
      var n = this.masterArrayToPrint.length;
      for (let k = 1; k < n; k++) {
        for (let i = 0; i < (n - cont); i++) {
          var content = this.concatDataToOrder(this.masterArrayToPrint[i], column);
          var contentNext = this.concatDataToOrder(this.masterArrayToPrint[i + 1], column);
          if (this.sortingHistory.filter(sort => sort.key == column)[0].status) {
            if (content > contentNext) {
              aux = this.masterArrayToPrint[i];
              this.masterArrayToPrint[i] = this.masterArrayToPrint[i + 1];
              this.masterArrayToPrint[i + 1] = aux;
            }
          } else {
            if (content < contentNext) {
              aux = this.masterArrayToPrint[i];
              this.masterArrayToPrint[i] = this.masterArrayToPrint[i + 1];
              this.masterArrayToPrint[i + 1] = aux;
            }
          }
        }
        cont++;
      }
      if (this.sortingHistory.filter(sort => sort.key == column)[0].status) {
        this.sortingHistory.filter(sort => sort.key == column)[0].status = false;
      } else {
        this.sortingHistory.filter(sort => sort.key == column)[0].status = true;
      }
      this.buildPaginator();
      /*for() {
        this.masterArrayToPrint.sort((a, b) => a[`${column}`] < b[`${column}`] ? -1 : a[`${column}`] > b[`${column}`] ? 1 : 0);
      }*/
    } else {
      if (this.sortingHistory.filter(sort => sort.key == column)[0].status) {
        this.sortingHistory.filter(sort => sort.key == column)[0].status = false;
        this.masterArrayToPrint.sort((a, b) => a[`${column}`] < b[`${column}`] ? -1 : a[`${column}`] > b[`${column}`] ? 1 : 0);
        this.buildPaginator();
      } else {
        this.sortingHistory.filter(sort => sort.key == column)[0].status = true;
        this.masterArrayToPrint.sort((a, b) => a[`${column}`] < b[`${column}`] ? 1 : a[`${column}`] > b[`${column}`] ? -1 : 0);
        this.buildPaginator();
      }
    }
  }

  private concatDataToOrder(data, concatData) {
    if (data) {
      var toConcat = concatData.split("+");
      var stringCompare: String = "";
      toConcat.forEach(concat => {
        if (data[`${concat.trim()}`] != undefined && data[`${concat.trim()}`] != "") {
          stringCompare = stringCompare + data[`${concat.trim()}`] + " ";
        }
      });
      return stringCompare;
    }
    return 0;
  }

  public pageActive: number = 0;
  public sizePerPage: number = 10;
  public pageView: Array<any> = [];
  public paginatorPrint: Array<Array<any>> = [[]];
  private buildPaginator() {
    this.pageView = [];
    this.paginatorPrint = [[]];
    var cont = 0;
    var position = 0;
    var masterCont = 0;
    this.masterArrayToPrint.forEach(toPrint => {
      this.paginatorPrint[position].push(toPrint);
      cont++;
      masterCont++;
      if (cont == this.sizePerPage && masterCont < this.masterArrayToPrint.length) {
        position++;
        cont = 0;
        this.paginatorPrint.push([])
      }
    });
    this.pageActive = 0;
    this.pageInit = 0;
    this.pageView = this.paginatorPrint[this.pageActive];
    this.actionPaginator();
  }

  public paginatorListSegmented: Array<number> = [];
  public paginatorList: Array<number> = [];
  private limitPaginator: number = 5;
  public pageInit: number = 0;
  private actionPaginator() {
    this.paginatorList = [];
    this.paginatorListSegmented = [];
    for (let i = 0; i < this.paginatorPrint.length; i++) {
      this.paginatorList.push(i + 1);
    }
    if (this.paginatorList.length > 5) {
      for (let i = this.pageInit; i < this.limitPaginator; i++) {
        this.paginatorListSegmented.push(this.paginatorList[i]);
      }
    } else {
      this.paginatorListSegmented = this.paginatorList;
    }
    this.firstPage = this.sizePerPage * this.pageActive + 1;
    this.finalPage = this.sizePerPage * this.pageActive + this.paginatorPrint[this.pageActive].length;
  }

  viewPagesExtremes(howExtrem) {
    switch (howExtrem) {
      case 1:
        this.pageActive = 0;
        this.pageView = this.paginatorPrint[this.pageActive];
        this.pageInit = 0;
        this.paginatorListSegmented = [];
        for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
          this.paginatorListSegmented.push(this.paginatorList[i]);
        }
        break;
      case 2:
        this.pageActive = this.paginatorList[this.paginatorList.length - 2];
        this.pageInit = this.pageActive - 4;
        this.pageView = this.paginatorPrint[this.pageActive];
        this.paginatorListSegmented = [];
        for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
          this.paginatorListSegmented.push(this.paginatorList[i]);
        }
        break;
    }
    this.firstPage = this.sizePerPage * this.pageActive + 1;
    this.finalPage = this.sizePerPage * this.pageActive + this.paginatorPrint[this.pageActive].length;
  }

  public viewPaginator(page, index) {
    if (index < 3) {
      this.pageActive = page - 1;
      this.pageView = this.paginatorPrint[this.pageActive];
      if (this.pageInit > 0) {
        this.pageInit--;
        this.paginatorListSegmented = [];
        if (this.paginatorList.length > 5) {
          for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
            this.paginatorListSegmented.push(this.paginatorList[i]);
          }
        } else {
          this.paginatorListSegmented = this.paginatorList;
        }
      }
    } else {
      this.pageActive = page - 1;
      this.pageView = this.paginatorPrint[this.pageActive];
      if ((this.pageInit + 1) + 5 < this.paginatorList.length) {
        this.pageInit = this.pageInit + 1;
      } else {
        this.pageInit = this.paginatorList.length - 5;
      }
      if (this.paginatorList.length > 5) {
        this.paginatorListSegmented = [];
        for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
          this.paginatorListSegmented.push(this.paginatorList[i]);
        }
      } else {
        this.paginatorListSegmented = this.paginatorList;
      }
    }
    this.firstPage = this.sizePerPage * this.pageActive + 1;
    this.finalPage = this.sizePerPage * this.pageActive + this.paginatorPrint[this.pageActive].length;
  }

  public firstPage: number = 1;
  public finalPage: number = 10;
  public navigatePaginator(item) {
    switch (item) {
      case 1:
        if ((this.pageActive - 1) >= 0) {
          this.pageActive--;
          this.firstPage = this.sizePerPage * this.pageActive + 1;
          this.finalPage = this.sizePerPage * this.pageActive + this.paginatorPrint[this.pageActive].length;
          this.pageView = this.paginatorPrint[this.pageActive];
          if (this.pageInit > 0) {
            this.pageInit--;
            if (this.paginatorList.length > 5) {
              this.paginatorListSegmented = [];
              for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
                this.paginatorListSegmented.push(this.paginatorList[i]);
              }
            } else {
              this.paginatorListSegmented = this.paginatorList;
            }
          }
        }
        break;
      case 2:
        if ((this.pageActive + 1) < this.paginatorPrint.length) {
          this.pageActive++;
          this.firstPage = this.sizePerPage * this.pageActive + 1;
          this.finalPage = this.sizePerPage * this.pageActive + this.paginatorPrint[this.pageActive].length;
          this.pageView = this.paginatorPrint[this.pageActive];
          if ((this.pageInit + 1) + 5 < this.paginatorList.length) {
            this.pageInit = this.pageInit + 1;
          } else {
            this.pageInit = this.paginatorList.length - 5;
          }
          if (this.paginatorList.length > 5) {
            this.paginatorListSegmented = [];
            for (let i = this.pageInit; i < this.limitPaginator + this.pageInit; i++) {
              this.paginatorListSegmented.push(this.paginatorList[i]);
            }
          } else {
            this.paginatorListSegmented = this.paginatorList;
          }
        }
        break;
    }
  }

  @Output() buildAction = new EventEmitter<Array<any>>();
  public actionType(type: String, item: any) {
    this.buildAction.emit([type, item])
  }

  public modifySize() {
    const formReader = this.formSizePage.value;
    if (formReader.size != this.sizePerPage) {
      this.sizePerPage = formReader.size;
      this.buildPaginator();
    }
  }

  public activeFilter(filter: rowOrder) {
    if (filter.filterBy == true) {
      var filterSelect = "filter" + filter.position;
      var a = document.getElementById(filterSelect);
      if (a.style.display == "flex") {
        a.style.display = "none";
      } else {
        a.style.display = "flex";
      }
    }
  }

  public createFilter(filter: rowOrder) {
    var filterReturn: Array<any> = [];
    this.dataToPrint.forEach(printData => {
      if (filterReturn.filter(filtData => filtData[`${filter.nameInObject}`] == printData[`${filter.nameInObject}`])[0] == undefined) {
        filterReturn.push(printData);
      }
    })
    return filterReturn;
  }

  public filterByContent(item: rowOrder, print: any) {
    if (item != null) this.masterArrayToPrint = this.backupArrayToPrint.filter(master => master[`${item.nameInObject}`] == print[`${item.nameInObject}`]); else this.masterArrayToPrint = this.backupArrayToPrint;
    this.buildPaginator();
  }

  public dataConcat(value: String, index) {
    if (value != undefined) {
      if (value.toLowerCase().toLowerCase().indexOf(" + ") != -1) {
        var toConcat = value.split("+");
        var textToReturn = "";
        var cont = 0;
        toConcat.forEach(textTo => {
          if (this.pageView[index][`${textTo.trim()}`] != undefined && this.pageView[index][`${textTo.trim()}`] != "") {
            textToReturn = textToReturn + this.pageView[index][`${textTo.trim()}`].trim() + " ";
          }
        })
        return textToReturn;
      } else {
        return this.pageView[index][`${value}`];
      }
    }
  }

  public identifyClickOutSide(e) {
    this.dataRow.forEach(row => {
      if (row.filterBy == true) {
        var a = document.getElementById('filter' + row.position);
        var b = document.getElementById('filterButton' + row.position);
        if (!b.contains(e.target)) {
          if (a.style.display == 'flex') {
            a.style.display = 'none';
          }
        }
      }
    })
  }

  public searchData() {
    const formReader = this.formSizePage.value;
    if (formReader.search.length >= this.searchConfig.minLength) {
      var pageView = [];
      this.paginatorPrint = [[]];
      if (this.searchConfig.searchAttribute.toLowerCase().split("+")) {
        var toConcat = this.searchConfig.searchAttribute.split("+");
        this.backupArrayToPrint.forEach(dataTo => {
          var dataToParse = "";
          toConcat.forEach(textTo => {

            if (dataTo[`${textTo.trim()}`] != undefined && dataTo[`${textTo.trim()}`] != "") {
              dataTo[`${textTo.trim()}`] = dataTo[`${textTo.trim()}`].trim();
              dataToParse = dataToParse + dataTo[`${textTo.trim()}`].trim() + " ";
            }
          })
          if (dataToParse.toLowerCase().includes(formReader.search.toLowerCase())) {
            if (pageView.filter(pv => pv == dataTo)[0]) { } else pageView.push(dataTo);
          }
        })
      } else if (this.searchConfig.searchAttribute.toLowerCase().toLowerCase().split(",")) {

        var toConcat = this.searchConfig.searchAttribute.split(",");
        this.backupArrayToPrint.forEach(dataTo => {
          var dataToParse = "";
          toConcat.forEach(textTo => {

            if (dataTo[`${textTo.trim()}`] != undefined && dataTo[`${textTo.trim()}`] != "") {
              dataTo[`${textTo.trim()}`] = dataTo[`${textTo.trim()}`].trim();
              dataToParse = dataToParse + dataTo[`${textTo.trim()}`].trim() + " ";
            }
          })
          if (dataToParse.toLowerCase().includes(formReader.search.toLowerCase())) {
            if (pageView.filter(pv => pv == dataTo)[0]) { } else pageView.push(dataTo);
          }
        })

        //ME TOCA HACERLO

      } else {
        this.backupArrayToPrint.forEach(dataTo => {
          if (dataTo[`${this.searchConfig.searchAttribute}`] != undefined) {
            if (dataTo[`${this.searchConfig.searchAttribute}`].toLowerCase().includes(formReader.search.trim().toLowerCase())) {
              (pageView.filter(pv => pv == dataTo)[0]) ? "" : pageView.push(dataTo);
            }
          }
        })
      }
      var cont = 0;
      var position = 0;
      pageView.forEach(toPrint => {
        this.paginatorPrint[position].push(toPrint);
        cont++;
        if (cont == this.sizePerPage) {
          position++;
          cont = 0;
          this.paginatorPrint.push([])
        }
      });
      this.pageActive = 0;
      this.pageInit = 0;
      this.pageView = this.paginatorPrint[this.pageActive];
      this.actionPaginator();
    } else {
      this.buildPaginator();
    }
  }

  public activeAction(item) {
    return (item.estado == "Activo") ? "Inactivar" : "Activar"
  }

  private urlToDownload: String = `${environment.apiUrl}/api/contenido/downloadContent/?ruta=`;


}
