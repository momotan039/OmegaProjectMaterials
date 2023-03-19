import { SelectWithSearchComponent } from './../../select-with-search/select-with-search.component';
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

  @ViewChild('refSelectMembers', { static: true }) mutiSelectMembers: SelectWithSearchComponent | undefined;
  constructor(
    private http:HttpUsersService,
    private httpUserGroup:HttpUserGroupService,
    private dialogRef:MatDialogRef<GroupsDetailsComponent>,

    @Inject(MAT_DIALOG_DATA) public group:Group
    ) { }
    users:User[]=[]
    _users:User[]=[]
  ngOnInit(): void {
  }
  FilterUsers() {

  }
  AddMember(users:User[]){

    let techersNum=users.filter(f=>f.roleId==2).length
    let studnetsNum=users.filter(f=>f.roleId==3).length
   if(!users || users.length==0)
   {
    this.mutiSelectMembers?.myControl.setValue("")
    return
   }
   let temp:UserGroup[]=[];
   users.forEach(u => {
    temp.push(new UserGroup(u.id!,this.group.id!))
   });
   this.httpUserGroup.AddUsersToGroup(temp).subscribe((data) =>{
    MyTools.ShowResult200Message(data)
     this.dialogRef.close({
      'teachersNum':techersNum,
      'studentsNum':studnetsNum
    })
   },(err)=>{
    MyTools.ShowFialdMessage(err,"Adding User to Group")
    });

  }

  GetMembers=()=>{
    return this.http.GetUsersNotInThisGroup(this.group.id!)
   }

}

