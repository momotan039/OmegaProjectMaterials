import { LogInComponent } from './../../log-in/log-in.component';
import { HomeComponent } from './../../home/home.component';
import { MyLocalStorage } from './../../../services/MyLocalStorage';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MyTools } from 'src/app/constants/MyTools';
import { UserAuth } from 'src/app/models/UserAuth';
import { HttpAcountService } from 'src/app/services/http-acount.service';
import { ForgetPasswordDialogComponent } from '../forget-password-dialog/forget-password-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})


export class ResetPasswordDialogComponent implements OnInit {
  fg=new FormGroup({})
  showprogressBar=false
  token=""
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private httpAcountService:HttpAcountService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //cheack token of password reset Request
    this.token=this.activatedRoute.snapshot.paramMap.get('token')!
    
    if(MyLocalStorage.IsExpiredToken(this.token))
        this.router.navigate([HomeComponent])

    this.fg=this.fb.group({
      password:['',Validators.compose([
        Validators.required,
        Validators.pattern(MyTools.passwordValidationRegex)
      ])],
      confPassword:['',Validators.compose([Validators.required,this.MatchPasswordValidator])],
    })

  }
   MatchPasswordValidator(control: AbstractControl) {

    if (control.value!=control.parent?.value.password) {
      return { 'MatchPassword': false };
    }
    return null;
}

  Reset(refButton:MatButton){
     if(this.fg.valid)
     {
      this.showprogressBar=true
      refButton.disabled=true
      let model=new UserAuth();
      model.password=this.fg.get('password')?.value
      
      this.httpAcountService.ResetPassword(model,this.token).subscribe(data=>{
        debugger
        this.router.navigate([LogInComponent])
        MyTools.ShowResult200Message(data)
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Reset Password")
        refButton.disabled=false
        this.showprogressBar=false
      })
     }
  }


  IsValidMail(email:string){
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email))
      return false

      return true
  }
  ShowPass(input:HTMLInputElement){
    let type=input.type
    if(type=="text")
      type="password"
      else
      type="text"
    input.type=type
  }
}
