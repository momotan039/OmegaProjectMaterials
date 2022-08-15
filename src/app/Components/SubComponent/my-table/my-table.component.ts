import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Data } from '@angular/router';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor() { }
  @Input() displayedColumns:string[]=[]
  @Input() displayedNameColumns:string[]=[]
  @Input() getDataTable:Observable<any> | undefined
  @Input() AddRowParent:(() => void) | undefined
  @Input() EditRowParent:(() => void) | undefined
  @Input() DeleteRowParent:(() => void) | undefined
  @Input() operations:boolean[]=[]
  @Input() detailsComonentUrl=""
  @Input() title=""
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
  this.dataSource.filter=val
}

FillTableData(){
this.getDataTable!.subscribe((data: any)=>{
  this.dataSource=new MatTableDataSource(data)
  this.dataSource.paginator=this.paginator
 this.dataSource.sort=this.sort

})
}
}


