import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedDoneComponent } from './reserved-done.component';

describe('ReservedDoneComponent', () => {
  let component: ReservedDoneComponent;
  let fixture: ComponentFixture<ReservedDoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservedDoneComponent]
    });
    fixture = TestBed.createComponent(ReservedDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
