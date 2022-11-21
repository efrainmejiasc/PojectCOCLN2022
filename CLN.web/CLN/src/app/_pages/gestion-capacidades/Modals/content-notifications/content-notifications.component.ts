import { Component, OnInit } from '@angular/core';
import { newsCapacidad } from 'src/app/_model/capacidad/newsCapacidad.model';
import { AutodiagnosticoService } from 'src/app/_services/gestion-capacidades/autodiagnostico.service';

@Component({
  selector: 'app-content-notifications',
  templateUrl: './content-notifications.component.html',
  styleUrls: [
    "../../../../_shared/styles/modals.scss",
    "../../../../_shared/styles/tables.scss",
    './content-notifications.component.scss']
})
export class ContentNotificationsComponent implements OnInit {

  constructor(private autoService: AutodiagnosticoService) { }

  ngOnInit() {
    this.initNews();
  }

  public news: Array<newsCapacidad> = []; 
  private initNews() {
    this.autoService.getAutodiagnosisNews()
      .subscribe(data => {
        this.news = data;
      })
  }

  public splitData(data,position){
    return data.split("")[position];
  }

}
