import { SelectWithSearchComponent } from './../../select-with-search/select-with-search.component';
import { AuthService } from './../../../services/auth.service';
import { MyLocalStorage } from './../../../services/MyLocalStorage';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { catchError, map, startWith, Observable, BehaviorSubject } from 'rxjs';
import { Grade } from './../../../models/Grade';
import { HttpGradesService } from './../../../services/http-grades.service';
import { User } from 'src/app/models/User';
import { Group } from 'src/app/models/Group';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { GradesComponent } from './../../grades/grades.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class AddGradeComponent implements OnInit,AfterViewInit {
  students:User[]=[]
  studentsObserv= new BehaviorSubject<User[]>([]);
  @ViewChild("refSelectTest") selectTest=new SelectWithSearchComponent()
  @ViewChild("refSelectGroup") selectGroup=new SelectWithSearchComponent()
  @ViewChild("refSelectStudent") selectStudent=new SelectWithSearchComponent()
  constructor(
    private httpGroupsService:HttpGroupsService,
    private httpGradesService:HttpGradesService,
    private httpTestsService:HttpTestsService,
    private dialogRef:MatDialogRef<GradesComponent>,
    private fb:FormBuilder,
  ) { }
  ngAfterViewInit(): void {
 this.fg.addControl("testId",this.selectTest.myControl)
 this.fg.addControl("groupId",this.selectGroup.myControl)
 this.fg.addControl("studentId",this.selectStudent.myControl)

 this.fg.get("groupId")?.valueChanges.subscribe(data=>{
  this.ChangeStudentsList(data)
  this.selectStudent.RefreshData();
  //Start clear Student selection
  this.selectStudent.myControl.setValue("");
  let inputStudent=document.querySelectorAll(".inputStudent")[1] as any
  inputStudent.value=""
  //End clear Student selection
 })
  }
  fg=this.fb.group({
    sumGrade:['',Validators.compose(
      [Validators.required,
      Validators.maxLength(3),
      Validators.min(0),
      Validators.max(800)])],
    note:['']
  })
  ngOnInit(): void {
    
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
    this.httpGradesService.PostGrades(grade)
    .subscribe((response: any) => {
      MyTools.ShowResult200Message(response)
      this.dialogRef.close(true);
      },(error)=>{
        MyTools.ShowFialdMessage(error,"Adding Grade");
      })
  }

  ChangeStudentsList(val:any){
    this.students=[]
    this.studentsObserv=new BehaviorSubject<User[]>([]);

    this.selectGroup.options.find(f=>f.id==val)?.userGroups.forEach((ug: { user: User; })=>{
      if(ug.user.roleId==3)
       {
        this.students.push(ug.user)
       }
    })
    this.studentsObserv.next(this.students)
  }

 

 GetStudents=()=>{
  return  this.studentsObserv.asObservable();
 }
 GetTests=()=>{
  return this.httpTestsService.GetTests()
 }
 GetGroups=()=>{
  return this.httpGroupsService.GetGroups()
 }
}
