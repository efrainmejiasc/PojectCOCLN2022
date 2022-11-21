import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarConclusionesComponent } from './administrar-conclusiones.component';

describe('AdministrarConclusionesComponent', () => {
  let component: AdministrarConclusionesComponent;
  let fixture: ComponentFixture<AdministrarConclusionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarConclusionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarConclusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
