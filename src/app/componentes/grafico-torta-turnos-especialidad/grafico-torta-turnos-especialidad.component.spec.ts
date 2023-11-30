import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTortaTurnosEspecialidadComponent } from './grafico-torta-turnos-especialidad.component';

describe('GraficoTortaTurnosEspecialidadComponent', () => {
  let component: GraficoTortaTurnosEspecialidadComponent;
  let fixture: ComponentFixture<GraficoTortaTurnosEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoTortaTurnosEspecialidadComponent]
    });
    fixture = TestBed.createComponent(GraficoTortaTurnosEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
