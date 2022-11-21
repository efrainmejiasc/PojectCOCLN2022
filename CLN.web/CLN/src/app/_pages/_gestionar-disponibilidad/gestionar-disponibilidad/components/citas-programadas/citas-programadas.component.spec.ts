import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasProgramadasComponent } from './citas-programadas.component';

describe('CitasProgramadasComponent', () => {
  let component: CitasProgramadasComponent;
  let fixture: ComponentFixture<CitasProgramadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasProgramadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasProgramadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
