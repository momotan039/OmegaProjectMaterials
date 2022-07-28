import { Router } from '@angular/router';
import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { HttpMessagesService } from './../../services/HttpMessages.service';
import { HttpUserGroupService } from './../../services/http-user-group.service';
import { User } from 'src/app/models/User';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { Group } from 'src/app/models/Group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/Message';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit,OnDestroy {
fg=new FormGroup({})
title=""
subTitle=""
// receiverUser=new User()
// receiverGroup=new Group()
receiver:any
groups:Group[]=[]
freinds:User[]=[]
msgs:Message[]=[]
  // reciverID=-1
  constructor(
    private fb:FormBuilder,
    private httpGroupsService:HttpGroupsService,
    private httpUserGroupService:HttpUserGroupService,
    public httpAuth:AuthService,
    private httpMessagesService:HttpMessagesService,
    private router:Router
  ) {
  //remove scroller body
  document.body.classList.add("removeScroller")
  }
  ngOnDestroy(): void {
    this.subObs?.unsubscribe()
     //remove scroller body
  document.body.classList.remove("removeScroller")
  }

  ngOnInit(): void {


    this.fg=this.fb.group({
      message:["",Validators.required]
    })

    this.httpGroupsService.GetGroupsByUserId().subscribe
    (data=>{
      this.groups=data
    })

    this.httpUserGroupService.GetFreindsByUser().subscribe(data=>{
      this.freinds=data
    })
  }


  ChangeTitle_SubTitle(){
    if("courseId" in this.receiver)
   {
    this.title=this.receiver.name
    this.subTitle=this.receiver.course.name
   }
 else{
    this.title=this.receiver.firstName+" "+this.receiver.lastName
    this.subTitle=this.receiver.email
 }

  }
subObs?:Subscription
  ShowConversation(id:number){

    this.httpMessagesService.GetMessagesByReciver(id).subscribe(data=>{
      this.msgs=data
    })

    this.subObs=interval(5000).subscribe(()=>{
      this.httpMessagesService.GetMessagesByReciver(id).subscribe(data=>{
        this.msgs=data
      })
    })

  }
  SetResiver(obj:any){
   this.receiver=obj
   this.ChangeTitle_SubTitle();
   this.subObs?.unsubscribe()
   this.ShowConversation(this.receiver.id);
  }

  GetCustomDate(date:Date){
    const now = new Date(date);
    const current = now.getHours() + ':' + now.getMinutes();
    const strDate=now.toLocaleDateString()
    if(new Date().toLocaleDateString()!=strDate)
    return current+"~"+strDate
    return current
  }



  SendMessage(inputMessage:any,refListMessages:HTMLElement){
    if(!this.fg.valid)
    return


    if("courseId" in this.receiver)
      {

      }
    else{
       let msg=new Message(this.receiver.id,this.httpAuth.currentUser.id!,"",this.fg.value.message)

        this.httpMessagesService.SendMessageToFreind(msg).subscribe({
          complete:()=>{
            this.ShowConversation(this.receiver.id);
          },
          error:()=>{
            MyTools.Dialog.open(MessageDialogComponent,{
              data:{
                "title":"Session Expired",
                "content":"Failed Sending..Please Sign in Again",
                "icon":"alarm"
              }
            })
            this.router.navigate(["/login"])
          }
        })
    }
 //Clear current value
 inputMessage.value=""
 this.fg=this.fb.group({
   message:["",Validators.required]
 })
 //scroll down to bottom list Message
 setTimeout(() => {
  var objDiv = document.getElementById("gameArea");
  refListMessages.scrollTo({
    top: refListMessages.scrollHeight,
    behavior: 'smooth',
  })
},300)

  }
}
