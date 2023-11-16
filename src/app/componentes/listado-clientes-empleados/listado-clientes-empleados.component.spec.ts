import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClientesEmpleadosComponent } from './listado-clientes-empleados.component';

describe('ListadoClientesEmpleadosComponent', () => {
  let component: ListadoClientesEmpleadosComponent;
  let fixture: ComponentFixture<ListadoClientesEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoClientesEmpleadosComponent]
    });
    fixture = TestBed.createComponent(ListadoClientesEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
