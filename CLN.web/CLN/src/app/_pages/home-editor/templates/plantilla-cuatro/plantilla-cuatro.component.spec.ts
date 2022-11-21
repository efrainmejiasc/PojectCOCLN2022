import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCuatroComponent } from './plantilla-cuatro.component';

describe('PlantillaCuatroComponent', () => {
  let component: PlantillaCuatroComponent;
  let fixture: ComponentFixture<PlantillaCuatroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCuatroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
