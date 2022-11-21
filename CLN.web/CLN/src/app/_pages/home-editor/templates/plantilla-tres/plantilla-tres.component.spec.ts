import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTresComponent } from './plantilla-tres.component';

describe('PlantillaTresComponent', () => {
  let component: PlantillaTresComponent;
  let fixture: ComponentFixture<PlantillaTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
