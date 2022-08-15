import { MyTools } from '../../../constants/MyTools';
import { HttpUsersService } from '../../../services/httpUsers/http-users.service';
import { User } from '../../../models/User';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../../dilogs/add-user/add-user.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { EditUserComponent } from '../../dilogs/edit-user/edit-user.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css','../../SubComponent/my-table/my-table.component.css']
})
export class UsersTableComponent implements OnInit {
  @Input() roleBy=-1
  user:User | undefined
  dataSource:any;
  displayedColumns:any;
  @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private usersService:HttpUsersService,
    private dialog:MatDialog,
    public authService:AuthService
    ) { }


  ngOnInit(): void {
    this.displayedColumns=["firstName","lastName","email","phone","idCard","operations"]
    this.FillTableData()

  }

  FilterDataTable(input:any){
      let val=input.value+"";
      this.dataSource.filter=val
  }

  FillTableData(){
    this.usersService.GetUsersByRole(this.roleBy).subscribe(data=>{
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
          MyTools.ShowResult200Message(d)
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
      data:{
        "roleBy":this.roleBy
      },
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
      if(success==false)
      return
        this.FillTableData();
    })
  }
}
