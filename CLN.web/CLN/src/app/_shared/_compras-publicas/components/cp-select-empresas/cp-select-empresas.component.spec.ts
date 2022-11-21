import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpSelectEmpresasComponent } from './cp-select-empresas.component';

describe('CpSelectEmpresasComponent', () => {
  let component: CpSelectEmpresasComponent;
  let fixture: ComponentFixture<CpSelectEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpSelectEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpSelectEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
