import { HttpCoursesService } from './../../services/Http Courses/http-courses.service';
import { GroupsComponent } from './../../Components/groups/groups.component';
import { HttpGroupsService } from './../../services/http Groups/http-groups.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  courses:any
  constructor(
    private httpGroups:HttpGroupsService,
    private courseService:HttpCoursesService,
    private dialogRef:MatDialogRef<GroupsComponent>,
    private fb:FormBuilder,
    ) { }
    AddGroupForm=this.fb.group({
      name:['',Validators.required],
      courseId:['',Validators.required],
      openingDate:['',Validators.required],
      closingDate:['',Validators.required]
    })

  ngOnInit(): void {
    this.courseService.GetCourses().subscribe(data=>{
      this.courses=data
    })
  }

  SaveGroup(){
      if(!this.AddGroupForm.valid)
  return;
  this.httpGroups.PostGroups(this.AddGroupForm.value).subscribe(data=>{
    MyTools.Dialog.open(MessageDialogComponent,{
      data:{
        "title":"Success",
        "content":"Group Created Successfully"
      }
    })
    this.dialogRef.close();
  },err=>{
    MyTools.Dialog.open(MessageDialogComponent,{
      data:{
        "title":"Faild Creating",
        "content":`${err.error}`
      }
    })
  },)
  }
}
