import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCitaAnfitrionComponent } from './gestionar-cita-anfitrion.component';

describe('GestionarCitaAnfitrionComponent', () => {
  let component: GestionarCitaAnfitrionComponent;
  let fixture: ComponentFixture<GestionarCitaAnfitrionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCitaAnfitrionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCitaAnfitrionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
