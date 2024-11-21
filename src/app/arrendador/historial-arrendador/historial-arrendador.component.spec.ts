import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialArrendadorComponent } from './historial-arrendador.component';

describe('HistorialArrendadorComponent', () => {
  let component: HistorialArrendadorComponent;
  let fixture: ComponentFixture<HistorialArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
