import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPropiedadComponent } from './detalles-propiedad.component';

describe('DetallesPropiedadComponent', () => {
  let component: DetallesPropiedadComponent;
  let fixture: ComponentFixture<DetallesPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
