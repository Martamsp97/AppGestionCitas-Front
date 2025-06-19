import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaCardComponent } from './especialista-card.component';

describe('EspecialistaCardComponent', () => {
  let component: EspecialistaCardComponent;
  let fixture: ComponentFixture<EspecialistaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialistaCardComponent]
    });
    fixture = TestBed.createComponent(EspecialistaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
