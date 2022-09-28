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
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // faCoffee = faCoffee;

  constructor(
    private dialog:MatDialog,
    private auth:AuthService,
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
      interval(1000).subscribe(()=>{
        this.httpMessagesService.GetAllUnreadMessages().subscribe(msgs=>{
          MyTools.unreadMsgs=msgs
        })
      })
  }

}
