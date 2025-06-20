import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDesdeServicioComponent } from './citas-desde-servicio.component';

describe('CitasDesdeServicioComponent', () => {
  let component: CitasDesdeServicioComponent;
  let fixture: ComponentFixture<CitasDesdeServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDesdeServicioComponent]
    });
    fixture = TestBed.createComponent(CitasDesdeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
