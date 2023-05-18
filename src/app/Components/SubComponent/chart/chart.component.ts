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
  @Input() enablePercent: any;
  @Input() xTitle: any;
  @Input() yTitle: any;
  @Input() enableOptions = true;
   myChart?:Chart;
   id=0;
  @Input() ParentBuildData!: () => Promise<any>
  ngAfterViewInit(): void {
    this.build()
  }

  build() {
    Chart.instances[0]?.destroy()
    this.myChart?.destroy()
    this.ParentBuildData().then((data: any) => {
      // if (this.Type == "doughnut")
      //   data['indexLabel'] = "#percent%"
      //   debugger
      this.Data = data
      this.RenderChart()
    })
  }

  ngOnInit(): void {
  }
genearteIdChart(){
  ++this.id
  this.IdChart+=this.id
  return this.IdChart
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
    // this.genearteIdChart()
    const _enablePercent=this.enablePercent
    this.myChart = new Chart('ff',{
      type: this.Type,
      data: this.Data,
      options:{
        scales: {
          y: {
            ticks: {
              // Define the new y-axis labels and values
              callback: function(value:number, index:number, values:any) {
                return  _enablePercent?parseFloat((value*100)+'').toFixed(1)+'%':value;
              }
            }
          }
      }}
    });

    this.EnableOptions(this.myChart)
  }


  EnableOptions(myChart: Chart<any, any[], unknown>) {
    const _enablePercent=this.enablePercent
    myChart.config.options.plugins = {
          tooltip: {
              callbacks: {
                  label: function(context:any) {
                      let label = context.dataset.label || '';
                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += _enablePercent?context.parsed.y*100+'%':context.parsed.y
                      }
                      return label;
                  }
              }
          }
  }

  myChart.update()
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
