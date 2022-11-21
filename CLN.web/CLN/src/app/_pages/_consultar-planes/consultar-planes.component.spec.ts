import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPlanesComponent } from './consultar-planes.component';

describe('ConsultarPlanesComponent', () => {
  let component: ConsultarPlanesComponent;
  let fixture: ComponentFixture<ConsultarPlanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPlanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
