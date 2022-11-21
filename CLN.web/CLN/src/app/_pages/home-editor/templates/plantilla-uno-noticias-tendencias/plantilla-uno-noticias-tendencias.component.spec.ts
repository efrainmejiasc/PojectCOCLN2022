import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaUnoNoticiasTendenciasComponent } from './plantilla-uno-noticias-tendencias.component';

describe('PlantillaUnoNoticiasTendenciasComponent', () => {
  let component: PlantillaUnoNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaUnoNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaUnoNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaUnoNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
