import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentComponent } from './car-rent.component';

describe('CarRentComponent', () => {
  let component: CarRentComponent;
  let fixture: ComponentFixture<CarRentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarRentComponent]
    });
    fixture = TestBed.createComponent(CarRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
