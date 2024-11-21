import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEliminarPropiedadComponent } from './pop-up-eliminar-propiedad.component';

describe('PopUpEliminarPropiedadComponent', () => {
  let component: PopUpEliminarPropiedadComponent;
  let fixture: ComponentFixture<PopUpEliminarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpEliminarPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEliminarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
