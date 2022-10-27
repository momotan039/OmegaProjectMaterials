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
  imagesSlider = [
    {
      image: '../../../../assets/images-guest/sliders1.jpg',
      thumbImage: '../../../../assets/images-guest/sliders1.jpg',
    },
    {
      image: '../../../../assets/images-guest/sliders2-1.jpg',
      thumbImage: '../../../../assets/images-guest/sliders2-1.jpg',
    },
    {
      image: '../../../../assets/images-guest/sliders3-1.jpg',
      thumbImage: '../../../../assets/images-guest/sliders3-1.jpg',
    },
    {
      image: '../../../../assets/images-guest/slider4.jpg',
      thumbImage: '../../../../assets/images-guest/slider4.jpg',
    }
  ]
  
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
  domain=MyTools.domainNameServer
  constructor(
    private httpStaffService:HttpStaffService,
    public httpActivityService:HttpActivityService
  ) { }

  ngOnInit(): void {
    this.httpStaffService.GetAll().subscribe(data=>{
      this.staff=data
    })

    this.httpActivityService.GetAll().subscribe(data=>{
      this.news=data
    })
  }

}
