import { MyTools } from 'src/app/constants/MyTools';
import { Emoji } from './../../../../node_modules/@ctrl/ngx-emoji-mart/ngx-emoji/emoji.component.d';
import { User } from './../../models/User';
import { interval, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { HttpUsersService } from '../../services/http-users.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user=new User()
  emoji:any
  constructor(
    public auth:AuthService,
    public http:HttpUsersService
  ) {
  }

  ngOnInit(): void {
  }
}
