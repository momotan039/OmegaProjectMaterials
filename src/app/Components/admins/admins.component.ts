import { MyLocalStorage } from './../../services/MyLocalStorage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {


  constructor(
    private http:HttpClient
  ) { }

  ngOnInit(): void {
  }


}
