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
    private jwt:JwtHelperService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.warn(this.jwt.decodeToken(MyLocalStorage.GetToken()+""))
    console.log(this.jwt.tokenGetter)
    if(this.authService.IsLogIn())
       {
        // this.router.navigate(['/home']);
        return true;
       }
       this.router.navigate(['/login']);
       return false;
  }
}
