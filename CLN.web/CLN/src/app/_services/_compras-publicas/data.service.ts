import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { MenuCP } from "../../_model/_compras-publicas/compraspublicas.interfaces";
import { UserCas } from "../../_model/_compras-publicas/cas.interfaces";
import { IcasResponse } from "../../_model/_compras-publicas/cas.interfaces";

@Injectable()

export class DataService{

  constructor(private http: HttpClient){}

  getUserMenusSinUsuario() {

    let mail = "adminCLN@yopmail.com";
    //mail = "empresaCLN@yopmail.com";
    //mail = "adminempresaCLN@yopmail.com";

    return this.http.get<MenuCP[]>(`${environment.apiUrl}/api/User/GetMenusandPermitsbyUser?emailUser=${mail}`);
  }

  getUserMenus(user:UserCas) {

    let mail=user.email;

    return this.http.get<MenuCP[]>(`${environment.apiUrl}/api/User/GetMenusandPermitsbyUser?emailUser=${mail}`);
  }

  updateUserCompanyProfile(user:UserCas) {
    let userId=user.id;
    return this.http.put<any>(`${environment.apiUrl}/api/User/updateUserCompaniesInformation/${userId}`,null);
  }
/*
  uploadFile(file:File, correlativaSelected:boolean){

    let dir = `${environment.apiUrl}`

    if(correlativaSelected){
      dir += `/api/CPCIIUUNSPSCCLNCorrelative/validateFile`;
    }else{
      alert("no es correlativa");
      //dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/validateFile`;
    }

    const fd = new FormData();
    fd.append('files', file, file.name);

    return this.http.post<IcasResponse>(dir, fd);
  }

  generateReport(id:string){
    let dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getValidationReportFile?fileIdentifier=${id}`;

    return this.http.get(dir,{ responseType: 'blob' as 'json' })
  } */
}

