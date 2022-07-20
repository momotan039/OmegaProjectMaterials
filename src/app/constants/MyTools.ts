import { MatDialog } from "@angular/material/dialog";

export class MyTools {
  static Dialog:MatDialog

  FilterDataTable(input:any,dataSource:any){
    let val=input.value+"";
    dataSource.filter=val
}

 static CustomDate(date:any){
  return new Date(Date.parse(date+"")).toLocaleDateString()
}

}
