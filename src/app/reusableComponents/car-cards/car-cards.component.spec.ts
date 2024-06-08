import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCardsComponent } from './car-cards.component';

describe('CarCardsComponent', () => {
  let component: CarCardsComponent;
  let fixture: ComponentFixture<CarCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarCardsComponent]
    });
    fixture = TestBed.createComponent(CarCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
