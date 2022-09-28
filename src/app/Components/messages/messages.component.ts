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
import { interval, Subscription, Observable, filter, Subject } from 'rxjs';
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
    });

    this.httpUserGroupService.GetFreindsByUser().subscribe((data) => {
      this.freinds = data;
      this.filteredFreinds=this.freinds
    });

    this.HandelScrollingMessages();
  }
  isReciverGroup() {
    return 'courseId' in this.receiver;
  }
  ScrollingDownListMessage() {
    //scroll down to bottom list Message
    if(!this.CountUnreadMessages(this.receiver.id))
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
    if ('courseId' in this.receiver) {
      this.title = this.receiver.name;
      this.subTitle = this.receiver.course.name;
    } else {
      this.title = this.receiver.firstName + ' ' + this.receiver.lastName;
      this.subTitle = this.receiver.email;
    }
    this.imageContact = this.GetImageProfile(this.receiver);

  }

 
  GetStreamMessages(getMessagesFun:Observable<HttpEvent<Object>>,idContact:number){
          if(idContact!=this.receiver.id)
            return
          setTimeout(() => {
            this.msgObs=getMessagesFun.subscribe(event=>{
              if (event.type==HttpEventType.Response)
            {
             this.msgs=event.body
            //  this.GetStreamMessages(getMessagesFun,idContact)
            }
         })
          }, 2000);            
  }

  InitStreamMessages(getMessagesFun:Observable<HttpEvent<Object>>){
    return interval(1000).subscribe(()=>{
      getMessagesFun.subscribe(event=>{
        console.warn(event.type)
        if(event.type==HttpEventType.Sent)
          this.msgObs?.unsubscribe()
        else if(event.type==HttpEventType.Response)
          this.msgs=event.body
          this.msgObs=this.InitStreamMessages(getMessagesFun)
      })
    })
  }

  ShowConversation() {
   

    //get Messages By Contact
    let getMessagesFun:Observable<HttpEvent<Object>>;
    if (this.isReciverGroup())
      getMessagesFun = this.httpMessagesService.GetGroupMessagesByReciver(
        this.receiver.id
      );
    else
      getMessagesFun = this.httpMessagesService.GetMessagesByReciver(
        this.receiver.id
      );
      
      this.ShowSpinner=true;
      
      this.lastConversation=getMessagesFun.subscribe((event) => {
      if(event.type==HttpEventType.Response)
        {
           this.GetStreamMessages(getMessagesFun,this.receiver.id);
           this.msgs = event.body;
           this.ScrollingDownListMessage();
           this.ShowSpinner=false
        }
    });

  }

  SetResiver(obj: any) {

    if(this.receiver && obj.id==this.receiver.id)
    return

    this.msgObs?.unsubscribe();
    this.lastConversation?.unsubscribe();
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
        this.ScrollingDownListMessage()
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
          (data) => {
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

  ShowEmogiTable(emojiTable:PickerComponent){
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

  CountUnreadMessages(senderId:number|undefined){
    const msgs=MyTools.unreadMsgs.filter(f=>f.senderId==senderId)
    return msgs.length
  }

  HandelScrollingMessages(){
    let listMsgs=document.querySelector(".listMessages")

    listMsgs!.addEventListener("scroll",()=>{
      //how much scrolling
    const scrollTop=listMsgs!.scrollTop;
      // const m=listMsgs?.querySelectorAll(".unread-message")[0] as HTMLElement
      listMsgs?.querySelectorAll(".unread-message")
       .forEach(m=>{
        const idMsg=parseInt(m.getAttribute("id")!);
        console.warn(`
              y Msg=>${m.getBoundingClientRect().y}
              Height listMsgs=>${listMsgs?.getBoundingClientRect().height}
              offsetTop Msg=>${(m as HTMLElement).offsetTop}
              scrollTop=>${scrollTop}
            `)
        if(m.getBoundingClientRect().y<=listMsgs?.getBoundingClientRect().height!)
          {
             m.classList.remove("unread-message")
             console.warn("reach to msg :",idMsg)
            //  this.httpMessagesService.ReadMessage(idMsg).subscribe(d=>{
            //  })
          }
      })

    })
  }
}
