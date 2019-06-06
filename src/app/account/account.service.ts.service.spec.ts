import { TestBed, inject } from '@angular/core/testing';

import { Account.Service.TsService } from './account.service.ts.service';

describe('Account.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Account.Service.TsService]
    });
  });

  it('should be created', inject([Account.Service.TsService], (service: Account.Service.TsService) => {
    expect(service).toBeTruthy();
  }));
});
