import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewCComponent } from './hebrew-c.component';

describe('HebrewCComponent', () => {
  let component: HebrewCComponent;
  let fixture: ComponentFixture<HebrewCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HebrewCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
