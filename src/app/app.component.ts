import { Route, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MyTools } from './constants/MyTools';
import { HttpUsersService } from './services/httpUsers/http-users.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
     dialog:MatDialog,
    auth:AuthService,
      router:Router
    ){
    MyTools.Dialog=dialog
    MyTools.router=router
    auth.LoadUserByToken();
  }
}
