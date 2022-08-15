import { HttpUserGroupService } from './../../../services/http-user-group.service';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { HttpGroupsService } from './../../../services/http Groups/http-groups.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role';
import { AddUserToGroupComponent } from '../../dilogs/add-user-to-group/add-user-to-group.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.css'],
})
export class GroupsDetailsComponent implements OnInit {
  group = new Group();
   id="-1";
  countStudents = 0;
  countTeacher = 0;
  dataSource: any;
  displayedColumns: any;
  @ViewChild('refpag') paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private route: ActivatedRoute,
     private http: HttpGroupsService,
     private httpUserGroup: HttpUserGroupService
     ) {}
  ngOnInit() {
     this.id= this.route.snapshot.paramMap.get('id')!;
    this.displayedColumns = [
      'role',
      'firstName',
      'lastName',
      'email',
      'phone',
      'idCard',
      'operations',
    ];
    this.FillTableData();
  }
  FilterDataTable(input: any) {
    let val = input.value + '';
    this.dataSource.filter = val;
  }

  getUsersFromGroup(){
    let users: User[]=[];
    this.group.userGroups.forEach(ug=>{
      users.push(ug.user)
    })
    return users
  }

  FillTableData() {
    this.http.GetGroupByID(this.id).subscribe((g) => {
      this.group = g;
      this.dataSource = new MatTableDataSource<User>(this.getUsersFromGroup());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (item:User, property:Role) => {
        switch(property) {
          case 'role.description': return item.role?.description;
          default: return item.role?.description;
        }
      };
      this.dataSource.sort = this.sort;

      this.countStudents = this.group.userGroups.filter(
        (ug) => ug.user.role?.numberRole == 3
      ).length;
      this.countTeacher = this.group.userGroups.filter(
        (ug) => ug.user.role?.numberRole == 2
      ).length;
    });

  }

  AddUser(){
    MyTools.Dialog.open(AddUserToGroupComponent,{
      data:this.group
    }).afterClosed().subscribe((success)=>{
      if(!success)
      return
      this.FillTableData()
    })
  }

  DeleteUser(id:number){
    this.httpUserGroup.DeleteUserFromGroup(this.group.userGroups.find(f=>f.userId==id)?.id!).subscribe(data=>{
      MyTools.Dialog.open(MessageDialogComponent,{
        data:{
          "title":"Success",
          "content":data,
        }
      }).afterClosed().subscribe(()=>{
          this.FillTableData()
      })
    })
  }

}
