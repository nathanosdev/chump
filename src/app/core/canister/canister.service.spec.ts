import { TestBed } from '@angular/core/testing';

import { CanisterService } from './canister.service';

describe('CanisterService', () => {
  let service: CanisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
