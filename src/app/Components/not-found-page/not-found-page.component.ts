import { MyTools } from 'src/app/constants/MyTools';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(
   public authService:AuthService
  ) { }
 
  ngOnInit(): void {
    this.authService.currentUserSub.subscribe(user=>{
      if(user)
      MyTools.router.navigate(['/home'])
    else
    MyTools.router.navigate(['/main'])
    })
    
  }

}
