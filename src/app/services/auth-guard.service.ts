import { MyLocalStorage } from './MyLocalStorage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
         console.warn(MyLocalStorage.GetToken())
        // this.router.navigate(['/home']);
        return true;
       }
       this.router.navigate(['/login']);
       return false;
  }
}
