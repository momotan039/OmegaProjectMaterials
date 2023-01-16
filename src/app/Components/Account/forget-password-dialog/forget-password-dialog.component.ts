import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogInComponent } from './../../log-in/log-in.component';
import { Router } from '@angular/router';
import { HttpAcountService } from './../../../services/http-acount.service';
import { MyTools } from 'src/app/constants/MyTools';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth } from 'src/app/models/UserAuth';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password-dialog',
  templateUrl: './forget-password-dialog.component.html',
  styleUrls: ['./forget-password-dialog.component.css']
})
export class ForgetPasswordDialogComponent implements OnInit {



  fg=new FormGroup({})
  showprogressBar=false
  lastRequest?:Subscription 
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private httpAcountService:HttpAcountService,
    private matDialog:MatDialogRef<ForgetPasswordDialogComponent>
  ) { }

  ngOnInit(): void {
    this.fg=this.fb.group({
      email:['',Validators.compose([Validators.required,Validators.email])],
    })
  }


  ForgetPassword(refButton:MatButton){
    if(!this.fg.valid)
    return
    this.showprogressBar=true
    refButton.disabled=true

     this.lastRequest=this.httpAcountService.ForgetPassword(this.fg.get('email')?.value).subscribe((data)=>{
      this.matDialog.close()
      MyTools.ShowResult200Message(data)
    },(err)=>{
      MyTools.ShowFialdMessage(err,"Reset Password")
      refButton.disabled=false
      this.showprogressBar=false
    })

  }


  cancelRequest(){
    this.lastRequest?.unsubscribe()
  }
}
