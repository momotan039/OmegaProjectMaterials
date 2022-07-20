import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersTableComponent } from 'src/app/users-table/users-table.component';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  constructor( private dialogRef:MatDialogRef<UsersTableComponent>,
    @Inject(MAT_DIALOG_DATA) public Message:any) {
     }
  ngOnInit(): void {
  }

}
