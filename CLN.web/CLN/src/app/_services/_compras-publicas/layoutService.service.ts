import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()

export class LayoutService implements OnInit{

    constructor(){}

    private runLoading:boolean = false;
    public loadingEmisor = new Subject<boolean>();
    public cambiosEmisor = new Subject<boolean>();

    ngOnInit(): void {
        this.loadingEmisor.next(this.runLoading);
    }

    toogleLoading(){
        this.runLoading = !this.runLoading;
        this.loadingEmisor.next(this.runLoading);
    }

    showLoading(){
      this.loadingEmisor.next(true);
    }

    closeLoading(){
      this.loadingEmisor.next(false);
    }

    cerrarLoading(){
      this.runLoading = false;
      this.loadingEmisor.next(this.runLoading);
    }
}
