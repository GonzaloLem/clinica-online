import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEspecialidadEspecialistaComponent } from './agregar-especialidad-especialista.component';

describe('AgregarEspecialidadEspecialistaComponent', () => {
  let component: AgregarEspecialidadEspecialistaComponent;
  let fixture: ComponentFixture<AgregarEspecialidadEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarEspecialidadEspecialistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarEspecialidadEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
