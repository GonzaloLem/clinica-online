import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosDefaultsComponent } from './usuarios-defaults.component';

describe('UsuariosDefaultsComponent', () => {
  let component: UsuariosDefaultsComponent;
  let fixture: ComponentFixture<UsuariosDefaultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosDefaultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuariosDefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
