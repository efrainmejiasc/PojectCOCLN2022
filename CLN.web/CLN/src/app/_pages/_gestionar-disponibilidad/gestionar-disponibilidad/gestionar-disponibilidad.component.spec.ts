import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarDisponibilidadComponent } from './gestionar-disponibilidad.component';

describe('GestionarDisponibilidadComponent', () => {
  let component: GestionarDisponibilidadComponent;
  let fixture: ComponentFixture<GestionarDisponibilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarDisponibilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
