import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSeanceDetecionComponent } from './item-seance-detecion.component';

describe('ItemSeanceDetecionComponent', () => {
  let component: ItemSeanceDetecionComponent;
  let fixture: ComponentFixture<ItemSeanceDetecionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSeanceDetecionComponent]
    });
    fixture = TestBed.createComponent(ItemSeanceDetecionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
