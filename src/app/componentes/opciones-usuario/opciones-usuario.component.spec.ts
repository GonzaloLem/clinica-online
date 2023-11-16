import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesUsuarioComponent } from './opciones-usuario.component';

describe('OpcionesUsuarioComponent', () => {
  let component: OpcionesUsuarioComponent;
  let fixture: ComponentFixture<OpcionesUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpcionesUsuarioComponent]
    });
    fixture = TestBed.createComponent(OpcionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
