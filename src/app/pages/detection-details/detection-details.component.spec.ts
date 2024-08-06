import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionDetailsComponent } from './detection-details.component';

describe('DetectionDetailsComponent', () => {
  let component: DetectionDetailsComponent;
  let fixture: ComponentFixture<DetectionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetectionDetailsComponent]
    });
    fixture = TestBed.createComponent(DetectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
