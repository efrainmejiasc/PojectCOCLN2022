import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCincoNoticiasTendenciasComponent } from './plantilla-cinco-noticias-tendencias.component';

describe('PlantillaCincoNoticiasTendenciasComponent', () => {
  let component: PlantillaCincoNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaCincoNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCincoNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCincoNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
