import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPropiedadesComponentArrendatario } from './lista-propiedades.component';

describe('ListaPropiedadesComponentArrendatario', () => {
  let component: ListaPropiedadesComponentArrendatario;
  let fixture: ComponentFixture<ListaPropiedadesComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPropiedadesComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPropiedadesComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
