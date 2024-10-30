import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirDiaHorarioComponent } from './elegir-dia-horario.component';

describe('ElegirDiaHorarioComponent', () => {
  let component: ElegirDiaHorarioComponent;
  let fixture: ComponentFixture<ElegirDiaHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirDiaHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElegirDiaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
