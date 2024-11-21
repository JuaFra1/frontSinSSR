import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendamientosProgramadosComponent } from './arrendamientos-programados.component';

describe('ArrendamientosProgramadosComponent', () => {
  let component: ArrendamientosProgramadosComponent;
  let fixture: ComponentFixture<ArrendamientosProgramadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrendamientosProgramadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrendamientosProgramadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
