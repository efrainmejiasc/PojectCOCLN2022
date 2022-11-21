import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaFooterComponent } from './plantilla-footer.component';

describe('PlantillaFooterComponent', () => {
  let component: PlantillaFooterComponent;
  let fixture: ComponentFixture<PlantillaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
