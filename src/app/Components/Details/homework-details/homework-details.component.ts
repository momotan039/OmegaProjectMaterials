import { HomeWorkStudentService } from './../../../services/home-work-student.service';
import { HttpUsersService } from './../../../services/http-users.service';
import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { HomeWorkFile } from './../../../models/HomeWorkFile';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeWork } from 'src/app/models/HomeWork';
import { filter, Observable, Observer, BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css']
})
export class HomeworkDetailsComponent implements OnInit {
  id=0
  students_behavior=new BehaviorSubject<any>({})
  students:Array<any>=[]
  submitedStudents=0
  homeWork=new HomeWork()
  constructor(
    private route:ActivatedRoute,
    private homeWorkService:HomeWorkService,
    public homeWorkStudentService:HomeWorkStudentService,
    public httpUsersService:HttpUsersService,
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.homeWorkService.GetHomeWorks(this.id).subscribe(data=>{
      this.homeWork=data as HomeWork
      //get all submited students
      this.homeWorkStudentService.GetSubmitedHomeworkById(this.id)
      .subscribe(data=>{
        this.students_behavior.next(data)
        this.students=data
        this.submitedStudents=this.students.filter(f=>f.submited=="Yes").length
      })
    })
  }

  convertPathsToArray(path:string){
    const last=path.charAt(path.length - 1);
    if(last=='\n')
    path=path.slice(0,-1)
  return path.split('\n')
  }

  getFileName(path:string){
    return  path.replace(/^.*[\\\/]/, '');
  }


  donwloadFile(path:any){
    let hwf=new HomeWorkFile(
      this.getFileName(path),
      this.homeWork.group?.id!,
      this.homeWork.teacher?.id!
      )

      this.homeWorkService.DownloadHomeWorkFile(hwf)

      .subscribe(data => {
          const blob = new Blob([data as BlobPart]);
          const url= window.URL.createObjectURL(blob);
          const link = document.createElement( 'a' );
          link.style.display = 'none';
          document.body.appendChild( link );
          link.href=url
          link.download=hwf.name
          link.click()

      },(error)=>{
       MyTools.Dialog.open(MessageDialogComponent
        ,{
          data:{
            "title":"Fiald Download",
            "content":"This File Not Found"
          }
        })
      })
  }

}

