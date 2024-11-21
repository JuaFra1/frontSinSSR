import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialArrendatarioComponent } from './historial-arrendatario.component';

describe('HistorialArrendatarioComponent', () => {
  let component: HistorialArrendatarioComponent;
  let fixture: ComponentFixture<HistorialArrendatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialArrendatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialArrendatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
