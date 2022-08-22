import { Router } from '@angular/router';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MyTools } from 'src/app/constants/MyTools';
import { GroupsComponent } from '../../admin/groups/groups.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<GroupsComponent>,
    private fb:FormBuilder,
    private httpCourse:HttpCoursesService,

  ) { }

  ngOnInit(): void {
  }
  AddCourseForm=this.fb.group({
    name:['',Validators.required],
  })

  SaveGroup(){
    if(!this.AddCourseForm.valid)
return;
this.httpCourse.PostCourse(this.AddCourseForm.value).subscribe(data=>{
  MyTools.ShowResult200Message(data)
  this.dialogRef.close(true);
})
}
}
