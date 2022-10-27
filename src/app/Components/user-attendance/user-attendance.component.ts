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
     this.httpAttendanceService.GetAttendanceStatistics(this.groupId).forEach(data=>{
      console.warn(data)
     })
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


closeDatePicker(eventData: any,refInput:HTMLInputElement, dp?:MatDatepicker<any>) {
  const date=new Date(eventData);
  refInput.value=(date.getMonth()+1)+"/"+date.getFullYear()
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
    labels: ['May','Feb'],
    datasets: [
      {
        label: 'Absent',
        data:[0.5,2]
      },
    ]
  }
  return await dataChart1
 }

BuildDataChart1=()=> {
  let dataChart1:any = {
    labels: ['May','Feb'],
    datasets: [
      {
        label: 'Absent',
        data:[1,2,3]
      },
      {
        label: 'Present',
        data:[1,2,3]
      }
    ]
  }

  //   await this.httpGradesService.GetGradesByTest(this.activatedRoute.snapshot.params['id'])
  //     .subscribe(data => {
  //       let grades = data as Grade[];
  //       //get all labels name
  //       grades.forEach(f => {
  //         if (!this.namesGroups.find(r => r == f.group?.name))
  //           this.namesGroups.push(f.group?.name!);
  //       });
  //       dataChart1.labels = this.namesGroups

  //       //Get All Datasets Data
  //       let i = 0;
  //       this.namesGroups.forEach(n => {
  //         const fialdData = grades.filter(f => f.group?.name == n && f.sumGrade! < this.test.minGrade).length
  //         const PassData = grades.filter(f => f.group?.name == n && f.sumGrade! >= this.test.minGrade).length
  //         dataChart1.datasets[0].data.push(fialdData)
  //         dataChart1.datasets[1].data.push(PassData)
  //       });
  // })
  return  dataChart1
}

}
