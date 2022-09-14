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
  constructor(
    public auth:AuthService,
    public http:HttpUsersService
  ) {
  }

  ngOnInit(): void {
  }

  
}
