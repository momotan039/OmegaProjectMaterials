import { SelectWithSearchComponent } from './../../select-with-search/select-with-search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { formatDate } from '@angular/common';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { GroupsComponent } from '../../admin/groups/groups.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit , AfterViewInit {
  courses:any
  @ViewChild("refSelectCourse") selectCourse=new SelectWithSearchComponent()

  constructor(
    private httpGroups:HttpGroupsService,
    private courseService:HttpCoursesService,
    private dialogRef:MatDialogRef<GroupsComponent>,
    private fb:FormBuilder,
    

    ) { }
  ngAfterViewInit(): void {
    this.AddGroupForm.addControl("courseId",this.selectCourse.myControl)

  }
    AddGroupForm=this.fb.group({
      name:['',Validators.required],
      openingDate:['',Validators.required],
      closingDate:['',Validators.required]
    })

  ngOnInit(): void {
   
  }

  SaveGroup(){
      if(!this.AddGroupForm.valid)
  return;

    //Start change dates to current offset of timezone
  let date=this.AddGroupForm.get("openingDate")?.value as Date
this.AddGroupForm.get("openingDate")?.setValue(date.toLocaleDateString())

date=this.AddGroupForm.get("closingDate")?.value as Date
this.AddGroupForm.get("closingDate")?.setValue(date.toLocaleDateString())
   //End change dates to current offset of timezone

  this.httpGroups.PostGroups(this.AddGroupForm.value).subscribe(data=>{
    MyTools.ShowResult200Message(data)
    this.dialogRef.close(true);
  },(err)=>{
    MyTools.ShowFialdMessage(err,"Adding Group")
    })
  }

  GetCourses=()=>{
    return  this.courseService.GetCourses()
  }
}
