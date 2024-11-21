import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponentArrendador } from './inicio.component';

describe('InicioComponent', () => {
  let component: InicioComponentArrendador;
  let fixture: ComponentFixture<InicioComponentArrendador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponentArrendador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponentArrendador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
