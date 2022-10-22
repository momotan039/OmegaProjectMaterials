import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from './../../../constants/Menu';
import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-guest-header',
  templateUrl: './guest-header.component.html',
  styleUrls: ['./guest-header.component.css']
})
export class GuestHeaderComponent implements OnInit {
   faFacebook = faFacebook;
   faInstagram = faInstagram;
   configuration_Site={
    'facebookPage':"https://www.facebook.com/OmegaAca/",
    'instaPage':"https://www.instagram.com/omega.academy/",
    'WhatsAppPhone':"025326484",
    'mail':'info@omega-academy.net'
  }
  constructor(
    private router:ActivatedRoute,
  ) { }
 menuItems:Menu[]=[];
  ngOnInit(): void {
    this.menuItems=Menu.getGuestItem()
  }
}
