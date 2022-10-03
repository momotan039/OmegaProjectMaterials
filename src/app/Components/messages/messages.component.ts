import { MatList } from '@angular/material/list';
import { MessageGroup } from './../../models/MessageGroup';
import { Router, Data } from '@angular/router';
import { HttpMessagesService } from './../../services/HttpMessages.service';
import { HttpUserGroupService } from './../../services/http-user-group.service';
import { User } from 'src/app/models/User';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/Message';
import { interval, Subscription, Observable, filter, Subject, timeout } from 'rxjs';
import { MessageDialogComponent } from '../dilogs/message-dialog/message-dialog.component';
import { DeleteUserComponent } from '../dilogs/delete-user/delete-user.component';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { style } from '@angular/animations';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  fg = new FormGroup({});
  title = '';
  subTitle = '';
  imageContact = '';
  receiver: any;
  groups: Group[] = [];
  filteredGroups: Group[] = [];
  freinds: User[] = [];
  filteredFreinds: User[] = [];
  msgs: any = [];
  msgObs?: Subscription;
  emoji:EmojiService | undefined;
  hideEmojiTable=true
  @ViewChild('refListMessages')ListMessagesContainer:HTMLElement | undefined
  ShowSpinner=false;
  lastConversation: Subscription | undefined;
  msgInterval: Subscription | undefined;
  found_previous=false;
  previousMsgs=[];
  constructor(
    private fb: FormBuilder,
    private httpGroupsService: HttpGroupsService,
    private httpUserGroupService: HttpUserGroupService,
    public httpAuth: AuthService,
    private httpMessagesService: HttpMessagesService,
    private router: Router
  ) {
    // //remove scroller body
    // document.body.classList.add('removeScroller');
  }


  ngOnDestroy(): void {
    this.msgObs?.unsubscribe();
    this.msgInterval?.unsubscribe()
    //remove scroller body
    // document.body.classList.remove('removeScroller');
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      message: ['', Validators.required],
    });

    this.httpGroupsService.GetGroupsByUserId().subscribe((data) => {
      this.groups = data;
      this.filteredGroups=this.groups
        //filter contact friends when recive new messages
        MyTools.msgsReader?.subscribe(data=>{
          this.filteredGroups=this.groups.sort((a,b)=>{
             return MyTools.unreadMsgs.filter(f=>f.reciverId==b.id).length
             -MyTools.unreadMsgs.filter(f=>f.reciverId==a.id).length
         })
        })

    });

    

    this.httpUserGroupService.GetFreindsByUser().subscribe((data) => {
      this.freinds = data;
      //filter contact friends when recive new messages
      MyTools.msgsReader?.subscribe(data=>{
      this.filteredFreinds=this.freinds.sort((a,b)=>{
         return MyTools.unreadMsgs.filter(f=>f.senderId==b.id).length
         -MyTools.unreadMsgs.filter(f=>f.senderId==a.id).length
     })
    })
    });

    

    this.HandelScrollingMessages();
  }
  isReciverGroup() {
    return 'courseId' in this.receiver;
  }
  ScrollingDownListMessage() {
  
    //scroll down to bottom list Message
    if(!this.CountUnreadMessages(this.receiver))
    {
      setTimeout(() => {
         document.querySelector('.listMessages')?.scrollTo({
          top: document.querySelector('.listMessages')?.scrollHeight,
          behavior: 'smooth',
        });
      }, 300);
    }

    else{
      setTimeout(() => {
        const offsetTopMessage=(document.querySelector('.unread-message') as HTMLElement).offsetTop
      const offsetHeightParent=(document.querySelector('.listMessages') as HTMLElement).offsetHeight
      console.warn(offsetTopMessage-offsetHeightParent)
         document.querySelector('.listMessages')?.scrollTo({
          top: offsetTopMessage-offsetHeightParent,
          behavior: 'smooth',
        });
      }, 300);
    }
  }

  ChangeTitle_SubTitle_Image() {
    if (this.isReciverGroup()) {
      this.title = this.receiver.name;
      this.subTitle = this.receiver.course.name;
    } else {
      this.title = this.receiver.firstName + ' ' + this.receiver.lastName;
      this.subTitle = this.receiver.email;
    }
    this.imageContact = this.GetImageProfile(this.receiver);

  }

  GetStreamMessages(_idContact:number){
    const getMessagesFun=this.SelectModeMessages();
         this.msgInterval=interval(2000).subscribe(_num=>{
               this.msgObs=getMessagesFun.subscribe(event=>{
              if (event.type==HttpEventType.Response)
            {
             this.msgs=this.previousMsgs.concat(event.body['messages'])
             this.ReadMessages(document.querySelector(".listMessages")!)
            }
         })
         })
  }
  
  GetPreviousMessages(){
    if(!this.found_previous)
    return

    let getPreviousMessagesFun: Observable<HttpEvent<any>>

    if(this.isReciverGroup())
        getPreviousMessagesFun=this.httpMessagesService.GetPreviousMessagesGroup(
          this.receiver.id,this.msgs.length)
    else
    getPreviousMessagesFun=this.httpMessagesService.GetPreviousMessages(
      this.receiver.id,this.msgs.length)

    this.ShowSpinner=true
    setTimeout(() => {
      getPreviousMessagesFun.subscribe(event=>{
        if (event.type==HttpEventType.Response)
        {
         this.previousMsgs=event.body['messages'].concat(this.previousMsgs)
         this.found_previous=event.body['found_previous']
         this.ReadMessages(document.querySelector(".listMessages")!)
         this.ShowSpinner=false
        }
      })
    }, 500);
    
  }

  SelectModeMessages(){
  //get Messages By Contact
  let getMessagesFun:Observable<HttpEvent<any>>;
  if (this.isReciverGroup())
    getMessagesFun = this.httpMessagesService.GetGroupMessagesByReciver(
      this.receiver.id,
      this.msgs.length
    );
  else
    getMessagesFun = this.httpMessagesService.GetMessagesByReciver(
      this.receiver.id,
      this.msgs.length
    );
    return getMessagesFun
  }
 
  ShowConversation() {
  
      const getMessagesFun=this.SelectModeMessages()
      
      this.ShowSpinner=true;
        //to show spinner for half second
        setTimeout(() => {
          this.lastConversation=getMessagesFun.subscribe((event) => {
            if(event.type==HttpEventType.Response)
              {
                 this.GetStreamMessages(this.receiver.id);
                 this.msgs = event.body['messages'];
                 this.found_previous=event.body['found_previous']
                 this.ScrollingDownListMessage();
                 this.ShowSpinner=false
              }
          });
        }, 500);
  }

  SetResiver(obj: any) {

    if(this.receiver && obj.id==this.receiver.id)
    return
    //empty it to display spinner clearly
    this.msgs=[]
    this.previousMsgs=[]
    //stop interval of call messages
    this.msgInterval?.unsubscribe();
    //stop get Current request messages
    this.msgObs?.unsubscribe();
    // this.lastConversation?.unsubscribe();
    this.receiver = obj;
    
    this.ChangeTitle_SubTitle_Image();
    this.ShowConversation();
  }

  IsMessageSentToday(date: Date) {
    const now = new Date(date);
    const current = now.getHours() + ':' + now.getMinutes();
    const strDate = now.toLocaleDateString();
    return new Date().toLocaleDateString() == strDate
  }

  SendMessage(inputMessage: any) {
    if (!this.fg.valid) return;
    
    let SendMessageFun;
    if (this.isReciverGroup()) {
      let msg = new MessageGroup(
        this.receiver.id,
        this.httpAuth.currentUser.id!,
        this.fg.value.message
      );
      SendMessageFun = this.httpMessagesService.SendGroupMessage(msg);
    } else {
      let msg = new Message(
        this.receiver.id,
        this.httpAuth.currentUser.id!,
        this.fg.value.message
      );

      SendMessageFun = this.httpMessagesService.SendMessageToFreind(msg);
    }

    SendMessageFun.subscribe({
      complete: () => {
          setTimeout(() => {
            this.ScrollingDownListMessage()
          }, 1000);
      },
      error: () => {
        MyTools.ShowExpiredSessionMessage();
        this.httpAuth.LogOut()
      },
    });

    //Clear current value
    inputMessage.value = '';
    this.fg = this.fb.group({
      message: ['', Validators.required],
    });
    // hide Emoji Tables
        this.hideEmojiTable=true
  }

  DeleteMesssage(id: number) {
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: any) => {
      if (success) {
        let deleteFun;

        if (!this.isReciverGroup())
          deleteFun = this.httpMessagesService.DeleteMessage(id);
        else deleteFun = this.httpMessagesService.DeleteGroupMessage(id);

        deleteFun.subscribe(
          (_data) => {
            MyTools.Dialog.open(MessageDialogComponent, {
              data: {
                title: 'Success',
                content: 'Message Deleted Successfully',
              },
            });
          },
          (err) => {
            MyTools.Dialog.open(MessageDialogComponent, {
              data: {
                title: 'Faild',
                content: `${err.error}`,
                icon: 'faild',
              },
            });
          }
        );
      }
    });
  }

  FilterContacts(input:HTMLInputElement,clearIcon:MatIcon,serachIcon:MatIcon){
    let value=input.value.toLowerCase();
    // show clear icon if not empty value
    if(!value)
       {
        clearIcon._elementRef.nativeElement.classList.add("hidden")
        serachIcon._elementRef.nativeElement.classList.remove("hidden")
       }
    else
     {
      clearIcon._elementRef.nativeElement.classList.remove("hidden")
      serachIcon._elementRef.nativeElement.classList.add("hidden")
     }
    //  filter user by value
    let _filteredFreinds:User[]=[];
    this.freinds.forEach(f=>{
    const nameContact=f.firstName+" "+f.lastName;
      if(f.email?.toLowerCase().includes(value)||
         nameContact.toLowerCase().includes(value) )
      {
        _filteredFreinds.push(f)
      }
    })
    this.filteredFreinds=_filteredFreinds

    //  filter user by value
    let _filteredGroups:Group[]=[];
    this.groups.forEach(f=>{
      if(f.course?.name?.toLowerCase().includes(value)||
         f.name?.toLowerCase().includes(value) )
      {
        _filteredGroups.push(f)
      }
    })
    this.filteredGroups=_filteredGroups
  }

  ClearSearchContact(input:HTMLInputElement,clearIcon:MatIcon,serachIcon:MatIcon){
      input.value=""
      // show search icon and hide clear icon
      clearIcon._elementRef.nativeElement.classList.add("hidden")
      serachIcon._elementRef.nativeElement.classList.remove("hidden")

     this.filteredFreinds=this.freinds
     this.filteredGroups=this.groups
  }

  ShowImogy($event:any,textarea:HTMLTextAreaElement){
    // $event is from (emojiClick)
    const Imogy=$event.emoji.native
    textarea.value+=$event.emoji.native
    this.fg.controls['message'].setValue(textarea.value)
  }

  ShowEmogiTable(_emojiTable:PickerComponent){
   if(this.hideEmojiTable)
    this.hideEmojiTable=false
    else this.hideEmojiTable=true
  }

  GetImageProfile(contact:User|Group){
    let image;
    if("roleId" in contact)
       image="../../../assets/images/profile.svg"
       else
       {

        image="../../../assets/images/group.png"
       }
    if(contact.imageProfile)
        return MyTools.domainNameServer+contact.imageProfile
    else
        return image
  }

  ShowPopUPImage(receiver:any){
    MyTools.ShowPopUpImageDialog(this.GetImageProfile(receiver));
  }

  CountUnreadMessages(object:any){
    let msgs
    if(object && 'courseId' in object)
     msgs=MyTools.unreadMsgs.filter(f=>f.reciverId==object.id)
       else
     msgs=MyTools.unreadMsgs.filter(f=>f.senderId==object.id
       && !f.isGroup)
       
    return msgs.length
  }

  ReadMessages(listMsgs:Element){
    listMsgs?.querySelectorAll(".unread-message")
    .forEach(m=>{
     const idMsg=parseInt(m.getAttribute("id")!);
     if(m.getBoundingClientRect().y<=720)
       {
          m.classList.remove("unread-message")
          if(this.isReciverGroup())
          this.httpMessagesService.ReadGroupMessage(idMsg,this.httpAuth.currentUser.id)
          .subscribe(_d=>{
          })
          else
          this.httpMessagesService.ReadMessage(idMsg).subscribe(_d=>{
          })
       }
   })
  }

  HandelScrollingMessages(){
    let listMsgs=document.querySelector(".listMessages")
    this.ReadMessages(listMsgs!)

    listMsgs!.addEventListener("scroll",()=>{
      //how much scrolling
    const scrollTop=listMsgs!.scrollTop;
      //if scrollTop=0 its mean get previous messages
      if(scrollTop==0)
      this.GetPreviousMessages();

      this.ReadMessages(listMsgs!)
    })
  }
}
