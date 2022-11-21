import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCincoComponent } from './plantilla-cinco.component';

describe('PlantillaCincoComponent', () => {
  let component: PlantillaCincoComponent;
  let fixture: ComponentFixture<PlantillaCincoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCincoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCincoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
