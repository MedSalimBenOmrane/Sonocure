import { TestBed } from '@angular/core/testing';

import { ImageIrmService } from './image-irm.service';

describe('ImageIrmService', () => {
  let service: ImageIrmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageIrmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
