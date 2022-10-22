import { ContactUsComponent } from './../../Guest/contact-us/contact-us.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us-dialog',
  templateUrl: './contact-us-dialog.component.html',
  styleUrls: ['./contact-us-dialog.component.css']
})
export class ContactUsDialogComponent implements OnInit {

  constructor( private dialogRef:MatDialogRef<ContactUsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    
    }

  ngOnInit(): void {
    console.warn(this.data)
  }

}
