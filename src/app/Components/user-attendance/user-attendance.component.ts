import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { HttpAttendanceService } from 'src/app/services/http-attendance.service';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { MyTableComponent } from '../SubComponent/my-table/my-table.component';

@Component({
  selector: 'app-user-attendance',
  templateUrl: './user-attendance.component.html',
  styleUrls: ['./user-attendance.component.css']
})
export class UserAttendanceComponent implements OnInit {
  date:any
  maxDate:any
  groupId=0
  group:Group | undefined
 @ViewChild("groupTable") GroupTable:MyTableComponent | undefined
  
  constructor(
   private route:ActivatedRoute,
   public httpAttendanceService:HttpAttendanceService,
   private httpGroupsService:HttpGroupsService
  ) { }
  
 
  ngOnInit(): void {
    this.groupId=parseInt(this.route.snapshot.paramMap.get('groupId')!)
    this.date=new Date().toDateString()
    this.httpGroupsService.GetGroupByID(this.groupId+"",false).subscribe(data=>{
     this.group=data
     this.SetMaxValueDate()    
    
    })

    
 }
 

closeDatePicker(eventData: any,refInput:HTMLInputElement, dp?:MatDatepicker<any>) {
  const ndate=new Date(eventData);
  refInput.value=(ndate.getMonth()+1)+"/"+ndate.getFullYear()
  const date=refInput.value
  let _date=""
  for(let i=0;i<date.length;i++)
      {
        if(date[i]=='/')
        _date+=date[i].replace('/','-')
        else
        _date+=date[i]
      }
  this.date=_date
  this.GroupTable!.showSpinnerLoad=true
  setTimeout(() => {
    this.GroupTable?.FillTableData()
  }, 500);

  dp!.close();    
}
SetMaxValueDate(){
  const closingDate=new Date(this.group!.closingDate?.toString()!)
    const _date=new Date();
    if(closingDate!>_date)
      this.maxDate=_date
     else
        this.maxDate=closingDate
}

MyFunc=async ():Promise<any>=>{
  let dataChart1:any = {
    datasets: [
      {
        label: 'Presents',
      },
    ]
  }
  await this.httpAttendanceService.GetAttendanceStatistics(this.groupId).forEach(data=>{
        dataChart1.labels=data.months
    dataChart1.datasets[0].data=data.counts
   })
  return  dataChart1
 }


}
