import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usuariosLogueadosGuard } from './usuarios-logueados.guard';

describe('usuariosLogueadosGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usuariosLogueadosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
