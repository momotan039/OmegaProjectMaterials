import { MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from './../message-dialog/message-dialog.component';
import { MyTools } from './../../../constants/MyTools';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private refDialog:MatDialogRef<DeleteUserComponent>
  ) { }

  ngOnInit(): void {
this.refDialog.addPanelClass('hidden');
    MyTools.Dialog.open(MessageDialogComponent,{
      data:{
        'title':"Delete",
        'content':'You Will Confirm Process !!',
        'icon':'delete_forever',
        'cancel':true
      },
      width:"300px"
    }).afterClosed().subscribe((success)=>{
    this.refDialog.close(success)
    })
  }

}
