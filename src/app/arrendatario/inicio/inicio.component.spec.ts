import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponentArrendatario } from './inicio.component';

describe('InicioComponentArrendatario', () => {
  let component: InicioComponentArrendatario;
  let fixture: ComponentFixture<InicioComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
