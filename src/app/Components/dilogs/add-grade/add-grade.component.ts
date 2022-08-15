import { HttpTestsService } from './../../../services/HttpTests.service';
import { catchError, map } from 'rxjs';
import { Grade } from './../../../models/Grade';
import { HttpGradesService } from './../../../services/http-grades.service';
import { User } from 'src/app/models/User';
import { Group } from 'src/app/models/Group';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { GradesComponent } from './../../grades/grades.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';
import { Test } from 'src/app/models/Test';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent implements OnInit {
  groups:Group[]=[]
  students:User[]=[]
  tests:Test[]=[]
  constructor(
    private httpGroupsService:HttpGroupsService,
    private httpGradesService:HttpGradesService,
    private httpTestsService:HttpTestsService,
    private dialogRef:MatDialogRef<GradesComponent>,
    private fb:FormBuilder,

  ) { }
  fg=this.fb.group({
    groupId:['',Validators.required],
    studentId:['',Validators.required],
    sumGrade:['',Validators.required],
    testId:['',Validators.required],
    note:['']
  })
  ngOnInit(): void {
    this.httpGroupsService.GetGroups().subscribe(data=>{
      this.groups=data;
    })
    this.httpTestsService.GetTests().subscribe(data=>{
      this.tests=data
    })
  }
  SaveRecord(){
    if(!this.fg.valid)
    return;
    let grade=new Grade();
    grade.groupId=this.fg.get('groupId')?.value;
    grade.studentId=this.fg.get('studentId')?.value;
    grade.sumGrade=this.fg.get('sumGrade')?.value;
    grade.testId=this.fg.get('testId')?.value;
    grade.note=this.fg.get('note')?.value;
    this.httpGradesService.PostGrades(grade).pipe(
    )
    .subscribe((response: any) => {
      MyTools.ShowResult200Message(response)
      this.dialogRef.close(true);
      })
  }

  ChangeStudentsList(val:any){
    this.students=[]
    this.groups.find(f=>f.id==val)?.userGroups.forEach(ug=>{
      if(ug.user.roleId==3)
        this.students.push(ug.user)
    })

  }
}
