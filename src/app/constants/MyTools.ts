import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../Components/dilogs/message-dialog/message-dialog.component";
import { User } from "../models/User";

export class MyTools {

  static Dialog:MatDialog
  static currentUser=new User()
  static router:Router
  constructor(
    public router:Router
  ){

  }



  FilterDataTable(input:any,dataSource:any){
    let val=input.value+"";
    dataSource.filter=val
}

  CustomDate(date:any){
  return new Date(Date.parse(date+"")).toLocaleDateString()
}


  static ShowExpiredSessionMessage(router:Router){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Session Expired",
      "content":"Please Sign in Again",
      "icon":"alarm"
    }
  })
  router.navigate(["/login"])
}

static ShowFialdMessage(error:any){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Faild Process",
      "content":`${error.error}`,
      "icon":"error"
    }
  })
}

static ShowResult200Message(content:any){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Success",
      "content":`${content}`,
      "icon":"error"
    }
  })
}
}
