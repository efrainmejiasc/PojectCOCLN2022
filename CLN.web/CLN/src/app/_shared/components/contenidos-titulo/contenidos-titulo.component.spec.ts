import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTituloComponent } from './contenidos-titulo.component';

describe('ContenidosTituloComponent', () => {
  let component: ContenidosTituloComponent;
  let fixture: ComponentFixture<ContenidosTituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
