import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEspecialidadesComponent } from './listado-especialidades.component';

describe('ListadoEspecialidadesComponent', () => {
  let component: ListadoEspecialidadesComponent;
  let fixture: ComponentFixture<ListadoEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEspecialidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
