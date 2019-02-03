/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DemoChildFormService } from './demo-child-form.service';

describe('Service: DemoChildForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoChildFormService]
    });
  });

  it('should ...', inject([DemoChildFormService], (service: DemoChildFormService) => {
    expect(service).toBeTruthy();
  }));
});
