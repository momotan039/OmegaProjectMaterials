import { ContactUsDialogComponent } from './../../dilogs/contact-us-dialog/contact-us-dialog.component';
import { HomeComponent } from './../../home/home.component';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpContactUsService } from './../../../services/http-contact-us.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  constructor(
    public httpContactUsService:HttpContactUsService
  ) { }

  ngOnInit(): void {
  }
  FilterPredicateParent=(data: any, filter: string)=>{
    return data.name.includes(filter) ||
    data.phone.includes(filter) ||
    data.message.includes(filter) ||
    data.email.includes(filter)
         
  }
  ShowDetailsMessage=()=>{
     MyTools.Dialog.open(ContactUsDialogComponent,{
      data: this.myTable?.selectedRow
     })
  }
}
