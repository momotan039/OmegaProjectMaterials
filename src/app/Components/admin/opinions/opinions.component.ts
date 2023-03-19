import { EditOpinionComponent } from './../../dilogs/edit-opinion/edit-opinion.component';
import { AddOpinionComponent } from './../../dilogs/add-opinion/add-opinion.component';
import { HttpOpinionsService } from './../../../services/http-opinions.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {

  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  constructor(
    public httpOpinionsService:HttpOpinionsService 
  ) { }

  ngOnInit(): void {
    
  }
  DeleteRow=()=>{
    const id=this.myTable?.selectedRow.id;
    debugger
    MyTools.Dialog.open(DeleteUserComponent).afterClosed()
    .subscribe(success=>{
      if(success)
      this.httpOpinionsService.DeleteOne(id).subscribe(message=>{
        MyTools.ShowResult200Message(message)
        this.myTable?.FillTableData();
      })
    })
  }

  
  AddRow=()=>{
    MyTools.Dialog.open(AddOpinionComponent,{
      disableClose:true,
      autoFocus:false
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }
  

  EditRow=() =>{
    MyTools.Dialog.open(EditOpinionComponent,{
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
