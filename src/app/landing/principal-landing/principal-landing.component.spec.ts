import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalLandingComponent } from './principal-landing.component';

describe('PrincipalLandingComponent', () => {
  let component: PrincipalLandingComponent;
  let fixture: ComponentFixture<PrincipalLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
