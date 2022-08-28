import { MyLocalStorage } from './../services/MyLocalStorage';
import { MatDialog, MatDialogContainer, _MatDialogBase } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../Components/dilogs/message-dialog/message-dialog.component";
import { User } from "../models/User";

export class MyTools {

  static Dialog:MatDialog
  static currentUser=new User()
  static router:Router
  static UrlRootApi="https://localhost:44327/api"
  static passwordValidationRegex="^[A-Z](?=.*\d)(?=.*[a-z]).{7,}$"
  constructor(
  ){

  }

  FilterDataTable(input:any,dataSource:any){
    let val=input.value+"";
    dataSource.filter=val
}

  CustomDate(date:any){
  return new Date(Date.parse(date+"")).toLocaleDateString()
}


  static ShowExpiredSessionMessage(){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Session Expired",
      "content":"Please Sign in Again",
      "icon":"alarm"
    }
  })
  MyTools.router.navigate(["/login"])
}

static ShowFialdMessage(error:any,title:string){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Faild "+title,
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

