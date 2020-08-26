/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleGuardService } from './Role-Guard.service';

describe('Service: RoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleGuardService]
    });
  });

  it('should ...', inject([RoleGuardService], (service: RoleGuardService) => {
    expect(service).toBeTruthy();
  }));
});
