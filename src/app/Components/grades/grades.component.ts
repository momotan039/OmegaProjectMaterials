import { HttpGradesService } from './../../services/http-grades.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  constructor(
    public httpGradesService:HttpGradesService
  ) { }

  ngOnInit(): void {
  }

  FillDataTable(){
    return this.httpGradesService.GetGrades()
  }

}
