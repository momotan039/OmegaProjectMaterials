import { HttpCoursesService } from '../../../services/Http Courses/http-courses.service';
import { Course } from '../../../models/Course';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/Group';
import { UserGroup } from 'src/app/models/UsersGroups';
import { HttpGroupsService } from 'src/app/services/http Groups/http-groups.service';
import { EditGroupComponent } from '../../dilogs/edit-group/edit-group.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { AddGroupComponent } from '../../dilogs/add-group/add-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  dataSource:any;
  displayedColumns:any;
  @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private groupService:HttpGroupsService,
    private courseService:HttpCoursesService
    ) { }

  ngOnInit(): void {
    this.displayedColumns=["name","course","openingDate","closingDate","operations"]
    this.FillTableData()

  }

  CustomDate(data:Date){
    return MyTools.CustomDate(data)
  }
  FillTableData(){
    this.groupService.GetGroups().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
     this.dataSource.sort=this.sort
    })
  }

  FilterDataTable(input:any){
    let val=input.value+"";
    this.dataSource.filter=val
}
  EditGroup(group:Group){
    let dialogRef=MyTools.Dialog.open(EditGroupComponent,{
      data:group,
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
      if(success==false)
      return
        this.FillTableData();
    })
  }
  DeleteGroup(id:any){
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.groupService.DeleteGroups(id).subscribe(d=>{
          this.FillTableData();
          MyTools.Dialog.open(MessageDialogComponent,{
            data:{
              "title":"Success",
              "content":"Group Deleted Successfully"
            }
          })
        },err=>{
          MyTools.Dialog.open(MessageDialogComponent,{
            data:{
              "title":"Session Expired",
              "content":"Failed Deletetion..Please Sign in Again",
              "icon":"alarm"
            }
          })
        })
      }
    })
  }
  AddGroup(){
    let dialogRef=MyTools.Dialog.open(AddGroupComponent,{
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
      if(success==false)
      return
        this.FillTableData();
    })
  }
}
