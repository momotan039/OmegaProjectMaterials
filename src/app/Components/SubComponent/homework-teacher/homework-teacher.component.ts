import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { HomeWork } from 'src/app/models/HomeWork';
import { AuthService } from 'src/app/services/auth.service';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-homework-teacher',
  templateUrl: './homework-teacher.component.html',
  styleUrls: ['./homework-teacher.component.css']
})
export class HomeworkTeacherComponent implements OnInit {
  homeworks:HomeWork[]=[]
    groups:Group[]=[]
    fg=this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required],
      groupId:['',Validators.required],
    })
  constructor(
    private httpGroupsService:HttpGroupsService,
    private authService:AuthService,
    private homeWorkService:HomeWorkService,
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

  AddHomeWork(Files:any){
    if(!this.fg.valid)
      return

      let files=Files as File[]
     let fd=new FormData();
    fd.append("title",this.fg.get("title")?.value)
    fd.append("contents",this.fg.get("content")?.value)
    fd.append("groupId",this.fg.get("groupId")?.value)

    fd.append("teacherId",+this.authService.currentUser.id!+"")

    for(let i=0;i<files.length;i++)
     fd.append("files",files[i])

     this.homeWorkService.SendHomeWork(fd).subscribe(d=>{

      MyTools.Dialog.open(MessageDialogComponent,{
        data:{
          "title":"Success",
          "content":"HomeWork Saved Successfully!!"
        }
      })

      this.homeWorkService.GetHomeWorkByTeacherId(this.authService.currentUser.id!)
      .subscribe(data=>{
         this.homeworks=data as HomeWork[]
       })

     },(error)=>{
        MyTools.Dialog.open(MessageDialogComponent,{
          data:{
            "title":"Faild",
            "content":error
          }
        })
     })
   }
}
