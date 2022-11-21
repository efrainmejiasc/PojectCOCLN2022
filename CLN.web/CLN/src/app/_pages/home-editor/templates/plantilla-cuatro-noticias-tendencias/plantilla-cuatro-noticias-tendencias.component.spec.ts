import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaCuatroNoticiasTendenciasComponent } from './plantilla-cuatro-noticias-tendencias.component';

describe('PlantillaCuatroNoticiasTendenciasComponent', () => {
  let component: PlantillaCuatroNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaCuatroNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaCuatroNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaCuatroNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
