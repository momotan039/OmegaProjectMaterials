import { Observable } from 'rxjs';
import { Message } from './../models/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMessagesService {

constructor(private http:HttpClient) { }

SendMessageToFreind(msg:Message){
return this.http.post("https://localhost:44327/api/Messages/SendMessage",msg)
}
GetMessagesByReciver(idReciver:number){
  return this.http.get<Message[]>('https://localhost:44327/api/Messages/GetMessagesByReciver/'+idReciver)
}

}
