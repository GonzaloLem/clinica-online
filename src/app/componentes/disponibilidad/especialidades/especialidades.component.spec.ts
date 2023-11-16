import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadesComponent } from './especialidades.component';

describe('EspecialidadesComponent', () => {
  let component: EspecialidadesComponent;
  let fixture: ComponentFixture<EspecialidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadesComponent]
    });
    fixture = TestBed.createComponent(EspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
