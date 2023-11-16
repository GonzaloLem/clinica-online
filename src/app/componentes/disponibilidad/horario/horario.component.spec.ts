import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioComponent } from './horario.component';

describe('HorarioComponent', () => {
  let component: HorarioComponent;
  let fixture: ComponentFixture<HorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioComponent]
    });
    fixture = TestBed.createComponent(HorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
