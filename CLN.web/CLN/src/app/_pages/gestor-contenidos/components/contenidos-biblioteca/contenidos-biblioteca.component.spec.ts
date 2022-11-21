import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosBibliotecaComponent } from './contenidos-biblioteca.component';

describe('ContenidosBibliotecaComponent', () => {
  let component: ContenidosBibliotecaComponent;
  let fixture: ComponentFixture<ContenidosBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
