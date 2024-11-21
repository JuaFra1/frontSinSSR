import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesArrendadorComponent } from './propiedades-arrendador.component';

describe('PropiedadesArrendadorComponent', () => {
  let component: PropiedadesArrendadorComponent;
  let fixture: ComponentFixture<PropiedadesArrendadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesArrendadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadesArrendadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
