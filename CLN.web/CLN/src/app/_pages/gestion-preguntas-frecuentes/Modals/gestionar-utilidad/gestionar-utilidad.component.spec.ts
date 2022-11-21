import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUtilidadComponent } from './gestionar-utilidad.component';

describe('GestionarUtilidadComponent', () => {
  let component: GestionarUtilidadComponent;
  let fixture: ComponentFixture<GestionarUtilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarUtilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarUtilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
