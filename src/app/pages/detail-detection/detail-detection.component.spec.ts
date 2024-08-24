import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDetectionComponent } from './detail-detection.component';

describe('DetailDetectionComponent', () => {
  let component: DetailDetectionComponent;
  let fixture: ComponentFixture<DetailDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDetectionComponent]
    });
    fixture = TestBed.createComponent(DetailDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
