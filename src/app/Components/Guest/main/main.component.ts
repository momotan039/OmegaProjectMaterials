import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

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


  staff: Array<{
    'name': string,
    'work': string,
    'img': string,
    'about': string
  }> = [
      {
        'name': 'خالد سلهب – חאלד סלהב',
        'work': 'مدير معهد أوميغا',
        'img': '../../../../assets/images-guest/staff1.jpg',
        'about': 'معلم للغة العبرية كلغة ثانية، طالب في قسم الماجستير بتخصص اللغة العبرية في الجامعة العبرية وحاصل على شهادة لتعليم اللغة العبرية من مدرسة روثبيرغ في الجامعة العبرية ويعلم اللغة العبرية منذ عام 2012 في الجامعة العبرية وفي معهد أوميغا.'
      },
      {
        'name': 'גפן יעקובוביץ – جيفن يعكوفوفيتش',
        'work': 'أستاذة لغة عبرية',
        'img': '../../../../assets/images-guest/staff2.jpg',
        'about': 'شهادة تدريس اللغة العبرية من كلية دافيد يالين – خبرة 4 سنوات'
      },
      {
        'name': 'מנדי ציבין – مندي تسيفين',
        'work': 'أستاذ لغة عبرية',
        'img': '../../../../assets/images-guest/staff3.jpg',
        'about': 'خبرة 4 سنوات في تعلم اللغة العبرية كلغة ثانية'
      },
      {
        'name': 'أنيا طفطاروف – אניה טפטרוב',
        'work': 'أستاذة لغة عبرية',
        'img': '../../../../assets/images-guest/staff4.jpg',
        'about': 'شهادة تدريس اللغة العبرية من الجامعة العبرية و خبرة سنتين في تعليم العبرية'
      },
      {
        'name': 'אלעד בן הרוש العاد بن هاروش',
        'work': 'أستاذ لغة عبرية',
        'img': '../../../../assets/images-guest/staff5.jpg',
        'about': 'شهادة تدريس اللغة العبرية من الجامعة العبرية و خبرة 5 سنوات في تعليم العبرية'
      }
      ,
      {
        'name': 'איילת כפיר – اييلت كفير',
        'work': 'أستاذ لغة عبرية',
        'img': '../../../../assets/images-guest/staff6.jpg',
        'about': 'خبرة 8 سنوات في تعلم اللغة العبرية كلغة ثانية'
      }
    ]
  constructor() { }

  ngOnInit(): void {
    
  }

}
