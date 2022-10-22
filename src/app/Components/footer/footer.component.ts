import { Component, OnInit } from '@angular/core';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faWhatsapp = faWhatsapp;
  configuration_Site={
    'facebookPage':"https://www.facebook.com/OmegaAca/",
    'WhatsAppPhone':"025326484",
    'mail':'info@omega-academy.net'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
