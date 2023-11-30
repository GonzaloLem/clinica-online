import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarraTurnosFinalizadosMedicoComponent } from './grafico-barra-turnos-finalizados-medico.component';

describe('GraficoBarraTurnosFinalizadosMedicoComponent', () => {
  let component: GraficoBarraTurnosFinalizadosMedicoComponent;
  let fixture: ComponentFixture<GraficoBarraTurnosFinalizadosMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoBarraTurnosFinalizadosMedicoComponent]
    });
    fixture = TestBed.createComponent(GraficoBarraTurnosFinalizadosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
