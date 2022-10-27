import { MyTools } from 'src/app/constants/MyTools';
import { HttpActivityService } from 'src/app/services/http-activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-activities',
  templateUrl: './news-activities.component.html',
  styleUrls: ['./news-activities.component.css']
})
export class NewsActivitiesComponent implements OnInit {
  news:any
  constructor(
    private httpActivityService:HttpActivityService
  ) { }
domain=MyTools.domainNameServer
  ngOnInit(): void {
    this.httpActivityService.GetAll().subscribe(data=>{
      this.news=data
    })
  }

}
