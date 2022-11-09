import { HttpClient } from '@angular/common/http';
import { Menu } from '../../constants/Menu';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MyTools } from '../../constants/MyTools';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
  menuItems:Menu[]=[]
  currentUser: User | undefined;
  constructor(
    public authService:AuthService,
    public http:HttpClient,
  ) {

  }
  ngOnInit(): void {
     this.authService.currentUserSub!.asObservable().subscribe(user=>{
      const _user=user
      MyTools.NumUnreadMsgs.subscribe(num=>{
       this.CreateMenuItems(_user,num);
      })
    })
  }

  CreateMenuItems(user:any,unreadMsgs:number){
    
    this.menuItems=Menu.getItemsByUserRole(user.roleId)

    this.menuItems.forEach(f=>{
      if(f.icon=='mail'||f.icon=='mark_email_unread')
      {
        if(unreadMsgs)
        {
         f.value=unreadMsgs
        f.icon='mark_email_unread'
        }
        else{
          f.value=unreadMsgs
          f.icon='mail'
        }

      }
    })
    
  }

}
