import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { soloPacientesGuard } from './solo-pacientes.guard';

describe('soloPacientesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => soloPacientesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
