import { ChartComponent } from './../SubComponent/chart/chart.component';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { MyTools } from 'src/app/constants/MyTools';
import { MyTableComponent } from './../SubComponent/my-table/my-table.component';
import { HttpAttendanceService } from './../../services/http-attendance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  date:any
  groupId=0
  group:Group | undefined
 @ViewChild("groupTable") GroupTable:MyTableComponent | undefined
 @ViewChild("chart") chart:ChartComponent | undefined
  maxDate: Date | undefined;
  serachType='1'
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
  SaveChangesAttendances=()=>{
   console.warn(this.GroupTable?.dataSource)
  const data=this.GroupTable?.dataSource._data._value;
  this.httpAttendanceService.Post(data).subscribe(res=>{
    MyTools.ShowResult200Message(res)
  },(err)=>{
    MyTools.ShowFialdMessage(err,"Saving Changes")
  })
  }

  SearchByDate(refinput:any){
    let date=refinput.value+""
    if(date=="")
    return
    let _date=""
    for(let i=0;i<date.length;i++)
        {
          if(date[i]=='/')
          _date+=date[i].replace('/','-')
          else
          _date+=date[i]
        }
    this.date=_date
    setTimeout(() => {
      this.GroupTable?.FillTableData()
      this.chart?.build()
    }, 10);
  }

  closeDatePicker(eventData: any,refInput:HTMLInputElement, dp?:MatDatepicker<any>) {

    if(eventData=="")
    return
    let date=eventData

    this.date=date.replace(/\//g, '-');
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

  GetAttendaceStatisticsByMonth=async ():Promise<any>=>{
    let dataChart1:any = {
      datasets: [
        {
          label: 'Presents',
        },
      ]
    }
    await this.httpAttendanceService.GetAttendanceStatisticsPerMonth(this.groupId,this.date).forEach(data=>{
      dataChart1.labels=data.labels
      dataChart1.datasets[0].data=data.data
     })
    return  dataChart1
   }

}
