import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { HomeWork } from 'src/app/models/HomeWork';
import { AuthService } from 'src/app/services/auth.service';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { HomeworkTeacherComponent } from '../../SubComponent/homework-teacher/homework-teacher.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.css']
})
export class AddHomeworkComponent implements OnInit {

  fg=this.fb.group({
    title:['',Validators.required],
    content:['',Validators.required],
    groupId:['',Validators.required],
    requiredSubmit:[,Validators.required],
  })

  homeworks:HomeWork[]=[]
    groups:Group[]=[]

  constructor(
    private httpGroupsService:HttpGroupsService,
    private authService:AuthService,
    private homeWorkService:HomeWorkService,
    private MatDialogRef:MatDialogRef<HomeworkTeacherComponent>,
     private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.httpGroupsService.GetGroupsByUserId().subscribe(data=>{
      this.groups=data
    })

    this.authService.currentUserSub.subscribe(user=>{
      this.homeWorkService.GetHomeWorkByTeacherId(user.id!)
      .subscribe((data)=>{
        this.homeworks=data as HomeWork[]
      })
    })
  }


  AddHomeWork(Files:any,containerProgress:HTMLElement,refProgress:MatProgressBar){
    if(!this.fg.valid)
      return

      let files=Files as File[]
     let fd=new FormData();
    fd.append("title",this.fg.get("title")?.value)
    fd.append("contents",this.fg.get("content")?.value)
    fd.append("groupId",this.fg.get("groupId")?.value)
    fd.append("requiredSubmit",this.fg.get("requiredSubmit")?.value)
    //add also teacher id to iform data
    fd.append("teacherId",+this.authService.currentUser.id!+"")

    for(let i=0;i<files.length;i++)
     fd.append("files",files[i])

     containerProgress.classList.remove("hidden")
     
     this.homeWorkService.SendHomeWork(fd).subscribe(data=>{

      if (data.type === HttpEventType.UploadProgress) {
        refProgress.value=Math.round((100 * data.loaded) / data.total!);
      }
      if (data.type === HttpEventType.Response) {
        MyTools.ShowResult200Message(data.body)
        this.MatDialogRef.close()
      }
     },(error)=>{
      MyTools.ShowFialdMessage(error,"Adding Home Work")
   })

  }
}
