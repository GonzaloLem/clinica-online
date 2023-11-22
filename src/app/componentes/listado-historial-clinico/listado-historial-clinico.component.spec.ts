import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoHistorialClinicoComponent } from './listado-historial-clinico.component';

describe('ListadoHistorialClinicoComponent', () => {
  let component: ListadoHistorialClinicoComponent;
  let fixture: ComponentFixture<ListadoHistorialClinicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoHistorialClinicoComponent]
    });
    fixture = TestBed.createComponent(ListadoHistorialClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
