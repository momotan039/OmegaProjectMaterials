import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, filter, Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Data } from '@angular/router';
import { Test } from 'src/app/models/Test';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
 @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @Input() displayedColumns:string[]=[]
  @Input() displayedNameColumns:string[]=[]
  @Input() getDataTable:Observable<any> | undefined
  @Input() AddRowParent:(() => void) | undefined
  @Input() EditRowParent:(() => void) | undefined
  @Input() DeleteRowParent:(() => void) | undefined
  @Input() ShowViewDialogParent:(() => void) | undefined
  @Input() FilterPredicateParent:((data: any, filter: string) => any) | undefined
  @Input() sortingDataAccessorParent:((item:any, property:any) => any) | undefined
  @Input() operations:boolean[]=[]
  @Input() detailsComonentUrl=""
  @Input() title=""
  @Input() enableAddRow=true
  @Input() disableFilterOverride=false
  @Input() disableSortOverride=false
  @Input() EnableShowViewDialog=false
  selectedRow:any
  dataSource:any

  ngOnInit(): void {
    this.FillTableData();
  }

  GetdataByProp(elm:any,prop:string){
    const arr=prop.split('.')
    let _prop="";
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i] in elm)
        elm=elm[arr[i]]
        _prop=arr[i];
    }
    if(_prop.includes("date")||_prop.includes("Date")){
      return new Date(elm).toDateString()
    }
    return elm
    }

  AddRow(){
    this.AddRowParent?.();
  }

EditRow(elm:any){
  this.selectedRow=elm
  this.EditRowParent?.();
}
DeleteRow(row:any){
  this.selectedRow=row
  this.DeleteRowParent?.();
}

FilterDataTable(input:any){
  let val=input.value+"";
  this.dataSource.filter=val.toLowerCase()
}

FillTableData(){
this.getDataTable!.subscribe((data: any)=>{
  console.warn(data)
  debugger
  this.dataSource=new MatTableDataSource(data)
  this.dataSource.paginator=this.paginator
  this.dataSource.sort=this.sort
 if(!this.disableFilterOverride)
//search by current object properties
 this.dataSource.filterPredicate = (data: any, filter: string) => {
   return this.FilterPredicateParent?.(data,filter) ;
}
if(!this.disableSortOverride)
this.dataSource.sortingDataAccessor = (item:any, property:any) => {
  var _item=item

  for(let i=0;i<this.displayedNameColumns.length;i++){
     //get path prop
      //student.idCard

    if(property==this.displayedNameColumns[i])
    {
      this.displayedColumns[i].split('.').forEach(_prop=>{
        _item=_item[_prop]
      })
      console.warn(_item)
     return _item
    }
  }

  return item.test.name
};

})
}

ShowViewDialog(row:any){
  this.selectedRow=row
  this.ShowViewDialogParent?.();
}


}


