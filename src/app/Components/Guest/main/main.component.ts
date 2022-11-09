import { HttpTopSliderService } from './../../../services/http-top-slider.service';
import { HttpOpinionsService } from './../../../services/http-opinions.service';
import { MyTools } from 'src/app/constants/MyTools';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpStaffService } from 'src/app/services/http-staff.service';
import { HttpActivityService } from 'src/app/services/http-activity.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', '../main-style-guest.css']
})
export class MainComponent implements OnInit {
  
   options: OwlOptions ={
    autoplay:true,
    loop:true,
    autoplayHoverPause:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['الخلف', 'التالي'],
    rtl:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

   options2: OwlOptions ={
    fluidSpeed:true,
    autoplay:true,
    loop:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    rtl:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  
  }
  staff: any
  news:any
  imagesSlider:any
  opinions:Array<any>=[]
  domain=MyTools.domainNameServer
  constructor(
    private httpStaffService:HttpStaffService,
    public httpActivityService:HttpActivityService,
    public httpTopSliderService:HttpTopSliderService,
    public httpOpinionsService:HttpOpinionsService,
  ) { }

  ngOnInit(): void {
    this.httpStaffService.GetAll().subscribe(data=>this.staff=data)
    this.httpActivityService.GetAll().subscribe(data=>this.news=data)
    this.httpOpinionsService.GetAll().subscribe(data=>this.opinions=data)
    
    this.httpTopSliderService.GetAll().subscribe(data=>{
     this.imagesSlider= data.map((item:any)=>{
          return {
            'order':item.order,
            'thumbImage':this.domain+item.thumbImage,
            'title':item.title
          }
      })
    })
  }

}
