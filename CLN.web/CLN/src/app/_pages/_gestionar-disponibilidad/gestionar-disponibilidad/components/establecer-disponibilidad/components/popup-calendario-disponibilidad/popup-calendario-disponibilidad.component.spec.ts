import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCalendarioDisponibilidadComponent } from './popup-calendario-disponibilidad.component';

describe('PopupCalendarioDisponibilidadComponent', () => {
  let component: PopupCalendarioDisponibilidadComponent;
  let fixture: ComponentFixture<PopupCalendarioDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCalendarioDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCalendarioDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
