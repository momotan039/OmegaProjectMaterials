import { HttpAcountService } from 'src/app/services/http-acount.service';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpActivityService } from 'src/app/services/http-activity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-activities',
  templateUrl: './news-activities.component.html',
  styleUrls: ['./news-activities.component.css']
})
export class NewsActivitiesComponent implements OnInit {
  news:any
  new:any
  id=""
  constructor(
    private httpActivityService:HttpActivityService,
    private route:ActivatedRoute,
  ) { }
domain=MyTools.domainNameServer
  ngOnInit(): void {
     this.id=this.route.snapshot.paramMap.get("id")!
    if(!this.id)
    this.httpActivityService.GetAll().subscribe(data=>{
      this.news=data
    })
    else
    this.httpActivityService.GetOne(this.id!).subscribe(data=>{
      this.new=data
      console.warn(this.new)
    })
  }

}
