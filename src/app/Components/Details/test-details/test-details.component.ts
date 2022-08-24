import { BehaviorSubject } from 'rxjs';
import { HttpGradesService } from './../../../services/http-grades.service';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Test';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
// test=new Test()
_test:BehaviorSubject<Test>=new BehaviorSubject<Test>(new Test());
test:any
  constructor(
    public activatedRoute:ActivatedRoute,
    public httpTestsService:HttpTestsService,
    public httpGradesService:HttpGradesService
  ) {
  }

  ngOnInit(): void {
    this.httpTestsService.GetTestById(this.activatedRoute.snapshot.params['id'])
    .subscribe(data=>{
      this.test=data
    })
  }

}
