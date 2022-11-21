
import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";

export const mimeType = (control:AbstractControl): Promise<any> | Observable <any> =>{

  const promise = new Promise<any>((resolve, reject)=>{

    const file = control.value as File;

    const extension = file.name.slice( ((file.name.lastIndexOf(".") - 1) + 2) );

    if(extension !== "xlsx"){
      alert("El archivo que estas intentando cargar no es válido");
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener("loadend", ()=>{
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

      let header = "";
      let isValid = false;
      for(let i = 0; i < arr.length; i++){
        header += arr[i].toString(16);
      }
      console.log(header);

      switch(header){
        case "504b34":
          isValid = true;
          resolve(null);
          break;
        default:
          isValid = false;
          resolve({'mimeOk':false});
          alert("El archivo que estas intentando cargar no es válido");
           // Or you can use the blob.type as fallback
          break;
      }
    })
    fileReader.readAsArrayBuffer(file);
  });

  return promise;
}

/* import { AbstractControl } from "@angular/forms";

import { Observable, Observer } from "rxjs";

export const mimeType = (control:AbstractControl): Promise<{[key: string]:any}> | Observable <{[key: string]:any}> =>{

  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]:any}>) =>{
    fileReader.addEventListener("loadend", ()=>{
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

      let header = "";
      let isValid = false;
      for(let i = 0; i < arr.length; i++){
        header += arr[i].toString(16);
      }

      console.log(header);
      switch(header){
        case "504b34":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if(isValid){
        observer.next({validMimeType:true});
      }else{
        observer.next({invalidMimeType:true});
      }
      observer.complete();
      alert(isValid);
    })
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
 */
