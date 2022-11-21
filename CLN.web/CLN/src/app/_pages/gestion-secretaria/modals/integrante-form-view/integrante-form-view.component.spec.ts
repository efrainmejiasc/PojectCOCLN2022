import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegranteFormViewComponent } from './integrante-form-view.component';

describe('IntegranteFormViewComponent', () => {
  let component: IntegranteFormViewComponent;
  let fixture: ComponentFixture<IntegranteFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegranteFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegranteFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
