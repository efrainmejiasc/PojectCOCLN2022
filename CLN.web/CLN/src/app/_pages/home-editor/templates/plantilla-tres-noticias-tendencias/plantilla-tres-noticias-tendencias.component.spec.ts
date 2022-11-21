import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaTresNoticiasTendenciasComponent } from './plantilla-tres-noticias-tendencias.component';

describe('PlantillaTresNoticiasTendenciasComponent', () => {
  let component: PlantillaTresNoticiasTendenciasComponent;
  let fixture: ComponentFixture<PlantillaTresNoticiasTendenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaTresNoticiasTendenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaTresNoticiasTendenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
