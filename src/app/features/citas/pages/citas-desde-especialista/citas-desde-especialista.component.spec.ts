import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDesdeEspecialistaComponent } from './citas-desde-especialista.component';

describe('CitasDesdeEspecialistaComponent', () => {
  let component: CitasDesdeEspecialistaComponent;
  let fixture: ComponentFixture<CitasDesdeEspecialistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDesdeEspecialistaComponent]
    });
    fixture = TestBed.createComponent(CitasDesdeEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
