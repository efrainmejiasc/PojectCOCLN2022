import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaHeaderComponent } from './plantilla-header.component';

describe('PlantillaHeaderComponent', () => {
  let component: PlantillaHeaderComponent;
  let fixture: ComponentFixture<PlantillaHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
