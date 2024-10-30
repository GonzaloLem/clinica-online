import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionSacarTurnoComponent } from './informacion-sacar-turno.component';

describe('InformacionSacarTurnoComponent', () => {
  let component: InformacionSacarTurnoComponent;
  let fixture: ComponentFixture<InformacionSacarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacionSacarTurnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformacionSacarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
