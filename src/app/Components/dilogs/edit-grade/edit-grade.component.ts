import { HttpUsersService } from 'src/app/services/httpUsers/http-users.service';
import { Test } from './../../../models/Test';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { Grade } from 'src/app/models/Grade';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { HttpGradesService } from 'src/app/services/http-grades.service';
import { GradesComponent } from '../../grades/grades.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit {
  groups:Group[]=[]
  students:User[]=[]
  tests:Test[]=[]
  fg=new FormGroup({})
  constructor(
    private httpGroupsService:HttpGroupsService,
    private httpGradesService:HttpGradesService,
    private httpUsersService:HttpUsersService,
    private httpTestsService:HttpTestsService,
    private dialogRef:MatDialogRef<GradesComponent>,
    private fb:FormBuilder,

    @Inject(MAT_DIALOG_DATA) private data:Grade
  ) {
    this.fg=this.fb.group({
      groupId:[data.groupId,Validators.required],
      studentId:[data.studentId,Validators.required],
      sumGrade:[data.sumGrade,Validators.required],
      testId:[data.testId,Validators.required],
      note:[data.note]
    })
  }

  ngOnInit(): void {
    this.httpGroupsService.GetGroups().subscribe(data=>{
      this.groups=data;
    })
    this.httpUsersService.GetUsersByRole(3).subscribe(data=>{
      this.students=data
    })
    this.httpTestsService.GetTests().subscribe(data=>{
      this.tests=data
    })
  }
  ChangeStudentsList(val:any){
    this.students=[]
    this.groups.find(f=>f.id==val)?.userGroups.forEach(ug=>{
      if(ug.user.roleId==3)
        this.students.push(ug.user)
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
    grade.id=this.data.id
    this.httpGradesService.EditGrades(grade).subscribe(data=>{
      MyTools.ShowResult200Message(data)

      this.dialogRef.close(true);
    })

  }
}
