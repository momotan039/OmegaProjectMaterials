import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.css']
})
export class TopPageComponent implements OnInit {
 @Input() title=""
  constructor() { }

  ngOnInit(): void {
  }

}
