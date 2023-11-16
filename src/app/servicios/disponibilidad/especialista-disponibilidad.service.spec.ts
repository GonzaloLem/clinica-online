import { TestBed } from '@angular/core/testing';

import { EspecialistaDisponibilidadService } from './especialista-disponibilidad.service';

describe('EspecialistaDisponibilidadService', () => {
  let service: EspecialistaDisponibilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialistaDisponibilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
