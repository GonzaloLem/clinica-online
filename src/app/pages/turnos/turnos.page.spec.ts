import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPage } from './turnos.page';

describe('TurnosPage', () => {
  let component: TurnosPage;
  let fixture: ComponentFixture<TurnosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
