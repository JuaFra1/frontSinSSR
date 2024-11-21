import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBusquedaComponentArrendatario } from './barra-busqueda.component';

describe('BarraBusquedaComponent', () => {
  let component: BarraBusquedaComponentArrendatario;
  let fixture: ComponentFixture<BarraBusquedaComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBusquedaComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
