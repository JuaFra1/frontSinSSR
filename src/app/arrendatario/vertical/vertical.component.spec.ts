import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalComponentArrendatario } from './vertical.component';

describe('VerticalComponent', () => {
  let component: VerticalComponentArrendatario;
  let fixture: ComponentFixture<VerticalComponentArrendatario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalComponentArrendatario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalComponentArrendatario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
