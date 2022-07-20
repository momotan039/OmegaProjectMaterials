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

  constructor(private dialog:MatDialog){
    MyTools.Dialog=dialog
  }
}
