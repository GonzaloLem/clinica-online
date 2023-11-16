import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { misTurnosGuard } from './mis-turnos.guard';

describe('misTurnosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => misTurnosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
