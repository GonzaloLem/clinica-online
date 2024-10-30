import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SacarTurnoPage } from './sacar-turno.page';

describe('SacarTurnoPage', () => {
  let component: SacarTurnoPage;
  let fixture: ComponentFixture<SacarTurnoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SacarTurnoPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SacarTurnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
