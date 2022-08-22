import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MyTools } from 'src/app/constants/MyTools';
import { UserAuth } from 'src/app/models/UserAuth';
import { HttpAcountService } from 'src/app/services/http-acount.service';
import { ForgetPasswordDialogComponent } from '../forget-password-dialog/forget-password-dialog.component';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})


export class ResetPasswordDialogComponent implements OnInit {
  fg=new FormGroup({})

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private httpAcountService:HttpAcountService,
  ) { }

  ngOnInit(): void {
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

  Reset(){
     if(this.fg.valid)
     {
      let model=new UserAuth();
      model.email=this.fg.get("email")?.value
      model.password=this.fg.get('password')?.value
      this.httpAcountService.ResetPassword(model).subscribe(data=>{
        // this.matDialog.close()
        MyTools.ShowResult200Message(data)
      },(error)=>{
        MyTools.ShowFialdMessage(error,"Reset Password")
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
