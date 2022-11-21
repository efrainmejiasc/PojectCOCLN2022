import { TestBed } from '@angular/core/testing';

import { BuilderEditorService } from './builder-editor.service';

describe('BuilderEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuilderEditorService = TestBed.get(BuilderEditorService);
    expect(service).toBeTruthy();
  });
});
