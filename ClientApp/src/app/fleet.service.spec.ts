import { TestBed, inject } from '@angular/core/testing';

import { FleetService } from './fleet.service';

describe('FleetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FleetService]
    });
  });

  it('should be created', inject([FleetService], (service: FleetService) => {
    expect(service).toBeTruthy();
  }));
});
