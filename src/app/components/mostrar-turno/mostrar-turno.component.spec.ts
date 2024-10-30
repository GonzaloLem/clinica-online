import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarTurnoComponent } from './mostrar-turno.component';

describe('MostrarTurnoComponent', () => {
  let component: MostrarTurnoComponent;
  let fixture: ComponentFixture<MostrarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
