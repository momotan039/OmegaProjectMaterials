import { AddActivityComponent } from './../../dilogs/add-activity/add-activity.component';
import { HttpActivityService } from 'src/app/services/http-activity.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { MyTools } from 'src/app/constants/MyTools';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { EditActivityComponent } from '../../dilogs/edit-activity/edit-activity.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  constructor(
    public httpActivityService:HttpActivityService 
  ) { }

  ngOnInit(): void {
    
  }
  
  DeleteRow=()=>{
    const id=this.myTable?.selectedRow.id;
    MyTools.Dialog.open(DeleteUserComponent).afterClosed()
    .subscribe(success=>{
      if(success)
      this.httpActivityService.DeleteOne(id).subscribe(message=>{
        MyTools.ShowResult200Message(message)
        this.myTable?.FillTableData();
      })
    })
  }

  
  AddRow=()=>{
    MyTools.Dialog.open(AddActivityComponent,{
      disableClose:true,
      autoFocus:false
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }
  

  EditRow=() =>{
    MyTools.Dialog.open(EditActivityComponent,{
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
