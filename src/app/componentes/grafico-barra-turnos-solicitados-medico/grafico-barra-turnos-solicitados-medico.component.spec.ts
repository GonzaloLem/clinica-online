import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarraTurnosSolicitadosMedicoComponent } from './grafico-barra-turnos-solicitados-medico.component';

describe('GraficoBarraTurnosSolicitadosMedicoComponent', () => {
  let component: GraficoBarraTurnosSolicitadosMedicoComponent;
  let fixture: ComponentFixture<GraficoBarraTurnosSolicitadosMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoBarraTurnosSolicitadosMedicoComponent]
    });
    fixture = TestBed.createComponent(GraficoBarraTurnosSolicitadosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
