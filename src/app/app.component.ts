import { MyLocalStorage } from './services/MyLocalStorage';
import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MyTools } from './constants/MyTools';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private router:Router
    ){
    MyTools.router=router
    auth.LoadUserByToken();
      //Inintialize Dialog object &
      // handel function after opened Dialogs
      MyTools.Dialog=dialog
  }

}
