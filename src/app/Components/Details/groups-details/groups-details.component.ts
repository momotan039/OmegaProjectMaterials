import { HttpAcountService } from 'src/app/services/http-acount.service';
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

  totalTeachers=0;
  totalStudents=0;
  constructor(
    private route: ActivatedRoute,
     public httpUsersService: HttpUsersService,
     private httpUserGroupService: HttpUserGroupService,
     private HttpGroupsService: HttpGroupsService,
     private httpAccountService:HttpAcountService
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
      this.totalTeachers=this.group.userGroups.filter(f=>f.user.roleId==2).length
      this.totalStudents=this.group.userGroups.filter(f=>f.user.roleId==3).length
    })
  }
  DeleteRow=()=>{
    MyTools.Dialog.open(DeleteUserComponent,
       {
        width:"300px", disableClose:true
       }
      ).afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.httpUserGroupService.
        DeleteUserFromGroup(this.myTable?.selectedRow.id).
        subscribe(d=>{
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
        if(this.myTable?.selectedRow.roleId==2)
          this.totalTeachers--;
          else
            this.totalStudents--;
      }
    })
  }
  AddRow=()=>{
    MyTools.Dialog.open(AddUserToGroupComponent,{
      data:this.group,
      disableClose:true
     })
    .afterClosed().subscribe(data=>{
      if(data)
        {
          this.myTable?.FillTableData();
           this.totalTeachers+=data['teachersNum'];
          this.totalStudents+=data['studentsNum'];
        }
    })
  }


  FilterPredicateParent=(data: any, filter: string)=>{
    return data.role.description.toLowerCase().includes(filter) ||
          data.firstName.toLowerCase().includes(filter)||
          data.lastName.toLowerCase().includes(filter)||
          data.email.toLowerCase().includes(filter)||
          data.phone.toLowerCase().includes(filter)||
          data.idCard.toLowerCase().includes(filter)
}

GetImageProfile(){
  if(this.group.imageProfile)
      return MyTools.domainNameServer+this.group.imageProfile
  else
      return "../../../../assets/images/group.png"
}

UploadImageProfile(refFile:HTMLInputElement,refImg:HTMLImageElement){
  let fd=new FormData();
  fd.append("image",refFile.files?.item(0)!)
  fd.append("idGroup",this.group.id+"")
  this.httpAccountService.EditImageProfile(this.group.id!,fd,true).subscribe(res=>{
    MyTools.ShowSnackBarMessage(res,"Ok")
    //reset selected image input
    refFile.value=""
    refImg.src=this.GetImageProfile()+"?t="+new Date().getMilliseconds();
  },(err)=>MyTools.ShowFialdMessage(err,"Changing Profile Image"))
}
// GetTotalTeachers(){
//   return this.group.userGroups.filter(f=>f.user.roleId==2).length
// }
// GetTotalStudents(){
//   return this.group.userGroups.filter(f=>f.user.roleId==3).length
// }
}
