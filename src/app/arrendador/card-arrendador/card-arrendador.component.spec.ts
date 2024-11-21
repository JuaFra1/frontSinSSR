import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArrendadorComponent } from './card-arrendador.component';

describe('CardArrendadorComponent', () => {
  let component: CardArrendadorComponent;
  let fixture: ComponentFixture<CardArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
