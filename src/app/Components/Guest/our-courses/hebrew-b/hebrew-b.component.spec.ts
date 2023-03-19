import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewBComponent } from './hebrew-b.component';

describe('HebrewBComponent', () => {
  let component: HebrewBComponent;
  let fixture: ComponentFixture<HebrewBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HebrewBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
