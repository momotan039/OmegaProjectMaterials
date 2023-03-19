import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewAComponent } from './hebrew-a.component';

describe('HebrewAComponent', () => {
  let component: HebrewAComponent;
  let fixture: ComponentFixture<HebrewAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HebrewAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
