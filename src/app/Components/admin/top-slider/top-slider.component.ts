import { AddTopSliderImageComponent } from './../../dilogs/add-top-slider-image/add-top-slider-image.component';
import { HttpTopSliderService } from './../../../services/http-top-slider.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTools } from 'src/app/constants/MyTools';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { EditTopSliderImageComponent } from '../../dilogs/edit-top-slider-image/edit-top-slider-image.component';

@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  constructor(
    public httpTopSliderService:HttpTopSliderService
  ) { }

  ngOnInit(): void {
  }

  
  DeleteRow=()=>{
    const id=this.myTable?.selectedRow.id;
    MyTools.Dialog.open(DeleteUserComponent).afterClosed()
    .subscribe(success=>{
      if(success)
      this.httpTopSliderService.DeleteOne(id).subscribe(message=>{
        MyTools.ShowResult200Message(message)
        this.myTable?.FillTableData();
      })
    })
  }

  
  AddRow=()=>{
    let dataTable=this.myTable?.dataSource.filteredData
    const order=dataTable.length?dataTable[dataTable.length-1].order:0
    MyTools.Dialog.open(AddTopSliderImageComponent,{
      disableClose:true,
      autoFocus:false,
      data:{
        order:order
      }
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }
  

  EditRow=() =>{
    MyTools.Dialog.open(EditTopSliderImageComponent,{
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
    return data.title.includes(filter) ||
    data.thumbImage.includes(filter) ||
    data.order.includes(filter) 
}

}
