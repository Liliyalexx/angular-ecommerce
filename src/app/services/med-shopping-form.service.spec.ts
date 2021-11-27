import { TestBed } from '@angular/core/testing';

import { MedShoppingFormService } from './med-shopping-form.service';

describe('MedShoppingFormService', () => {
  let service: MedShoppingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedShoppingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
