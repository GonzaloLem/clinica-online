import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaEspecialidadDisponibilidadComponent } from './carta-especialidad-disponibilidad.component';

describe('CartaEspecialidadDisponibilidadComponent', () => {
  let component: CartaEspecialidadDisponibilidadComponent;
  let fixture: ComponentFixture<CartaEspecialidadDisponibilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaEspecialidadDisponibilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaEspecialidadDisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
