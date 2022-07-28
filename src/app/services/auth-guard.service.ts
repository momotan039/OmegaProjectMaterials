import { MessageDialogComponent } from './../dilogs/message-dialog/message-dialog.component';
import { MessagesComponent } from './../Components/messages/messages.component';
import { MyTools } from 'src/app/constants/MyTools';
import { MyLocalStorage } from './MyLocalStorage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private router:Router,
    private authService:AuthService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){


    if(this.authService.IsLogIn())
       {
         if(MyLocalStorage.IsExpiredToken()){
           MyTools.Dialog.open(MessageDialogComponent,{
             data:{
               "title":"Session Expired",
               "content":"Please Sign in Again",
               "icon":"alarm"
             }
           })
           this.router.navigate(['/login']);
           return false
         }
        return true;
       }
       this.router.navigate(['/login']);
       return false;
  }
}


