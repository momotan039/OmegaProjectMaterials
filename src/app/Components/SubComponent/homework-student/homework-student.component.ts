import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../../services/auth.service';
import { HomeWorkService } from './../../../services/HomeWork.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MyTableComponent } from '../my-table/my-table.component';

@Component({
  selector: 'app-homework-student',
  templateUrl: './homework-student.component.html',
  styleUrls: ['./homework-student.component.css']
})
export class HomeworkStudentComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  displayedColumns=['title','group.name','teacher.firstName','sendingDate']
  displayedNameColumns=['Title','Group','Teacher','Sending Date','Operations']

  constructor(
    public homeWorkService:HomeWorkService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {

  }

  FilterPredicateParent=(data: any, filter: string)=>{
    console.warn(data.teacher.firstName.includes(filter))
    return(
          data.title.includes(filter) ||
          data.group.name.includes(filter)||
          data.teacher.firstName.includes(filter)||
          data.sendingDate.includes(filter)
          )
  }
}
