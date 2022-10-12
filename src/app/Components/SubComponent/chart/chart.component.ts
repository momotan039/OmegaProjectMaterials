import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js'
import { Subscription, Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit,AfterViewInit {

  @ViewChild("refcontainerChart") containerChart!:ElementRef;
  constructor() { }
  
   Data:any
  @Input() IdChart=""
  @Input() Type:any
  @Input() ParentBuildData!:()=>Observable<any>
  ngAfterViewInit(): void {
   this.ParentBuildData().subscribe(data=>{
    this.Data=data
    this.RenderChart()
   })
  }

  ngOnInit(): void {
  }

  
  RenderChart(){
    const backgroundColor=[
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ]
    const borderColor=  [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ] 
    const borderWidth=4

  //Append Style to DataSetes
  this.ConfigeStyleDataSet(backgroundColor,borderColor,borderWidth)
  const fs=this.Data
  debugger
    let myChart = new Chart(this.IdChart, {
      type: this.Type,
      // data: {
      //   labels: this.Labels,
      //   datasets: [{
      //     label: this.Label,
      //     data:this.Data,
      //     backgroundColor:backgroundColor ,
      //     borderColor:borderColor,
      //     borderWidth: 3
      //   }],
      // },
      data:this.Data,
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Group',
              color: '#ff6d00',
              font: {
                weight: 'bold',
              },
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Grade',
              color: '#ff6d00',
              font: {
                weight: 'bold',
              },
            }
          }
        }
      }
    });

  }

  ConfigeStyleDataSet(backgroundColor: string[], borderColor: string[], borderWidth: number) {
   this.Data.datasets.forEach((d:any)=>{
    d.backgroundColor=backgroundColor
    d.borderColor=borderColor
    d.borderWidth=borderWidth
   })
  }

}
