import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarHistorialComponent } from './administrar-historial.component';

describe('AdministrarHistorialComponent', () => {
  let component: AdministrarHistorialComponent;
  let fixture: ComponentFixture<AdministrarHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrarHistorialComponent]
    });
    fixture = TestBed.createComponent(AdministrarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
