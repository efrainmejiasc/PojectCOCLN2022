import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHtmlToAnImageComponent } from './render-html-to-an-image.component';

describe('RenderHtmlToAnImageComponent', () => {
  let component: RenderHtmlToAnImageComponent;
  let fixture: ComponentFixture<RenderHtmlToAnImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderHtmlToAnImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderHtmlToAnImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
