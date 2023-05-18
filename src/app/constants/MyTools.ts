import { Message } from 'src/app/models/Message';
import { PopUpImageComponent } from './../Materials/pop-up-image/pop-up-image.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyLocalStorage } from './../services/MyLocalStorage';
import { MatDialog, MatDialogContainer, _MatDialogBase } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../Components/dilogs/message-dialog/message-dialog.component";
import { User } from "../models/User";
import { Component, Input } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';



export class MyTools {

  static Dialog:MatDialog
  static currentUser=new User()
  static router:Router
  static domainNameServer="https://localhost:44327/"
  // static domainNameServer="http://omega-app.somee.com/"
  // static domainNameServer="http://testshiblys-001-site1.dtempurl.com/"
  static UrlRootApi=this.domainNameServer+"api"
  static passwordValidationRegex="^[A-Z](?=.*\d)(?=.*[a-z]).{7,}$"
  static SnackBar: MatSnackBar;
  static msgsReader= new BehaviorSubject<Message[]>([]);
  static unreadMsgs: any[]=[];
  static NumUnreadMsgs:BehaviorSubject<number>=new BehaviorSubject(0)
  static intervalMsgs: Subscription;

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
    },
    width:"300px"
  })
  MyTools.router.navigate(["/login"])
}

static ShowFialdMessage(error:any,title:string){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Faild "+title,
      "content":`${error.error}`,
      "icon":"assignment_late"
    },
    width:"350px"
  })
}

static ShowResult200Message(content:any){
  MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      "title":"Success",
      "content":`${content}`,
      "icon":"task_alt"
    },
    width:"300px"
  })
}




static ShowSnackBarMessage(msg:string,action:string){

  this.SnackBar.open(msg,action,{
   verticalPosition:"bottom",
   horizontalPosition:"center",
duration:1500
  })
}

static ShowPopUpImageDialog(image:string){
this.Dialog.open(PopUpImageComponent,{
  data:image,
  panelClass:["rotatePopUpImageDialog"
  // ,"MyWidth"
],
})
}
}

