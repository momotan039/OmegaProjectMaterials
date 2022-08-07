import { MessageDialogComponent } from './../dilogs/message-dialog/message-dialog.component';
import { MyTools } from './../../constants/MyTools';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeWorkService } from './../../services/HomeWork.service';
import { HomeWork } from './../../models/HomeWork';
import { AuthService } from './../../services/auth.service';
import { HttpGroupsService } from './../../services/http Groups/http-groups.service';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-homeworks',
  templateUrl: './homeworks.component.html',
  styleUrls: ['./homeworks.component.css']
})
export class HomeworksComponent implements OnInit {

  constructor(
    public authService:AuthService,
  ) { }

  ngOnInit(): void {

  }




}
