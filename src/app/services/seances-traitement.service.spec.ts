import { TestBed } from '@angular/core/testing';

import { SeancesTraitementService } from './seances-traitement.service';

describe('SeancesTraitementService', () => {
  let service: SeancesTraitementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeancesTraitementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
