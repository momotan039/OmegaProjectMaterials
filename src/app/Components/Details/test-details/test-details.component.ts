import { MyTools } from 'src/app/constants/MyTools';
import { BehaviorSubject, Observable, Subscriber, observable } from 'rxjs';
import { HttpGradesService } from './../../../services/http-grades.service';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Test';
import { Grade } from 'src/app/models/Grade';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent implements OnInit, OnDestroy {
  // test=new Test()
  _test: BehaviorSubject<Test> = new BehaviorSubject<Test>(new Test());
  test: any;
  labels: string[] = [];
  namesGroups: string[] = [];
  grades: number[] = [];
  dataChart1: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public httpTestsService: HttpTestsService,
    public httpGradesService: HttpGradesService
  ) {}
  ngOnDestroy(): void {
    // document.removeChild(document.querySelector(".chart-container")!)
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    if (isNaN(id)) {
      MyTools.router.navigateByUrl('/home');
      return;
    }

    this.httpTestsService.GetTestById(id).subscribe((data) => {
      if (!data) MyTools.router.navigateByUrl('/home');
      this.test = data;
      console.warn(this.test);
    });
    // this.GetLabel();
  }

  FilterPredicateParent = (data: any, filter: string) => {
    return (
      data.student.idCard.includes(filter) ||
      data.group.name.toLowerCase().includes(filter) ||
      data.sumGrade.toString().includes(filter)
    );
  };

  Obs: Subscriber<any> | undefined;
  BuildDataChart1 = async (): Promise<any> => {
    return new Promise(async (res, rej) => {
      this.httpGradesService
        .GetGradesByTest(this.activatedRoute.snapshot.params['id'])
        .subscribe((data) => {
          let grades = data as Grade[];
          const datasets=  Object.values(data.reduce((acc:any, obj:any) => {
            const groupName = obj.group.name;
            const grade = obj.sumGrade;

            if (!acc[groupName]) {
              acc[groupName] = {
                label: groupName,
                data: 0
              };
            }

            if (grade >= this.test.minGrade) {
              acc[groupName].data++;
            }

            return acc;
          }, []))

          const _data = {
            labels: [...new Set(grades.map((f) => f.group?.name))],
            datasets: [{
              label: 'Pass Student',
              data: datasets.map((f:any)=>f.data),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
          };
          res(_data);
        });
    });
  };
}
