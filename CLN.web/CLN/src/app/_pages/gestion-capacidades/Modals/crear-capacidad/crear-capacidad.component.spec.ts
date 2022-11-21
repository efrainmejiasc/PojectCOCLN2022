import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCapacidadComponent } from './crear-capacidad.component';

describe('CrearCapacidadComponent', () => {
  let component: CrearCapacidadComponent;
  let fixture: ComponentFixture<CrearCapacidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCapacidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
