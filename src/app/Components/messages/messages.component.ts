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
  AfterViewInit,
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
export class MessagesComponent implements OnInit, OnDestroy,AfterViewInit {
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
  @ViewChild('refListMessages')ListMessagesContainer:any
  ShowSpinner=false;
  lastConversation: Subscription | undefined;
  msgInterval: Subscription | undefined;
  found_previous=false;
  previousMsgs=[];
  showSpinnerContacts=false
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
  ngAfterViewInit(): void {
    // Configuration Scrolling Events After Loading Messages
    let msgConainer=this.ListMessagesContainer['nativeElement'] as HTMLElement;
    msgConainer.addEventListener("scroll",()=>{
     //how much scrolling
   const scrollTop=msgConainer.scrollTop;
   console.warn(scrollTop)
      //Read Messages While Scrolling
   this.ReadMessages()
     //if scrollTop=0 its mean get previous messages
     if(scrollTop==0)
      this.GetPreviousMessages();
      
     const scrollingDownUnreadMsgsBtn= msgConainer.querySelector(".scroll-down-to-unread-messages") as HTMLElement
     if(scrollingDownUnreadMsgsBtn)
     scrollingDownUnreadMsgsBtn.style.top=scrollTop+"px"
   })
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
    let searchContactInput=document.querySelector(".search-contact") as HTMLInputElement
    this.httpGroupsService.GetGroupsByUserId().subscribe((data) => {
      this.groups = data;
      this.filteredGroups=this.groups
      console.warn(this.groups)
        //filter contact Groups when recive new messages
        MyTools.msgsReader?.subscribe(data=>{
          if(!searchContactInput.value)
          this.filteredGroups=this.groups.sort((a,b)=>{
             return MyTools.unreadMsgs.filter(f=>f.reciverId==b.id).length
             -MyTools.unreadMsgs.filter(f=>f.reciverId==a.id).length
         })
        })
    });
    this.showSpinnerContacts=true
    this.httpUserGroupService.GetFreindsByUser().subscribe((data) => {
      this.freinds = data;
      //filter contact friends when recive new messages
      MyTools.msgsReader?.subscribe(data=>{
        if(!searchContactInput.value)
      this.filteredFreinds=this.freinds.sort((a,b)=>{
         return MyTools.unreadMsgs.filter(f=>f.senderId==b.id).length
         -MyTools.unreadMsgs.filter(f=>f.senderId==a.id).length
     })
    })
    this.showSpinnerContacts=false
    });

  }
  isReciverGroup() {
    if(!this.receiver)
    return false

    return 'courseId' in this.receiver;
  }
  ScrollingDownListMessageButton() {
    //scroll down to bottom list Message
      setTimeout(() => {
        
        const listMsgs=document.querySelector('.listMessages');
        let top=listMsgs?.scrollHeight

        if(this.CountUnreadMessages(this.receiver))
          {
            const offsetTopMessage=(document.querySelector('.unread-message') as HTMLElement).offsetTop
            const offsetHeightParent=(listMsgs as HTMLElement).offsetHeight
            top=offsetTopMessage-offsetHeightParent+50
          }
        

        listMsgs?.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }, 300);
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
             this.ReadMessages()
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

    let listMsgs=document.querySelector(".listMessages") as HTMLElement
    const offsetTop=listMsgs.offsetTop
    this.ShowSpinner=true
    listMsgs.style.overflowY="hidden"
    setTimeout(() => {
      getPreviousMessagesFun.subscribe(event=>{
        if (event.type==HttpEventType.Response)
        {
         this.previousMsgs=event.body['messages'].concat(this.previousMsgs)
         this.found_previous=event.body['found_previous']
         this.ReadMessages()
          setTimeout(() => {
            this.ShowSpinner=false
            listMsgs.style.overflowY="auto"
          }, 900);
          setTimeout(() => {
            
            listMsgs.scrollTo(0,offsetTop+150)
          }, 1000);
        }
      })
    }, 1000);

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
                 const unreadMessages=MyTools.unreadMsgs.filter(f=>f.isGroup && f.senderId==this.receiver.id)
                 this.msgs = unreadMessages.concat(event.body['messages']);
                 this.found_previous=event.body['found_previous']
                 this.ScrollingDownListMessageButton();
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
            this.ScrollingDownListMessageButton()
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
            MyTools.ShowResult200Message("Message Deleted Successfully")
          },
          (err) => {
            MyTools.ShowFialdMessage(err,"Deleting Message")
          }
        );
      }
    });
  }

  FilterContacts(input:HTMLInputElement,clearIcon:MatIcon,serachIcon:MatIcon){
    this.showSpinnerContacts=true

    setTimeout(() => {
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
    this.showSpinnerContacts=false
    }, 300);

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
    (document.querySelector(".faceIcon") as HTMLElement).classList.toggle("faceIconUp")
   if(this.hideEmojiTable)
    this.hideEmojiTable=false
    else this.hideEmojiTable=true
  }

  GetImageProfile(contact:User|Group){
    let image;
    if("roleId" in contact)
       image="../../../assets/images/profile.svg"
    else
        image="../../../assets/images/group.png"

    if(contact.imageProfile)
        return MyTools.domainNameServer+contact.imageProfile


    else
        return image
  }

  ShowPopUPImage(receiver:any){
    // var xhr = new XMLHttpRequest();
    // xhr.open('HEAD', this.GetImageProfile(receiver), false);
    // xhr.send();

    // if (xhr.status == 404)
    //     alert("not found Image")

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

  ReadMessages(){
    let listMsgs=document.querySelector(".listMessages") as HTMLElement
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


  ShowDefultImage(image:HTMLImageElement,isgroup=true,byReciver=false){

    if(byReciver){
        image.src=this.isReciverGroup()?"../../../assets/images/group.png":"../../../assets/images/profile.svg"
        return
    }

    if(isgroup)
    image.src="../../../assets/images/group.png"
    else
    image.src="../../../assets/images/profile.svg"
  }
}
