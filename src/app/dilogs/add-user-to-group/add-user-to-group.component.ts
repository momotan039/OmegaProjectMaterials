import { MessageDialogComponent } from './../message-dialog/message-dialog.component';
import { MyTools } from './../../constants/MyTools';
import { UserGroup } from 'src/app/models/UsersGroups';
import { GroupsDetailsComponent } from './../../Components/Details/groups-details/groups-details.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpUsersService } from './../../services/httpUsers/http-users.service';
import { HttpUserGroupService } from './../../services/http-user-group.service';
import { User } from './../../models/User';
import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Group } from 'src/app/models/Group';


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
   this.httpUserGroup.AddUsersToGroup(temp).subscribe(res =>{
     MyTools.Dialog.open(MessageDialogComponent,{
       data:{
         "title":"Success",
         "content":"Added Members Successfully"
       }
     })
     this.dialogRef.close(true)
   });

  }
}

