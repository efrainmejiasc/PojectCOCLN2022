import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasInvitadoComponent } from './citas-invitado.component';

describe('CitasInvitadoComponent', () => {
  let component: CitasInvitadoComponent;
  let fixture: ComponentFixture<CitasInvitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasInvitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
