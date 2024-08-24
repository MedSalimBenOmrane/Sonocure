import { TestBed } from '@angular/core/testing';

import { SeancesDetectionService } from './seances-detection.service';

describe('SeancesDetectionService', () => {
  let service: SeancesDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeancesDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
