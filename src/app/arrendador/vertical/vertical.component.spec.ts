import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalComponentArrendador } from './vertical.component';

describe('VerticalComponent', () => {
  let component: VerticalComponentArrendador;
  let fixture: ComponentFixture<VerticalComponentArrendador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalComponentArrendador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalComponentArrendador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
