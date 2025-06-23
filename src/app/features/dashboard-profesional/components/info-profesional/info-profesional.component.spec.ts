import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfesionalComponent } from './info-profesional.component';

describe('InfoProfesionalComponent', () => {
  let component: InfoProfesionalComponent;
  let fixture: ComponentFixture<InfoProfesionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProfesionalComponent]
    });
    fixture = TestBed.createComponent(InfoProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
