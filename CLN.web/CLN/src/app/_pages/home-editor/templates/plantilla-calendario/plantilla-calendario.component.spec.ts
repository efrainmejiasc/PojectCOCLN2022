import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCalendarioComponent } from './plantilla-calendario.component';

describe('PlantillaCalendarioComponent', () => {
  let component: PlantillaCalendarioComponent;
  let fixture: ComponentFixture<PlantillaCalendarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCalendarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
