import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaComponent } from './especialista.component';

describe('EspecialistaComponent', () => {
  let component: EspecialistaComponent;
  let fixture: ComponentFixture<EspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialistaComponent]
    });
    fixture = TestBed.createComponent(EspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
