import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-guest-footer',
  templateUrl: './guest-footer.component.html',
  styleUrls: ['./guest-footer.component.css']
})
export class GuestFooterComponent implements OnInit {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  configuration_Site={
   'facebookPage':"https://www.facebook.com/OmegaAca/",
   'instaPage':"https://www.instagram.com/omega.academy/",
   'WhatsAppPhone':"025326484",
   'mail':'info@omega-academy.net'
 }
  constructor() { }

  ngOnInit(): void {
  }

}
