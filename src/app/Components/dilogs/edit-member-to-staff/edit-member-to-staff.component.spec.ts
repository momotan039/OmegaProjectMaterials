import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberToStaffComponent } from './edit-member-to-staff.component';

describe('EditMemberToStaffComponent', () => {
  let component: EditMemberToStaffComponent;
  let fixture: ComponentFixture<EditMemberToStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberToStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberToStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
