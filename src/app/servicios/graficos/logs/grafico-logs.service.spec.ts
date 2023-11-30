import { TestBed } from '@angular/core/testing';

import { GraficoLogsService } from './grafico-logs.service';

describe('GraficoLogsService', () => {
  let service: GraficoLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
