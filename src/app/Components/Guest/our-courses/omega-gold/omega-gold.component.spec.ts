import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmegaGoldComponent } from './omega-gold.component';

describe('OmegaGoldComponent', () => {
  let component: OmegaGoldComponent;
  let fixture: ComponentFixture<OmegaGoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmegaGoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmegaGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
