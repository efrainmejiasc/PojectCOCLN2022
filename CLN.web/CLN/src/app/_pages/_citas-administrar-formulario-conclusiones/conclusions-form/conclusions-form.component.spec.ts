import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusionsFormComponent } from './conclusions-form.component';

describe('ConclusionsFormComponent', () => {
  let component: ConclusionsFormComponent;
  let fixture: ComponentFixture<ConclusionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConclusionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConclusionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
