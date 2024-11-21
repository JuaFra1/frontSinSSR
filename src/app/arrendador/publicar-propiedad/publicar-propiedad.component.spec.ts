import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarPropiedadComponent } from './publicar-propiedad.component';

describe('PublicarPropiedadComponent', () => {
  let component: PublicarPropiedadComponent;
  let fixture: ComponentFixture<PublicarPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
