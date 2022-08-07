import { HttpGroupsService } from './../../../services/http Groups/http-groups.service';
import { Group } from './../../../models/Group';
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
  groups:Group[]=[]
  constructor(
    private route:ActivatedRoute,
    private httpUsersService:HttpUsersService,
    private httpGroupsService:HttpGroupsService,
    ) { }
  user=new User();
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get("id")
  this.httpUsersService.GetUsersById(id!).subscribe(user=>{
  this.user=user;
})
  this.httpGroupsService.GetGroupsByUserId(Number(id)).subscribe(data=>{
    this.groups=data
  })
  }

}
