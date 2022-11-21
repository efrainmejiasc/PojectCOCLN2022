import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class GestionMisInteresesService{

  idCompanyProfile:number;

  constructor(private http: HttpClient){}

  getNotificationType(){
    return this.http.get(`${environment.apiUrl}/api/Common/getNotificationType`);
  }

  setIdCompanyProfile(id:number){
    console.log(id);
    this.idCompanyProfile = id;
    //this.idCompanyProfile = 4;
  };

  getActualCompanyId(){
    return this.idCompanyProfile;
  };

  getCompanyInterest(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getCompanyInterest?companyId=${this.idCompanyProfile}`);
  }

  getEmpresas(mail:string){

    //let mail2 = "bruno@patagonian.it"
    //return this.http.get(`${environment.apiUrl}/api/User/getUserCompaniestoManage?emailUser=${mail2}`);

    return this.http.get(`${environment.apiUrl}/api/User/GetUserCompaniestoAppointments?emailUser=${mail}`);
  };

  getDepartamentos(){
    return this.http.get(`${environment.apiUrl}/api/Common/getTerritorialentities`);
  };

  getModes(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getHiringProcessesMode`);
  };

  getHiringProcessesStage(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getHiringProcessesStage`);
  }

  getMaximunValue(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getHiringProcessMaximumValue`);
  }

  geAcquisitionPlanMaximumValue(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/geAcquisitionPlanMaximumValue`);
  }

  getClassifiersNodeChildren(nodeCode:number){
    return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getClassifiersNodeChildren?nodeCode=${nodeCode}`);
  }

  getClassifiersNodeChildren2(nodeCode:number, level:number){
    return this.http.get(`${environment.apiUrl}/api/UNSPSCClassifier/getClassifiersNodeChildren?nodeCode=${nodeCode}&&level=${level}`);
  }

  createCompanyInterest(companyInterest:any){
    //console.log(companyInterest);

    let dir = `${environment.apiUrl}/api/CompanyInterest/createCompanyInterest`;
    return this.http.post(dir, companyInterest);
  }

  updateCompanyInterest(companyInterest:any){
    console.log(companyInterest);
    let dir = `${environment.apiUrl}/api/CompanyInterest/updateCompanyInterest`;
    return this.http.post(dir, companyInterest);
  };

  searchEntidadPlanes(word:string){
    return this.http.get(`${environment.apiUrl}/api/AcquisitionPlans/filterCompaniesNameWithAcquisitionPlans?companyNameFilter=${word}`);
  };

  searchEntidad(word:string){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/filterCompaniesNameWithHiringProcess?companyNameFilter=${word}`);
  };

  getCompanyInterestNotification(){
    return this.http.get(`${environment.apiUrl}/api/CompanyInterest/getCompanyInterestNotification?companyId=${this.idCompanyProfile}`);
  }

  setCompanyInterestNotification(companyNotification){
    //console.log(companyNotification);
    let dir = `${environment.apiUrl}/api/CompanyInterest/setCompanyInterestNotification`;
    return this.http.post(dir, companyNotification);
  };
};


