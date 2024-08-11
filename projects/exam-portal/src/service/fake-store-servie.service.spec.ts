import { TestBed } from '@angular/core/testing';

import { FakeStoreServieService } from './fake-store-servie.service';

describe('FakeStoreServieService', () => {
  let service: FakeStoreServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeStoreServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
