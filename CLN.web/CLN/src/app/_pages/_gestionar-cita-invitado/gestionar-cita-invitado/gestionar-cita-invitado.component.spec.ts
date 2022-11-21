import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCitaInvitadoComponent } from './gestionar-cita-invitado.component';

describe('GestionarCitaInvitadoComponent', () => {
  let component: GestionarCitaInvitadoComponent;
  let fixture: ComponentFixture<GestionarCitaInvitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCitaInvitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCitaInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
