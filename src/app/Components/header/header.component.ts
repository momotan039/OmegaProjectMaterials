import { HttpClient } from '@angular/common/http';
import { Menu } from '../../constants/Menu';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MyTools } from '../../constants/MyTools';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
      this.menuItems=Menu.getItemsByUserRole(user.roleId)
    })
  }

}
