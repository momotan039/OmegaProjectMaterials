import { HttpCoursesService } from '../../../services/http-courses.service';
import { Course } from '../../../models/Course';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/Group';
import { UserGroup } from 'src/app/models/UsersGroups';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { EditGroupComponent } from '../../dilogs/edit-group/edit-group.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { AddGroupComponent } from '../../dilogs/add-group/add-group.component';
import { Router } from '@angular/router';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  dataSource:any;
  displayedColumns:any;
  displayedNameColumns:any;
  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;
  constructor(
    public groupService:HttpGroupsService,
    private courseService:HttpCoursesService,
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.displayedColumns=["name","course.name","openingDate","closingDate"]
    this.displayedNameColumns=["Name","Course","Opening Date","Closing Date","Operations"]
  }


  EditRow=()=>{
    MyTools.Dialog.open(EditGroupComponent,{
      data:this.myTable?.selectedRow,
      disableClose:true
    }).
    afterClosed().subscribe(success=>{
      if(success)
        this.myTable!.FillTableData();
    })
  }
  DeleteRow=()=>{
    MyTools.Dialog.open(DeleteUserComponent, {
      disableClose:true
    }).afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.groupService.DeleteGroups(this.myTable?.selectedRow.id).subscribe(d=>{
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
      }
    })
  }
  AddRow=()=>{
    MyTools.Dialog.open(AddGroupComponent,{
      disableClose:true
     })
    .afterClosed().subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }
}
