import { HttpUsersService } from 'src/app/services/http-users.service';
import { Test } from './../../../models/Test';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { Grade } from 'src/app/models/Grade';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { HttpGradesService } from 'src/app/services/http-grades.service';
import { GradesComponent } from '../../grades/grades.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { SelectWithSearchComponent } from '../../select-with-search/select-with-search.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-grade',
  templateUrl: './edit-grade.component.html',
  styleUrls: ['./edit-grade.component.css']
})
export class EditGradeComponent implements OnInit,AfterViewInit {
  groups:Group[]=[]
  students:User[]=[]
  tests:Test[]=[]
  fg=new FormGroup({})
  @ViewChild("refSelectTest") selectTest=new SelectWithSearchComponent()
  @ViewChild("refSelectGroup") selectGroup=new SelectWithSearchComponent()
  @ViewChild("refSelectStudent") selectStudent=new SelectWithSearchComponent()
  studentsObserv: any;
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
      sumGrade:[data.sumGrade,Validators.required],
      note:[data.note]
    })

  }
  ngAfterViewInit(): void {
    //set value of controls by passed data 
    this.selectTest.myControl.setValue(this.data.testId)
    this.selectGroup.myControl.setValue(this.data.groupId)
    this.selectStudent.myControl.setValue(this.data.studentId)
    //append select controls to my form group controls
    this.fg.addControl("testId",this.selectTest.myControl)
    this.fg.addControl("groupId",this.selectGroup.myControl)
    this.fg.addControl("studentId",this.selectStudent.myControl)

    //get students when change group
    this.fg.get("groupId")?.valueChanges.subscribe(data=>{
      debugger
      this.ChangeStudentsList(data)
      this.selectStudent.RefreshData();
      //Start clear Student selection
      this.selectStudent.myControl.setValue("");
      let inputStudent=document.querySelectorAll(".inputStudent")[1] as any
      inputStudent.value=""
      //End clear Student selection
     })

  }

  ngOnInit(): void {
    
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
    debugger
    this.studentsObserv.next(this.students)
  }

  SaveRecord(){
    // console.warn(this.fg.value)
    // console.warn(this.selectStudent.autocomplete)
    // return
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
    },(err)=>{
      MyTools.ShowFialdMessage(err,"Editing Grade")
      })

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
