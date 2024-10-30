import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaSeccionComponent } from './carta-seccion.component';

describe('CartaSeccionComponent', () => {
  let component: CartaSeccionComponent;
  let fixture: ComponentFixture<CartaSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
