import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MyTools } from "src/app/constants/MyTools";
import { HttpUsersService } from "src/app/services/httpUsers/http-users.service";
import { UsersTableComponent } from "../../admin/users-table/users-table.component";
import { MessageDialogComponent } from "../message-dialog/message-dialog.component";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private httpUsers:HttpUsersService,
    private dialogRef:MatDialogRef<UsersTableComponent>,
    private fb:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public dataRecived:any
    ) { }
  AddUserForm=this.fb.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',Validators.required],
    phone:['',Validators.required],
    idCard:['',Validators.required],
    roleId:[this.dataRecived.roleBy,Validators.required],
  })
  ngOnInit(): void {

  }

SaveUser(){
  if(!this.AddUserForm.valid)
  return;
  this.httpUsers.PostUser(this.AddUserForm.value).subscribe(data=>{
    MyTools.Dialog.open(MessageDialogComponent,{
      data:{
        "title":"Success",
        "content":"User Added Successfully"
      }
    })
    this.dialogRef.close();
  },err=>{
    MyTools.Dialog.open(MessageDialogComponent,{
      data:{
        "title":"Faild Adding",
        "content":`${err.error}`
      }
    })
  },)
}

GetNameOfRole(){
return MyTools.GetNameOfRole(this.dataRecived.roleBy)
}

}
