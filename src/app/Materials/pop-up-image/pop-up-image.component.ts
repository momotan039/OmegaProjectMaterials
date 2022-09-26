import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-image',
  templateUrl: './pop-up-image.component.html',
  styleUrls: ['./pop-up-image.component.css']
})
export class PopUpImageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public image:string
  ) { }

  ngOnInit(): void {
  }

}
