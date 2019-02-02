/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DemoFormService } from './demo-form.service';

describe('Service: DemoForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoFormService]
    });
  });

  it('should ...', inject([DemoFormService], (service: DemoFormService) => {
    expect(service).toBeTruthy();
  }));
});
