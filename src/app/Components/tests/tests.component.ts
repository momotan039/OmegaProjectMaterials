import { HttpTestsService } from './../../services/HttpTests.service';
import { AddTestComponent } from './../dilogs/add-test/add-test.component';
import { EditTestComponent } from './../dilogs/edit-test/edit-test.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTools } from 'src/app/constants/MyTools';
import { MyTableComponent } from '../SubComponent/my-table/my-table.component';
import { DeleteUserComponent } from '../dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  dataSource:any;
  displayedColumns:any;

  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;
  constructor(
   public httpTestsService:HttpTestsService
  ) { }

  ngOnInit(): void {
  }
  EditRow=()=>{
    let dialogRef=MyTools.Dialog.open(EditTestComponent,{
      data:this.myTable?.selectedRow,
      disableClose:true
    })
    dialogRef.afterClosed().subscribe(success=>{
      if(success)
        this.myTable!.FillTableData();
    })
  }
  DeleteRow=()=>{
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.httpTestsService.DeleteTest(this.myTable?.selectedRow.id).subscribe(d=>{
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
      }
    })
  }
  AddRow=()=>{
    debugger
    MyTools.Dialog.open(AddTestComponent,{
      disableClose:true
     })
    .afterClosed().subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }

  FilterPredicateParent=(data: any, filter: string)=>{
    return data.name.includes(filter) ||
          data.date.includes(filter)
  }
  sortingDataAccessorParent=(item: any,property: any)=>{
    switch (property) {
      case 'Name': return item.name;
      default: return item[property];
    }
  }
}
