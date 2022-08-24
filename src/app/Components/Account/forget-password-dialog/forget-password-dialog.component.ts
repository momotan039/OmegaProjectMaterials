import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogInComponent } from './../../log-in/log-in.component';
import { Router } from '@angular/router';
import { HttpAcountService } from './../../../services/http-acount.service';
import { MyTools } from 'src/app/constants/MyTools';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth } from 'src/app/models/UserAuth';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.css']
})
export class ForgetPasswordDialogComponent implements OnInit {
  fg=new FormGroup({})

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private httpAcountService:HttpAcountService,
    private matDialog:MatDialogRef<ForgetPasswordDialogComponent>
  ) { }

  ngOnInit(): void {
    this.fg=this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.compose([
        Validators.required,
        Validators.pattern(MyTools.passwordValidationRegex)
      ])],
      confPassword:['',Validators.compose([Validators.required])],
    })

  }
  ForgetPassword(){
    this.httpAcountService.ResetPassword
  }

}
