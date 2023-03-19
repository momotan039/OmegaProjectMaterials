import { MyTools } from 'src/app/constants/MyTools';
import { HttpStaffService } from './../../../services/http-staff.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-staff',
  templateUrl: './our-staff.component.html',
  styleUrls: ['./our-staff.component.css']
})
export class OurStaffComponent implements OnInit {
 
  staff:any
  domain=MyTools.domainNameServer
  constructor(
    private httpStaffService:HttpStaffService
  ) { }

  ngOnInit(): void {
    this.httpStaffService.GetAll().subscribe(data=>{
      this.staff=data
    })
  }

}
