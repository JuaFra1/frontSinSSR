import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionPropiedadComponent } from './edicion-propiedad.component';

describe('EdicionPropiedadComponent', () => {
  let component: EdicionPropiedadComponent;
  let fixture: ComponentFixture<EdicionPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicionPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
