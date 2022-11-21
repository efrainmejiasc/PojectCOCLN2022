import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaUnoComponent } from './plantilla-uno.component';

describe('PlantillaUnoComponent', () => {
  let component: PlantillaUnoComponent;
  let fixture: ComponentFixture<PlantillaUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
