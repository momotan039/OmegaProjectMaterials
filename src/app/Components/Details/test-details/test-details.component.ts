import { MyTools } from 'src/app/constants/MyTools';
import { BehaviorSubject, Observable, Subscriber, observable } from 'rxjs';
import { HttpGradesService } from './../../../services/http-grades.service';
import { HttpTestsService } from './../../../services/HttpTests.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/Test';
import { Grade } from 'src/app/models/Grade';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {
  // test=new Test()
  _test: BehaviorSubject<Test> = new BehaviorSubject<Test>(new Test());
  test: any
  labels: string[] = []
  namesGroups: string[] = []
  grades: number[] = []
  dataChart1: any
  constructor(
    public activatedRoute: ActivatedRoute,
    public httpTestsService: HttpTestsService,
    public httpGradesService: HttpGradesService
  ) {
  }

  ngOnInit(): void {
    let id=this.activatedRoute.snapshot.params['id']
    if(isNaN(id))
    {
    MyTools.router.navigateByUrl('/home')
      return
    }
    
    this.httpTestsService.GetTestById(id)
      .subscribe(data => {
        if(!data)
           MyTools.router.navigateByUrl('/home')
        this.test = data
      })
    // this.GetLabel();

  }


  FilterPredicateParent = (data: any, filter: string) => {
    return data.student.idCard.includes(filter) ||
      data.group.name.toLowerCase().includes(filter) ||
      data.sumGrade.toString().includes(filter)
  }

  /**
 * data={
 *   labels:string[],
 *   dataset:[{
 *     label:string
 *     data:number[]
 *   }]
 * }
 * 
 * 
 */

  BuildDataChart1 = (): Observable<any> => {

    let dataChart1:any = {
      labels: [''],
      datasets: [
        {
          label: 'Faild',
          data:[]
        },
        {
          label: 'Pass',
          data: []
        }
      ]
    }

    return Observable.create((obs: Subscriber<any>) => {
      this.httpGradesService.GetGradesByTest(this.activatedRoute.snapshot.params['id'])
        .subscribe(data => {
          let grades = data as Grade[];
          //get all labels name
          grades.forEach(f => {
            if (!this.namesGroups.find(r => r == f.group?.name))
              this.namesGroups.push(f.group?.name!);
          });
          dataChart1.labels = this.namesGroups


          //Get All Datasets Data
          let i = 0;
          this.namesGroups.forEach(n => {
            const fialdData = grades.filter(f => f.group?.name == n && f.sumGrade! < 100).length
            const PassData = grades.filter(f => f.group?.name == n && f.sumGrade! >= 100).length
            dataChart1.datasets[0].data.push(fialdData)
            dataChart1.datasets[1].data.push(PassData)
          });
          //  this.labels.push(f.student!.idCard + "~" + f.student?.firstName);
          //  this.grades.push(f.sumGrade!);
          obs.next(dataChart1)
          obs.complete()
        });

    })
  }
}
