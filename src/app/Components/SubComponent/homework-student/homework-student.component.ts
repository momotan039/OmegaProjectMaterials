import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../../services/auth.service';
import { HomeWorkService } from './../../../services/HomeWork.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-homework-student',
  templateUrl: './homework-student.component.html',
  styleUrls: ['./homework-student.component.css']
})
export class HomeworkStudentComponent implements OnInit {
  dataSource:any
  @ViewChild("refpag") paginator:MatPaginator | undefined;

  constructor(
    private homeWorkService:HomeWorkService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.homeWorkService.GetHomeWorkByStudentId(this.authService.currentUser.id!)
    .subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator=this.paginator
    })
  }

}
