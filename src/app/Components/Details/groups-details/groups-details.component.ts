import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { DeleteUserComponent } from './../../dilogs/delete-user/delete-user.component';
import { HttpUsersService } from 'src/app/services/http-users.service';
import { HttpUserGroupService } from './../../../services/http-user-group.service';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role';
import { AddUserToGroupComponent } from '../../dilogs/add-user-to-group/add-user-to-group.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.css'],
})
export class GroupsDetailsComponent implements OnInit {
  group = new Group();
  dataSource: any;
  displayedColumns: any;
  displayedNameColumns: any;
  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;

  constructor(
    private route: ActivatedRoute,
     public httpUsersService: HttpUsersService,
     private httpUserGroupService: HttpUserGroupService,
     private HttpGroupsService: HttpGroupsService,
     ) {}
  ngOnInit() {
     this.group.id= Number(this.route.snapshot.paramMap.get('id')!);
    this.displayedColumns = [
      'role.description',
      'firstName',
      'lastName',
      'email',
      'phone',
      'idCard',
    ];
    this.displayedNameColumns = [
      'Role',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Id Card',
      'Operations',
    ];
    this.HttpGroupsService.GetGroupByID(this.group.id+"").subscribe(data=>{
      this.group=data
    })
  }
  DeleteRow=()=>{
    MyTools.Dialog.open(DeleteUserComponent, {
      disableClose:true
    }).afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.httpUserGroupService.
        DeleteUserFromGroup(this.myTable?.selectedRow.id).
        subscribe(d=>{
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
      }
    })
  }
  AddRow=()=>{
    MyTools.Dialog.open(AddUserToGroupComponent,{
      data:this.group,
      disableClose:true
     })
    .afterClosed().subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }


}
