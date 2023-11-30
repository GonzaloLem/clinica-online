import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarGraficosComponent } from './mostrar-graficos.component';

describe('MostrarGraficosComponent', () => {
  let component: MostrarGraficosComponent;
  let fixture: ComponentFixture<MostrarGraficosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarGraficosComponent]
    });
    fixture = TestBed.createComponent(MostrarGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
