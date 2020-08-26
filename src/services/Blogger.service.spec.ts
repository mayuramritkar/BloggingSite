/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BloggerService } from './Blogger.service';

describe('Service: Blogger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloggerService]
    });
  });

  it('should ...', inject([BloggerService], (service: BloggerService) => {
    expect(service).toBeTruthy();
  }));
});
