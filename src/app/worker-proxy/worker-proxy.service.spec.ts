import { TestBed, inject } from '@angular/core/testing';

import { WorkerProxyService } from './worker-proxy.service';

describe('WorkerProxyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerProxyService]
    });
  });

  it('should be created', inject([WorkerProxyService], (service: WorkerProxyService) => {
    expect(service).toBeTruthy();
  }));
});
