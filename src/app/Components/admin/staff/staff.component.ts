import { EditMemberToStaffComponent } from './../../dilogs/edit-member-to-staff/edit-member-to-staff.component';
import { AddMemberToStaffComponent } from './../../dilogs/add-member-to-staff/add-member-to-staff.component';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpStaffService } from './../../../services/http-staff.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  constructor(
    public httpStaffService:HttpStaffService 
  ) { }

  ngOnInit(): void {
    
  }
  DeleteRow=()=>{
    const id=this.myTable?.selectedRow.id;
    MyTools.Dialog.open(DeleteUserComponent).afterClosed()
    .subscribe(success=>{
      if(success)
      this.httpStaffService.DeleteOne(id).subscribe(message=>{
        MyTools.ShowResult200Message(message)
        this.myTable?.FillTableData();
      })
    })
  }

  
  AddRow=()=>{
    MyTools.Dialog.open(AddMemberToStaffComponent,{
      disableClose:true,
      autoFocus:false
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }
  

  EditRow=() =>{
    MyTools.Dialog.open(EditMemberToStaffComponent,{
      panelClass:"dark-dialog",
       data:this.myTable?.selectedRow,
       disableClose:true,
       autoFocus:false
     }).afterClosed()
     .subscribe(success=>{
       if(success)
         this.myTable?.FillTableData();
     })
   }


   FilterPredicateParent=(data: any, filter: string)=>{
    return data.name.includes(filter) ||
    data.work.includes(filter) ||
    data.about.includes(filter) 
}

}
