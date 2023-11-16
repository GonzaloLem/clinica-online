import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosDisponiblesComponent } from './horarios-disponibles.component';

describe('HorariosDisponiblesComponent', () => {
  let component: HorariosDisponiblesComponent;
  let fixture: ComponentFixture<HorariosDisponiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorariosDisponiblesComponent]
    });
    fixture = TestBed.createComponent(HorariosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
