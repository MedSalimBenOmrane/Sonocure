import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatementComponent } from './treatement.component';

describe('TreatementComponent', () => {
  let component: TreatementComponent;
  let fixture: ComponentFixture<TreatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatementComponent]
    });
    fixture = TestBed.createComponent(TreatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
