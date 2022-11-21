import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCapacidadesComponent } from './content-capacidades.component';

describe('ContentCapacidadesComponent', () => {
  let component: ContentCapacidadesComponent;
  let fixture: ComponentFixture<ContentCapacidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCapacidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCapacidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
