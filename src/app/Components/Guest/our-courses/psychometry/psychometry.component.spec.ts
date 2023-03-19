import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychometryComponent } from './psychometry.component';

describe('PsychometryComponent', () => {
  let component: PsychometryComponent;
  let fixture: ComponentFixture<PsychometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
