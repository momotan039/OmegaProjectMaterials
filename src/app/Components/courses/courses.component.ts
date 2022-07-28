import { EditCourseComponent } from './../../dilogs/edit-course/edit-course.component';
import { AddCourseComponent } from './../../dilogs/add-course/add-course.component';
import { Course } from 'src/app/models/Course';
import { HttpCoursesService } from './../../services/Http Courses/http-courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyTools } from 'src/app/constants/MyTools';
import { MessageDialogComponent } from 'src/app/dilogs/message-dialog/message-dialog.component';
import { DeleteUserComponent } from 'src/app/dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  dataSource:any;
  displayedColumns:any;
  @ViewChild("refpag") paginator:MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private courseService:HttpCoursesService,
  ) { }

  ngOnInit(): void {
    this.displayedColumns=["name","operations"]
    this.FillTableData()
  }

  FillTableData(){
    this.courseService.GetCourses().subscribe(data=>{
      this.dataSource=new MatTableDataSource<Course>(data)
      this.dataSource.paginator=this.paginator
     this.dataSource.sort=this.sort
    })
  }

  FilterDataTable(input:any){
    let val=input.value+"";
    this.dataSource.filter=val
}

EditCourse(course:Course){
  let dialogRef=MyTools.Dialog.open(EditCourseComponent,{
    data:course,
    disableClose:true
  })
  dialogRef.afterClosed().subscribe(success=>{
    if(success==false)
    return
      this.FillTableData();
  })
}
DeleteCourse(id:any){
  let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
    disableClose:true
  });

  dialogRef.afterClosed().subscribe((success: any)=>{
    if(success)
    {
      this.courseService.DeleteCourse(id).subscribe(d=>{
        this.FillTableData();
        MyTools.Dialog.open(MessageDialogComponent,{
          data:{
            "title":"Success",
            "content":"Course Deleted Successfully"
          }
        })
      },err=>{
        MyTools.Dialog.open(MessageDialogComponent,{
          data:{
            "title":"Session Expired",
            "content":"Failed Deletetion..Please Sign in Again",
            "icon":"alarm"
          }
        })
      })
    }
  })
}
AddCourse(){
  let dialogRef=MyTools.Dialog.open(AddCourseComponent,{
    disableClose:true
  })
  dialogRef.afterClosed().subscribe(success=>{
    if(success==false)
    return
      this.FillTableData();
  })
}

}
