import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNombreUsuarioComponent } from './barra-nombre-usuario.component';

describe('BarraNombreUsuarioComponent', () => {
  let component: BarraNombreUsuarioComponent;
  let fixture: ComponentFixture<BarraNombreUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraNombreUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNombreUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
