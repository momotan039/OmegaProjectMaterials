import { MessageDialogComponent } from './../message-dialog/message-dialog.component';
import { HomeWork } from './../../../models/HomeWork';
import { HomeworkTeacherComponent } from './../../SubComponent/homework-teacher/homework-teacher.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/models/Group';
import { AuthService } from 'src/app/services/auth.service';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { MyTools } from 'src/app/constants/MyTools';
import { MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-edit-homework',
  templateUrl: './edit-homework.component.html',
  styleUrls: ['./edit-homework.component.css']
})
export class EditHomeworkComponent implements OnInit {
  fg=new FormGroup({})
  groups:Group[]=[]
  constructor(
    private httpGroupsService:HttpGroupsService,
    private authService:AuthService,
    private homeWorkService:HomeWorkService,
    private dialogRef:MatDialogRef<HomeworkTeacherComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data:HomeWork
  ) {
  this.fg=this.fb.group({
    title:[data.title,Validators.required],
    content:[data.contents,Validators.required],
    groupId:[data.groupId,Validators.required],
    requiredSubmit:[data.requiredSubmit,Validators.required],
  })
   }

  ngOnInit(): void {
    this.httpGroupsService.GetGroupsByUserId().subscribe(data=>{
      this.groups=data
    })

  }

  EditHomeWork(Files:any){
    if(!this.fg.valid)
    return

    let files=Files as File[]
   let fd=new FormData();
  fd.append("id",this.data.id+"")
  fd.append("title",this.fg.get("title")?.value)
  fd.append("contents",this.fg.get("content")?.value)
  fd.append("groupId",this.fg.get("groupId")?.value)
  fd.append("requiredSubmit",this.fg.get("requiredSubmit")?.value)
  //add also teacher id to iform data
  fd.append("teacherId",+this.authService.currentUser.id!+"")

  for(let i=0;i<files.length;i++)
   fd.append("files",files[i])

   this.homeWorkService.EditHomeWork(fd).subscribe(d=>{
    MyTools.ShowResult200Message(d)
    this.dialogRef.close(true)
   },(error)=>{
    MyTools.ShowFialdMessage(error,"Editing Home Work")
 })
  }


  ChangeRadioGroupOption(event:any){
    if(!event.value)
    {
      MyTools.Dialog.open(MessageDialogComponent,{
        data:{
          'title':'Warning',
          'content':'All related submited Students Will Delete !!',
          'icon':"warning"
        }
      })
    }
  }
}
