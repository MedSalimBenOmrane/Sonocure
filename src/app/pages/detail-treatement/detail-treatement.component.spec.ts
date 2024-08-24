import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTreatementComponent } from './detail-treatement.component';

describe('DetailTreatementComponent', () => {
  let component: DetailTreatementComponent;
  let fixture: ComponentFixture<DetailTreatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTreatementComponent]
    });
    fixture = TestBed.createComponent(DetailTreatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
