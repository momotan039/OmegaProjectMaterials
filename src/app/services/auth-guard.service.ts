import { User } from './../models/User';
import { Menu } from './../constants/Menu';
import { MyTools } from 'src/app/constants/MyTools';
import { MyLocalStorage } from './MyLocalStorage';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageDialogComponent } from '../Components/dilogs/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
currentUser=new User()
  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.IsLogIn())
       {
        //cheak current token
         if(MyLocalStorage.IsExpiredToken()){
           MyTools.ShowExpiredSessionMessage()
           this.authService.LogOut();
           return false
         }
        return true;
       }
       this.router.navigate(['/login']);
       return false;
  }

  // CanAccess(state:any){
  //   let pageName=state.url.substring(1)
  //   let item=Menu.Items.find(f=>f.href==pageName)
  //   
  //   if(!item)
  //   return true
  //   let res=item?.roles.includes(this.authService.currentUser.roleId!)
  //   return res
  // }

}


