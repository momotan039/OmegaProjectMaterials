import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MyTools } from 'src/app/constants/MyTools';
import { User } from 'src/app/models/User';
import { HttpUsersService } from 'src/app/services/httpUsers/http-users.service';
import { UsersTableComponent } from '../../admin/users-table/users-table.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user=new User()
  receiveData:User;
  EditUserForm=this.fb.group({});
  // EditUserForm:FormGroup | undefined;
  constructor(
    private httpUsers:HttpUsersService,
    private fb:FormBuilder,
    private dialogRef:MatDialogRef<UsersTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User) {
    this.receiveData=data
    this.EditUserForm=this.fb.group({
    firstName:[this.receiveData.firstName,Validators.required],
    lastName:[this.receiveData.lastName,Validators.required],
    email:[this.receiveData.email,Validators.required],
    phone:[this.receiveData.phone,Validators.required],
    role:[this.receiveData.role+"",Validators.required],
    idCard:[this.receiveData.idCard,Validators.required],
    id:[this.receiveData.id,Validators.required]
  })
     }


  ngOnInit(): void {
    this.user=this.data
  }
  EditUser(){
    debugger
    if(!this.EditUserForm.valid || !this.ChangedInputs())
    {
      debugger
      this.dialogRef.close();
       return;
    }

    this.httpUsers.EditingUser(this.EditUserForm.value).subscribe(data=>{
      MyTools.Dialog.open(MessageDialogComponent,{
        data:{
          "title":"Success",
          "content":"User Edited Successfully"
        }
      })
      this.dialogRef.close();
    },err=>{
      MyTools.Dialog.open(MessageDialogComponent,{
        data:{
          "title":"Faild Editing",
          "content":`${err.error}`
        }
      })
      console.warn(err)
    },)

  }
  ChangedInputs() {
    if(this.EditUserForm.value.firstName!=this.receiveData.firstName)
    return true
    if(this.EditUserForm.value.lastName!=this.receiveData.lastName)
    return true
    if(this.EditUserForm.value.email!=this.receiveData.email)
    return true
    if(this.EditUserForm.value.phone!=this.receiveData.phone)
    return true
    if(this.EditUserForm.value.idCard!=this.receiveData.idCard)
    return true

    return false;
  }

}


