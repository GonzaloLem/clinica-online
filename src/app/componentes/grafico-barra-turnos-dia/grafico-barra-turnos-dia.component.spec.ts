import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarraTurnosDiaComponent } from './grafico-barra-turnos-dia.component';

describe('GraficoBarraTurnosDiaComponent', () => {
  let component: GraficoBarraTurnosDiaComponent;
  let fixture: ComponentFixture<GraficoBarraTurnosDiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoBarraTurnosDiaComponent]
    });
    fixture = TestBed.createComponent(GraficoBarraTurnosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
