import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorNoticiasComponent } from './editor-noticias.component';

describe('EditorNoticiasComponent', () => {
  let component: EditorNoticiasComponent;
  let fixture: ComponentFixture<EditorNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorNoticiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
