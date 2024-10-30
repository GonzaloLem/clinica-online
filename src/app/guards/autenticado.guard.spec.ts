import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenticadoGuard } from './autenticado.guard';

describe('autenticadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenticadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
