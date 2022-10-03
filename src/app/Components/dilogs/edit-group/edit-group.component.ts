import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { GroupsComponent } from '../../admin/groups/groups.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css'],
})
export class EditGroupComponent implements OnInit {
  courses: any;
  EditGroupForm=new FormGroup({});
  constructor(
    private httpGroups: HttpGroupsService,
    private courseService: HttpCoursesService,
    private dialogRef: MatDialogRef<GroupsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Group
  ) {
    this.EditGroupForm = this.fb.group({
      name: [data.name, Validators.required],
      courseId: [data.courseId, Validators.required],
      openingDate: [data.openingDate, Validators.required],
      closingDate: [data.closingDate, Validators.required],
      id: [data.id, Validators.required],
    });

    this.courseService.GetCourses().subscribe((d) => {
      this.courses = d;
    });
  }

  ngOnInit(): void {}

  SaveGroup() {
    debugger
    if (!this.EditGroupForm.valid) return;

     //Start change dates to current offset of timezone
  let date=this.EditGroupForm.get("openingDate")?.value as Date
  this.EditGroupForm.get("openingDate")?.setValue(date.toLocaleString())

  date=this.EditGroupForm.get("closingDate")?.value as Date
  this.EditGroupForm.get("closingDate")?.setValue(date.toLocaleString())
     //End change dates to current offset of timezone
    this.httpGroups.EditingGroups(this.EditGroupForm.value).subscribe(
      (data) => {
       MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },
      (err) => {
       MyTools.ShowFialdMessage(err,"Save Group")
      }
    );
  }
}
