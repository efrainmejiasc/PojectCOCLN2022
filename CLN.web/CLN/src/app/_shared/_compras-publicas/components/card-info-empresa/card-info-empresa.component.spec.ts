import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoEmpresaComponent } from './card-info-empresa.component';

describe('CardInfoEmpresaComponent', () => {
  let component: CardInfoEmpresaComponent;
  let fixture: ComponentFixture<CardInfoEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInfoEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
