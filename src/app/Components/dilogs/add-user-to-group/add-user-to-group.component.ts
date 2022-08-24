import { UserGroup } from 'src/app/models/UsersGroups';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Group } from 'src/app/models/Group';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { HttpUsersService } from 'src/app/services/http-users.service';
import { HttpUserGroupService } from 'src/app/services/http-user-group.service';
import { GroupsDetailsComponent } from '../../Details/groups-details/groups-details.component';
import { User } from 'src/app/models/User';
import { MyTools } from 'src/app/constants/MyTools';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.css']
})
export class AddUserToGroupComponent implements OnInit {

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect | undefined;
  constructor(
    private http:HttpUsersService,
    private httpUserGroup:HttpUserGroupService,
    private dialogRef:MatDialogRef<GroupsDetailsComponent>,

    @Inject(MAT_DIALOG_DATA) public group:Group
    ) { }
    users:User[]=[]
    _users:User[]=[]
  ngOnInit(): void {

    this.http.GetUsersNotInThisGroup(this.group.id!).subscribe(users=>{
      this.users=users
      this._users=users
      // this.websiteFilterCtrl.valueChanges
      // .subscribe((value:string) => {
      //   this._users=users
      //   this._users=this._users.filter(f=>f.firstName?.includes(value))
      // });

    })

  }
  FilterUsers() {

  }
  AddMember(elms:number[]){
   if(!elms)
   return
   let temp:UserGroup[]=[];
   elms.forEach(id => {
    temp.push(new UserGroup(id,this.group.id!))
   });
   this.httpUserGroup.AddUsersToGroup(temp).subscribe((data) =>{
    MyTools.ShowResult200Message(data)
     this.dialogRef.close(true)
   },(err)=>{
    MyTools.ShowFialdMessage(err,"Adding User to Group")
    });

  }
}

