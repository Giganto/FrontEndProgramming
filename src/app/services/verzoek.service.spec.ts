import { TestBed } from '@angular/core/testing';

import { VerzoekService } from './verzoek.service';

describe('VerzoekService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerzoekService = TestBed.get(VerzoekService);
    expect(service).toBeTruthy();
  });
});
