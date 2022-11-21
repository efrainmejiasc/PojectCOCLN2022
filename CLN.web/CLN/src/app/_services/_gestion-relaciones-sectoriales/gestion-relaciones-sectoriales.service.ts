import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { DataCP } from "../../_model/_compras-publicas/compraspublicas.interfaces";

@Injectable({
  providedIn: 'root'
})

export class GestionRelacionesSectorialesService{

  constructor(private http: HttpClient){}

  getTemplateCorrelativa(){
    let dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCorrelativeTemplateFile`;
    return this.http.get<Blob>(dir,{ responseType: 'blob' as 'json' });
  };

  getTemplateUnspsc(){
    let dir = `${environment.apiUrl}/api/UNSPSCClassifier/getClassifierTemplateFile`;
    return this.http.get<Blob>(dir,{ responseType: 'blob' as 'json' });
  };

  getCorrelativeFileName(){
    let dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getCorrelativeFileName`;
    return this.http.get<DataCP>(dir);
  }

  getUnspscFileName(){
    let dir = `${environment.apiUrl}/api/UNSPSCClassifier/getClassifierFileName`;
    return this.http.get<DataCP>(dir);
  }

  uploadFile(file:File, correlativaSelected:boolean){
    let dir = `${environment.apiUrl}`

    if(correlativaSelected){
      dir += `/api/CPCIIUUNSPSCCLNCorrelative/validateFile`;
    }else{
      dir += `/api/UNSPSCClassifier/validateFile`;
    };

    const fd = new FormData();
    fd.append('files', file, file.name);

    return this.http.post<DataCP>(dir, fd);
  };

  generateReport(id:string, correlativaSelected:boolean){
    let dir = `${environment.apiUrl}`;

    if(correlativaSelected){
      dir += `/api/CPCIIUUNSPSCCLNCorrelative/getValidationReportFile?fileIdentifier=${id}`;
    }else{
      dir += `/api/UNSPSCClassifier/getValidationReportFile?fileIdentifier=${id}`;
    };

    return this.http.get<Blob>(dir,{ responseType: 'blob' as 'json' });
  };

  uploadInfoCorrelativeToServer(id:string){
    let dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/uploadCorrelativeRecords?fileIdentifier=${id}`;
    return this.http.post<DataCP>(dir, id);
  };

  uploadInfoUnspscToServer(id:string){
    let dir = `${environment.apiUrl}/api/UNSPSCClassifier/uploadClassifierRecords?fileIdentifier=${id}`;
    return this.http.post<DataCP>(dir, id);
  };

  downloadUploadedCorrelativeRecords(){
    let dir = `${environment.apiUrl}/api/CPCIIUUNSPSCCLNCorrelative/getUploadedCorrelativeRecords`;
    return this.http.get<Blob>(dir,{ responseType: 'blob' as 'json' });
  };

  downloadUploadedUnspscRecords(){
    let dir = `${environment.apiUrl}/api/UNSPSCClassifier/getUploadedClassifierRecords`;
    return this.http.get<Blob>(dir,{ responseType: 'blob' as 'json' });
  };
};

