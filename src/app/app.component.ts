import { User } from './models/User';
import { HttpMessagesService } from './services/HttpMessages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyLocalStorage } from './services/MyLocalStorage';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MyTools } from './constants/MyTools';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../app/Components/Guest/main-style-guest.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // faCoffee = faCoffee;

  constructor(
    private dialog:MatDialog,
    public auth:AuthService,
    private router:Router,
    private snackBar:MatSnackBar,
    private httpMessagesService:HttpMessagesService
    ){
    MyTools.router=router
    auth.LoadUserByToken();
      //Inintialize Dialog object &
      // handel function after opened Dialogs
      MyTools.Dialog=dialog
      MyTools.SnackBar=snackBar
      auth.currentUserSub.subscribe(u=>{
        if(u)
         MyTools.intervalMsgs=interval(1000).subscribe(()=>{
        this.httpMessagesService.GetAllUnreadMessages().subscribe(msgs=>{
          MyTools.unreadMsgs=msgs
          MyTools.msgsReader.next(msgs)
          MyTools.NumUnreadMsgs.next(msgs.length)
        })
      })
      })

      
  }
  ngOnInit(): void {
    
  }

}
