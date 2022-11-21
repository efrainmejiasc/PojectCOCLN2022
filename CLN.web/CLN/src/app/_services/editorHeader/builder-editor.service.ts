import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { templateStructure } from 'src/app/_model/home-editor/templateStructure.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuilderEditorService {

  private filter: boolean = false;
  public actionReload = new BehaviorSubject(this.filter);

  constructor(private http: HttpClient) { }
  apiEditor = `${environment.apiUrl}/api/HomeComponent/`;

  public findDataBuilder() {
    //trae configuraciones del header
    return this.http.get<templateStructure[]>("/assets/json/home-builder.json");
    // return this.http.get<templateStructure[]>(`${this.apiEditor}getPublishedComponents`);
  }

  public findDataBuilderSerice() {
    return this.http.get<templateStructure[]>(`${this.apiEditor}getComponents`);
  }
  
  public createComponent(template: templateStructure[]) {
    return this.http.post<any>(`${this.apiEditor}createComponents`, template);
  }
  public updateComponent(template: templateStructure[]) {
    return this.http.put<any>(`${this.apiEditor}updateComponents`, template);
  }
  public publishTemplate(template: templateStructure[]) {
    return this.http.post<any>(`${this.apiEditor}publishComponentsHome`, {});
  }

  public uploadeMedia(pFile: File) {
    const formData = new FormData();
    formData.append('pFile', pFile, pFile.name);
    return this.http.post<any>(`${this.apiEditor}saveMultimediaComponent`, formData);
  }

  public deleteComponent(id) {
    return this.http.delete(`${this.apiEditor}deleteComponent/?id=${id}`);
  }

  public updateEditor() {
    (this.filter) ? this.filter = false : this.filter = true;
    this.actionReload.next(this.filter);
  }
}
