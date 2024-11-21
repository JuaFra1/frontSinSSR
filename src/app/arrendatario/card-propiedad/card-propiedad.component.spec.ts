import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPropiedadComponentArrendatario } from './card-propiedad.component';

describe('CardPropiedadComponentArrendatario', () => {
  let component: CardPropiedadComponentArrendatario;
  let fixture: ComponentFixture<CardPropiedadComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPropiedadComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPropiedadComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
