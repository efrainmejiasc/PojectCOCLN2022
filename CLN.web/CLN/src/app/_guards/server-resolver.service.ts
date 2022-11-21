import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
//import { AuthenticationService } from "../_services/_compras-publicas/authentication.service";

interface Server{
  id:number;
  name:string;
  status: string;
}

/* @Injectable() */

/* export class ServerResolver implements Resolve<Server>{

  constructor(private auth:AuthenticationService){

  }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Server> | Promise<Server> | Server{

  }
} */
