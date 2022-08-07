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

        //   if(!this.CanAccess(state))
        //  {
        //  this.router.navigate(['/home']);
        //   return false
        //  }

        return true;
       }
       this.router.navigate(['/login']);
       return false;
  }

  CanAccess(state:any){
    let pageName=state.url.substring(1)
    let item=Menu.Items.find(f=>f.href==pageName)
    debugger
    if(!item)
    return true
    let res=item?.roles.includes(this.authService.currentUser.roleId!)
    return res
  }

}


