import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSeanceTreatmentComponent } from './item-seance-treatment.component';

describe('ItemSeanceTreatmentComponent', () => {
  let component: ItemSeanceTreatmentComponent;
  let fixture: ComponentFixture<ItemSeanceTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSeanceTreatmentComponent]
    });
    fixture = TestBed.createComponent(ItemSeanceTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
