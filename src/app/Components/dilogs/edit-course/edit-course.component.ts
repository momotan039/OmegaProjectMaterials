import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MyTools } from 'src/app/constants/MyTools';
import { CoursesComponent } from '../../admin/courses/courses.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  EditCourseForm=new FormGroup({})
  constructor(
    private dialogRef:MatDialogRef<CoursesComponent>,
    private fb:FormBuilder,
    private httpCourse:HttpCoursesService,

    @Inject(MAT_DIALOG_DATA) private data:Course
  ) {
    this.EditCourseForm=this.fb.group({
      name:[data.name,Validators.required],
      id:[data.id,Validators.required],
    })
  }

  ngOnInit(): void {
  }
  SaveGroup(){
    if(!this.EditCourseForm.valid)
return;
this.httpCourse.EditingCourse(this.EditCourseForm.value).subscribe(data=>{
  MyTools.ShowResult200Message(data)
  this.dialogRef.close(true);
},(err)=>{
  MyTools.ShowFialdMessage(err,"Editing Course")
  })
}
}
