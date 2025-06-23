import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasProfesionalComponent } from './citas-profesional.component';

describe('CitasProfesionalComponent', () => {
  let component: CitasProfesionalComponent;
  let fixture: ComponentFixture<CitasProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasProfesionalComponent]
    });
    fixture = TestBed.createComponent(CitasProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
