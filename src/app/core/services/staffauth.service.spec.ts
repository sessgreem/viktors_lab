import { TestBed } from '@angular/core/testing';

import { StaffauthService } from './staffauth.service';

describe('StaffauthService', () => {
  let service: StaffauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
