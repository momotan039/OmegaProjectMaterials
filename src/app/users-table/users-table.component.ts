import { MyTools } from './../constants/MyTools';
import { HttpUsersService } from './../services/httpUsers/http-users.service';
import { DeleteUserComponent } from './../dilogs/delete-user/delete-user.component';
import { EditUserComponent } from './../dilogs/edit-user/edit-user.component';
import { MessageDialogComponent } from './../dilogs/message-dialog/message-dialog.component';
import { User } from './../models/User';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../dilogs/add-user/add-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  dataSource:any;
  displayedColumns:any;
  @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private usersService:HttpUsersService,private dialog:MatDialog) { }


  ngOnInit(): void {
    this.displayedColumns=["firstName","lastName","email","password","phone","idCard","role","operations"]
    this.FillTableData()
  }

  FilterDataTable(input:any){
      let val=input.value+"";
      this.dataSource.filter=val
  }

  FillTableData(){
    this.usersService.GetUsers().subscribe(data=>{

      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
     this.dataSource.sort=this.sort
    })
  }
  DeleteUser(userId:number){
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.usersService.DeleteUser(userId).subscribe(d=>{
          this.FillTableData();
          MyTools.Dialog.open(MessageDialogComponent,{
            data:{
              "title":"Success",
              "content":"User Deleted Successfully"
            }
          })
        },err=>{
          MyTools.Dialog.open(MessageDialogComponent,{
            data:{
              "title":"Faild",
              "content":`${err.error}`
            }
          })
        })
      }
    })
  }
  EditUser(row:User){

    let dialogRef=MyTools.Dialog.open(EditUserComponent,{
      data:row,
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
        if(success==false)
        return
          this.FillTableData();
      })
  }

  AddUser(){
    let dialogRef=MyTools.Dialog.open(AddUserComponent,{
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
      if(success==false)
      return
        this.FillTableData();
    })
  }

}
