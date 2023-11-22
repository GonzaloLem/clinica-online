import { TestBed } from '@angular/core/testing';

import { HistorialClinicoService } from './historial-clinico.service';

describe('HistorialClinicoService', () => {
  let service: HistorialClinicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialClinicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
