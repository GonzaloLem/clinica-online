import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { permisosAdministradorGuard } from './permisos-administrador.guard';

describe('permisosAdministradorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => permisosAdministradorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
