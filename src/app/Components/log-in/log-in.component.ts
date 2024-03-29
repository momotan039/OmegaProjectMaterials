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
  showSpinner=false
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
      email:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required]
    })
  }
  LogIn(){
    // this.auth.Login()
    if(!this.fg.valid)
    return
    this.user.email=this.fg.get("email")?.value.trim()
    this.user.password=this.fg.get("password")?.value
    this.showSpinner=true

      setTimeout(() => {
        this.auth.Login(this.user).subscribe(token=>{
          MyLocalStorage.SetToken(token)
          this.auth.LoadUserByToken()
          this.router.navigate(["/home"]);
          this.showSpinner=false
        },err=>{
          MyTools.ShowFialdMessage(err,"LogIn")
          this.showSpinner=false
        })
      }, 300);
  }

  ForgetPassWord(){
    MyTools.Dialog.open(ForgetPasswordDialogComponent,{
      width:"540px"
    })
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
