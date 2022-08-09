import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {
  paginator: any;
  sort: any;
  constructor() { }
  @Input() displayedColumns:string[]=[]
  @Input() displayedNameColumns:string[]=[]
  @Input() getDataTable:Observable<any> | undefined
  @Input() operations:boolean[]=[]
  dataSource:any
  ngOnInit(): void {
   this.FillTableData();
  }
  GetdataByProp(elm:any,prop:string){
    debugger
    const arr=prop.split('.')
    for(let i=0;i<arr.length;i++)
    {
      if(arr.length>1)
      debugger
      if(arr[i] in elm)
      {
        elm=elm[arr[i]]
      }
    }
    return elm
    }
  AddRow(){
    alert("add")

  }
EditRow(elm:any){
  alert("edit")
}
DeleteRow(id:number){
  alert("delete")
}

FilterDataTable(input:any){
  let val=input.value+"";
  this.dataSource.filter=val
}

FillTableData(){
this.getDataTable!.subscribe((data: any)=>{
  console.log(data)
  this.dataSource=new MatTableDataSource(data)
  this.dataSource.paginator=this.paginator
 this.dataSource.sort=this.sort
})
}
}


