import { ForgetPasswordDialogComponent } from './../Account/forget-password-dialog/forget-password-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MyTools } from './../../constants/MyTools';
import { MyLocalStorage } from './../../services/MyLocalStorage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuth } from './../../models/UserAuth';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageDialogComponent } from '../dilogs/message-dialog/message-dialog.component';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user=new UserAuth()
  fg=new FormGroup({})
  constructor(
    private auth:AuthService,
    private fb:FormBuilder,
    private router:Router,
    ) { }

  ngOnInit(): void {
    if(!MyLocalStorage.IsExpiredToken())
    {
      this.router.navigate(['/home']);
      return
    }
this.fg=this.fb.group({
  email:['',Validators.required],
  password:['',Validators.required]
})
  }
  LogIn(){
    // this.auth.Login()
    if(!this.fg.valid)
    return
    this.user.email=this.fg.get("email")?.value
    this.user.password=this.fg.get("password")?.value

    this.auth.Login(this.user).subscribe(token=>{
      MyLocalStorage.SetToken(token)
      this.auth.LoadUserByToken()
      this.router.navigate(["/home"]);
    },err=>{
      MyTools.ShowFialdMessage(err,"LogIn")
    })
  }

  ForgetPassWord(){
    MyTools.Dialog.open(ForgetPasswordDialogComponent)
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
