import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/_services/_compras-publicas/layoutService.service';
import { GestionMisInteresesService } from 'src/app/_services/_gestion-mis-intereses/gestion-mis-intereses.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  companyInterestNotification:any;
  notificationType:any[] = [];
  notificationObjs:any[] = [];
  inputS:any;
  notificationMessage = "Tus intereses en notificaciones han sido guardados exitosamente";
  showNotification:boolean = false;
  allSelected:boolean = false;
  guardarOn:boolean = false;
  disabledButton = false;

  constructor(private dataService:GestionMisInteresesService,
              private layoutService:LayoutService) { }

  ngOnInit() {
    this.layoutService.cambiosEmisor.next(true);
    this.getNotificationType()
  };

  getNotificationType(){

    this.dataService.getNotificationType().subscribe((response:any)=>{
      this.notificationType = response.data;

      if(this.notificationType){
        for(let i=0; i<this.notificationType.length; i++){

          let notificationsData = this.notificationType[i];

          let frecuencyArray =[];

          if(notificationsData.notificationFrequency){
            let str =  notificationsData.notificationFrequency.replace(/\s/g, '');
            frecuencyArray = str.split(",");
          }

          let notificationObj = {
            enumerator:notificationsData.enumerator,
            notification:notificationsData.notification,
            notificationFrequency:notificationsData.notificationFrequency,
            id:notificationsData.enumerator,
            idCompanyInterestNotification:0,
            frecuency:frecuencyArray,
            isSelected:false
          };

          this.notificationObjs.push(notificationObj);
        };
      };

      this.getCompanyInterestNotification();

    });
  };

  getCompanyInterestNotification(){
    this.dataService.getCompanyInterestNotification().subscribe((response:any)=>{

      this.companyInterestNotification = response.data;

      for(let i=0; i<this.notificationObjs.length; i++){
        let notification = this.notificationObjs[i];

        for(let j=0; j<this.companyInterestNotification.length; j++){

          if(this.companyInterestNotification){
            let notificationData = this.companyInterestNotification[j];

            if(notificationData.notification === notification.enumerator){

              notification.idCompanyInterestNotification = notificationData.idCompanyInterestNotification;
              notification.isSelected = true;
              notification.notificationFrequency = notificationData.notificationFrequency;
            };
          };
        };
      };
    });
  };

  handleInput(e, id){
    this.layoutService.cambiosEmisor.next(false);
    this.guardarOn = true;
    this.allSelected = false;

    for(let i=0; i<this.notificationObjs.length; i++){
      let notification = this.notificationObjs[i];

      if(notification.id === id){
        notification.isSelected = !notification.isSelected;

        if(notification.frecuency){
          notification.notificationFrequency = notification.frecuency[0];
        };
      };
    };
  };

  handlefrecuency(notificationObj, frecuency){
    this.layoutService.cambiosEmisor.next(false);
    this.guardarOn = true;
    notificationObj.notificationFrequency = frecuency;
  };

  handleTodos(e, input:HTMLInputElement){

    this.layoutService.cambiosEmisor.next(false);
    this.guardarOn = true;

    for(let i=0; i<this.notificationObjs.length; i++){
      let notification = this.notificationObjs[i];
      if(input.checked){
        this.allSelected = true;
        notification.isSelected = true;
      }else{
        this.allSelected = false;
        notification.isSelected = false;
      };
    };
  };

  saveNotification(){

    this.layoutService.cambiosEmisor.next(true);

    if(!this.guardarOn){
      return;
    };

    this.disabledButton = true;

    let notificationObj2 = [];

    for(let i=0; i<this.notificationObjs.length; i++){
      let notification = this.notificationObjs[i];

      if(notification.isSelected){
        let notificationData = {
          idCompanyInterestNotification:notification.idCompanyInterestNotification,
          idCompanyProfile:this.dataService.idCompanyProfile,
          notification:notification.enumerator,
          notificationFrequency:notification.notificationFrequency
        };

        notificationObj2.push(notificationData);
      };
    };

    this.dataService.setCompanyInterestNotification(notificationObj2).subscribe( (response:any)=>{
        this.showNotification = true;
        this.guardarOn = false;
        this.disabledButton = false;
    }, error=>{
      alert("Lo sentimos, hubo un problema en el sistema");
      this.disabledButton = false;
    });
  };

  closePopup(e){
    this.showNotification = false;
    this.notificationType = [];
    this.notificationObjs = [];
    this.getNotificationType();
  }
};
