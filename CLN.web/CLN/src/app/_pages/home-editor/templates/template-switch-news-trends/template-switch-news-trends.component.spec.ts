import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSwitchNewsTrendsComponent } from './template-switch-news-trends.component';

describe('TemplateSwitchNewsTrendsComponent', () => {
  let component: TemplateSwitchNewsTrendsComponent;
  let fixture: ComponentFixture<TemplateSwitchNewsTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSwitchNewsTrendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSwitchNewsTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
