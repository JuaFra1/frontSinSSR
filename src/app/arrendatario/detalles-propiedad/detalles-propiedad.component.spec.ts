import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPropiedadComponentArrendatario } from './detalles-propiedad.component';

describe('DetallesPropiedadComponentArrendatario', () => {
  let component: DetallesPropiedadComponentArrendatario;
  let fixture: ComponentFixture<DetallesPropiedadComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesPropiedadComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPropiedadComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
