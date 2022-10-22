import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewDComponent } from './hebrew-d.component';

describe('HebrewDComponent', () => {
  let component: HebrewDComponent;
  let fixture: ComponentFixture<HebrewDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HebrewDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
