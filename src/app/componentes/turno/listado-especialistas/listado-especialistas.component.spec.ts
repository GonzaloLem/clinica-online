import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEspecialistasComponent } from './listado-especialistas.component';

describe('ListadoEspecialistasComponent', () => {
  let component: ListadoEspecialistasComponent;
  let fixture: ComponentFixture<ListadoEspecialistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoEspecialistasComponent]
    });
    fixture = TestBed.createComponent(ListadoEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
