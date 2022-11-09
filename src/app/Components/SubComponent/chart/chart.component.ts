import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { Subscription, Observable } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("refcontainerChart") containerChart!: ElementRef;

  constructor() { }
  ngOnDestroy(): void {
  }

  Data: any
  @Input() IdChart = ""
  @Input() Type: any
  @Input() Title: any
  @Input() enablePercent:any;
  @Input() xTitle: any;
  @Input() yTitle: any;
  @Input() enableOptions = true;

  @Input() ParentBuildData!: () => Promise<any>
  ngAfterViewInit(): void {
    this.ParentBuildData().then((data: any) => {
      this.Data = data
      this.RenderChart()
    })
  }

  ngOnInit(): void {
  }


  RenderChart() {
    const backgroundColor: any = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ]
    const borderColor: any = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ]
    const borderWidth = 4
    //Append Style to DataSetes
    this.ConfigeStyleDataSet(backgroundColor, borderColor, borderWidth)
    let myChart = new Chart(this.IdChart, {
      type: this.Type,
      data: this.Data,
    });
    debugger
    if (this.enableOptions)
      this.EnableOptions(myChart)
  }
  EnableOptions(myChart: Chart<any, any[], unknown>) {
    myChart.config.options = {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: this.xTitle,
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
            text: this.yTitle,
            color: '#ff6d00',
            font: {
              weight: 'bold',
            },
          },
          ticks: this.enablePercent ? {
            callback: function (value: any) {
              return value + "%"
            },
          } : {},
        }
      }
      // if(this.enablePercent)
      // myChart.config.options.scales.y.ticks['format']['style']='percent'
    }
  }

  ConfigeStyleDataSet(backgroundColor: string[], borderColor: string[], borderWidth: number) {
    this.Data.datasets.forEach((d: any) => {
      d.backgroundColor = backgroundColor
      d.borderColor = borderColor
      d.borderWidth = borderWidth
      //fill mode
      d.fill = true
      //activate animations
      d.animations = {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      }
    })
  }

}
