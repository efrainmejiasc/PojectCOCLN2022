import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDosComponent } from './plantilla-dos.component';

describe('PlantillaDosComponent', () => {
  let component: PlantillaDosComponent;
  let fixture: ComponentFixture<PlantillaDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
