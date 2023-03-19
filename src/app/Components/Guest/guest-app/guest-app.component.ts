import { AuthService } from './../../../services/auth.service';
import { MyLocalStorage } from './../../../services/MyLocalStorage';
import { MyTools } from 'src/app/constants/MyTools';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-guest-app',
  templateUrl: './guest-app.component.html',
  styleUrls: ['./guest-app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class GuestAppComponent implements OnInit {

  constructor(
   private AuthService:AuthService
  ) { }

  ngOnInit(): void {
    this.LogOutIfUserHaveBeenLogedIn()
    
    setTimeout(() => {

      window.onscroll = (ev) => {
        let scrolled = window.scrollY
        let elms = document.querySelectorAll(".show-me");
        elms.forEach((elm: any) => {
          if (scrolled >= elm.offsetTop - 900) {
            elm.classList.remove('show-me')
            elm.classList.add('show-up-1');
          }
        })
      }
    }, 300);
  }


  LogOutIfUserHaveBeenLogedIn(){
    // this.AuthService.LogOut()
  }
}
