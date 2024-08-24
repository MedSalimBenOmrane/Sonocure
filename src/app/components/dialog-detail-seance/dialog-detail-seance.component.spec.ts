import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailSeanceComponent } from './dialog-detail-seance.component';

describe('DialogDetailSeanceComponent', () => {
  let component: DialogDetailSeanceComponent;
  let fixture: ComponentFixture<DialogDetailSeanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailSeanceComponent]
    });
    fixture = TestBed.createComponent(DialogDetailSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
