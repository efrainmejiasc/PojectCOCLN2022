import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputSearchComponent } from './text-input-search.component';

describe('TextInputSearchComponent', () => {
  let component: TextInputSearchComponent;
  let fixture: ComponentFixture<TextInputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInputSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
