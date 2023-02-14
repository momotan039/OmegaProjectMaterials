import { ContactUsDialogComponent } from './../../dilogs/contact-us-dialog/contact-us-dialog.component';
import { HomeComponent } from './../../home/home.component';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpContactUsService } from './../../../services/http-contact-us.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;

  constructor(
    public httpContactUsService: HttpContactUsService
  ) { }
  ngAfterViewInit(): void {
    console.log(this.myTable);
  }

  ngOnInit(): void {
  }

  FilterPredicateParent = (data: any, filter: string) => {
    return data.name.includes(filter) ||
      data.phone.includes(filter) ||
      data.message.includes(filter) ||
      data.email.includes(filter)
  }

  ShowDetailsMessage = () => {
    MyTools.Dialog.open(ContactUsDialogComponent, {
      data: this.myTable?.selectedRow
    })
  }

  DeleteRow = () => {
    let dialogRef = MyTools.Dialog.open(DeleteUserComponent,
      {
        width: "300px", disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe((success: any) => {
      if (success) {
        this.httpContactUsService.DeleteOne(this.myTable?.selectedRow.id).subscribe(d => {
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
      }
    })
  }
}
