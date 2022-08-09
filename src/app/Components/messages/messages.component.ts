import { MessageGroup } from './../../models/MessageGroup';
import { Router } from '@angular/router';
import { HttpMessagesService } from './../../services/HttpMessages.service';
import { HttpUserGroupService } from './../../services/http-user-group.service';
import { User } from 'src/app/models/User';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { Group } from 'src/app/models/Group';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/Message';
import { interval, Subscription, Observable } from 'rxjs';
import { MessageDialogComponent } from '../dilogs/message-dialog/message-dialog.component';
import { DeleteUserComponent } from '../dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  fg = new FormGroup({});
  title = '';
  subTitle = '';
  image=""
  // receiverUser=new User()
  // receiverGroup=new Group()
  receiver: any;
  groups: Group[] = [];
  freinds: User[] = [];
  msgs: any = [];
  msgObs?: Subscription;
  constructor(
    private fb: FormBuilder,
    private httpGroupsService: HttpGroupsService,
    private httpUserGroupService: HttpUserGroupService,
    public httpAuth: AuthService,
    private httpMessagesService: HttpMessagesService,
    private router: Router
  ) {
    //remove scroller body
    document.body.classList.add('removeScroller');
  }

  ngOnDestroy(): void {
    this.msgObs?.unsubscribe();
    //remove scroller body
    document.body.classList.remove('removeScroller');
  }

  ngOnInit(): void {
    this.fg = this.fb.group({
      message: ['', Validators.required],
    });

    this.httpGroupsService.GetGroupsByUserId().subscribe((data) => {
      this.groups = data;
    });

    this.httpUserGroupService.GetFreindsByUser().subscribe((data) => {
      this.freinds = data;
    });
  }
  isReciverGroup() {
    return 'courseId' in this.receiver;
  }
  ScrollingDownListMessage() {
    //scroll down to bottom list Message
    setTimeout(() => {
      document.querySelector('.listMessages')?.scrollTo({
        top: document.querySelector('.listMessages')?.scrollHeight,
        behavior: 'smooth',
      });
    }, 300);
  }
  ChangeTitle_SubTitle_Image() {
    if ('courseId' in this.receiver) {
      this.title = this.receiver.name;
      this.subTitle = this.receiver.course.name;
      this.image="./../../assets/images/group.png"
    } else {
      this.title = this.receiver.firstName + ' ' + this.receiver.lastName;
      this.subTitle = this.receiver.email;
      this.image="./../../assets/images/profile.svg"
    }
  }
  ShowConversation() {
    this.msgObs?.unsubscribe();
    let getMessagesFun: Observable<Object>;
    if (this.isReciverGroup())
      getMessagesFun = this.httpMessagesService.GetGroupMessagesByReciver(
        this.receiver.id
      );
    else
      getMessagesFun = this.httpMessagesService.GetMessagesByReciver(
        this.receiver.id
      );
    getMessagesFun.subscribe((data:any) => {
        this.msgs = data;
        this.ScrollingDownListMessage();
      });

    this.msgObs = interval(1000).subscribe(() => {
      getMessagesFun.subscribe((data) => {
          this.msgs = data;
        });
    });
  }

  SetResiver(obj: any) {
    this.receiver = obj;
    this.ChangeTitle_SubTitle_Image();
    this.ShowConversation();
  }

  GetCustomDate(date: Date) {
    const now = new Date(date);
    const current = now.getHours() + ':' + now.getMinutes();
    const strDate = now.toLocaleDateString();
    if (new Date().toLocaleDateString() != strDate)
      return current + '~' + strDate;
    return current;
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
      SendMessageFun=this.httpMessagesService.SendGroupMessage(msg)
    } else {
      let msg = new Message(
        this.receiver.id,
        this.httpAuth.currentUser.id!,
        this.fg.value.message
      );
      SendMessageFun=this.httpMessagesService.SendMessageToFreind(msg)
    }

    SendMessageFun.subscribe({
      complete: () => {
        this.ShowConversation();
      },
      error: () => {
        MyTools.Dialog.open(MessageDialogComponent, {
          data: {
            title: 'Session Expired',
            content: 'Failed Sending..Please Sign in Again',
            icon: 'alarm',
          },
        });
        this.router.navigate(['/login']);
      },
    });

    //Clear current value
    inputMessage.value = '';
    this.fg = this.fb.group({
      message: ['', Validators.required],
    });
  }

  DeleteMesssage(id: number) {
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: any) => {
      if (success) {
        let deleteFun;

        debugger;
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
}
