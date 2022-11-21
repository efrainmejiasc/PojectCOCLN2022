import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoNotificacionComponent } from './correo-notificacion.component';

describe('CorreoNotificacionComponent', () => {
  let component: CorreoNotificacionComponent;
  let fixture: ComponentFixture<CorreoNotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreoNotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
