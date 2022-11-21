import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaDosNoticiasTendenciasComponent } from './plantilla-dos-noticias-tendencias.component';

describe('PlantillaDosNoticiasTendenciasComponent', () => {
  let component: PlantillaDosNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaDosNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaDosNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaDosNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
