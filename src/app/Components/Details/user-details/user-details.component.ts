import { HttpUsersService } from './../../../services/httpUsers/http-users.service';
import { User } from './../../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private httpUsersService:HttpUsersService
    ) { }
  user=new User();
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get("id")
  this.httpUsersService.GetUsersById(id!).subscribe(user=>{
  this.user=user;
})
  }

}
