import { interval, Observable, Subscription } from 'rxjs';
import { HttpUsersService } from './../../services/httpUsers/http-users.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  obs:Subscription | undefined
  constructor(
    public auth:AuthService,
    public http:HttpUsersService
  ) { }


  ngOnInit(): void {

  }


}
