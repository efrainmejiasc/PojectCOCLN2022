import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaSeisNoticiasTendenciasComponent } from './plantilla-seis-noticias-tendencias.component';

describe('PlantillaSeisNoticiasTendenciasComponent', () => {
  let component: PlantillaSeisNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaSeisNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaSeisNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaSeisNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
