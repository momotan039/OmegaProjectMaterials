import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dilogs/message-dialog/message-dialog.component";

export class MyTools {
  static Dialog:MatDialog

  constructor(
    public router:Router
  ){
  }



  FilterDataTable(input:any,dataSource:any){
    let val=input.value+"";
    dataSource.filter=val
}

 static CustomDate(date:any){
  return new Date(Date.parse(date+"")).toLocaleDateString()
}

static GetNameOfRole(role:number){
if(role==1)
return "Admin"
if(role==2)
return "Teacher"

return "Student"
}



 ShowExpiredSessionMessage(){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Session Expired",
      "content":"Failed Sending..Please Sign in Again",
      "icon":"alarm"
    }
  })
  this.router.navigate(["/login"])
}
}
