import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberToStaffComponent } from './add-member-to-staff.component';

describe('AddMemberToStaffComponent', () => {
  let component: AddMemberToStaffComponent;
  let fixture: ComponentFixture<AddMemberToStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberToStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberToStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
