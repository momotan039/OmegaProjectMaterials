import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { HttpCoursesService } from 'src/app/services/Http Courses/http-courses.service';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
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
    if (!this.EditGroupForm.valid) return;
    debugger
    this.httpGroups.EditingGroups(this.EditGroupForm.value).subscribe(
      (data) => {
        MyTools.Dialog.open(MessageDialogComponent, {
          data: {
            title: 'Success',
            content: 'Group Edited Successfully',
          },
        });
        this.dialogRef.close();
      },
      (err) => {
        MyTools.Dialog.open(MessageDialogComponent, {
          data: {
            title: 'Faild Editing',
            content: `${err.error}`,
          },
        });
      }
    );
  }
}