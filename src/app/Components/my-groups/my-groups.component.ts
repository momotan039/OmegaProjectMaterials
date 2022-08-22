import { AuthService } from './../../services/auth.service';
import { HttpGroupsService } from '../../services/http-groups.service';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.css']
})
export class MyGroupsComponent implements OnInit {
  groups:Group[]=[]
  constructor(
    private httpGroupsService:HttpGroupsService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.httpGroupsService.GetGroupsByUserId().subscribe(data=>{
      this.groups=data
    })
  }


}
