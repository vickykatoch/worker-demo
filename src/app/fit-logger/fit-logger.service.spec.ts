import { TestBed, inject } from '@angular/core/testing';

import { FitLoggerService } from './fit-logger.service';

describe('FitLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitLoggerService]
    });
  });

  it('should be created', inject([FitLoggerService], (service: FitLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
