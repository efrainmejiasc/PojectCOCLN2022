import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidosTemaComponent } from './contenidos-tema.component';

describe('ContenidosTemaComponent', () => {
  let component: ContenidosTemaComponent;
  let fixture: ComponentFixture<ContenidosTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidosTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidosTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
