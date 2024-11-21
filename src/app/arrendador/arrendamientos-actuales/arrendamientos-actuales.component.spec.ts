import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendamientosActualesComponent } from './arrendamientos-actuales.component';

describe('ArrendamientosActualesComponent', () => {
  let component: ArrendamientosActualesComponent;
  let fixture: ComponentFixture<ArrendamientosActualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendamientosActualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendamientosActualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
