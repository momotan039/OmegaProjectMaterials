import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { MyTools } from 'src/app/constants/MyTools';
import { MyTableComponent } from './../SubComponent/my-table/my-table.component';
import { HttpAttendanceService } from './../../services/http-attendance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from 'src/app/models/Group';

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
  maxDate: Date | undefined;
  
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
    }, 10);
  }

  SetMaxValueDate(){
    const closingDate=new Date(this.group!.closingDate?.toString()!)
      const _date=new Date();
      if(closingDate!>_date)
        this.maxDate=_date
       else
          this.maxDate=closingDate
  }

  GetDateTable1=()=>{

    const data=[
      {
        'name':'Adam Karam',
        'status':'present',
        'date':'2022-3-15',
        'note':'',
        'groupId':1
      }
      ,
      {
        'name':'Rami Adnan',
        'status':'absent',
        'date':'2022-3-15',
        'note':'',
        'groupId':1
      }
      ,
      {
        'name':'Adam Karam',
        'status':'present',
        'date':'2022-4-13',
        'note':'',
        'groupId':2
      }
      
    ]
    let filtered:any=[]
    if(this.groupId)
      filtered=data.filter(f=>f.groupId==this.groupId)
    if(this.date && this.groupId)
     filtered=data.filter(f=>f.groupId==this.groupId&&f.date==this.date)
    return new Observable<any>((obs)=>{
      obs.next(filtered)
      obs.complete()
    })
  }
}
