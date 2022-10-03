import { MessageGroup } from './../models/MessageGroup';
import { Observable } from 'rxjs';
import { Message } from './../models/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpMessagesService {

  
  

constructor(private http:HttpClient) { }

SendMessageToFreind(msg:Message){
return this.http.post(MyTools.UrlRootApi+"/Messages/SendMessage",msg)
}

GetMessagesByReciver(idReciver:number,current_messages_count:number){
  return this.http.get('https://localhost:44327/api/Messages/GetMessagesByReciver/'+idReciver+'/'+current_messages_count,{
    observe:"events",
    reportProgress:true,
  })
}
GetPreviousMessages(idReciver:number,current_messages_count:number) {
  return this.http.get<any>('https://localhost:44327/api/Messages/GetPreviousMessages/'
  +idReciver+'/'+current_messages_count,{
    observe:"events",
    reportProgress:true,
  })
}

GetPreviousMessagesGroup(idReciver:number,current_messages_count:number) {
  return this.http.get<any>('https://localhost:44327/api/GroupMessages/GetPreviousMessages/'
  +idReciver+'/'+current_messages_count,{
    observe:"events",
    reportProgress:true,
  })
}


GetAllUnreadMessages(){
  return this.http.get<any[]>('https://localhost:44327/api/Messages/GetAllUnreadMessages/')
}

GetUnreadMessages(senderId:number){
  return this.http.get<Message[]>('https://localhost:44327/api/Messages/GetUnreadMessages/'+senderId)
}

DeleteMessage(id:number){
  return this.http.delete('https://localhost:44327/api/Messages/DeleteMessage/'+id)
}
ReadMessage(id:number){
  return this.http.get('https://localhost:44327/api/Messages/ReadMessage/'+id)
}

ReadGroupMessage(idMsg: number, idSeer: number | undefined) {
  return this.http.get(`https://localhost:44327/api/GroupMessages/ReadMessage/${idMsg}/${idSeer}`)
}

SendGroupMessage(msg:MessageGroup){
  return this.http.post(MyTools.UrlRootApi+"/GroupMessages/SendMessage",msg)
  }
  GetGroupMessagesByReciver(idReciver:number,current_messages:number){
    return this.http.get('https://localhost:44327/api/GroupMessages/GetMessagesByReciver/'+idReciver+'/'+current_messages,{
      reportProgress:true,
      observe:"events"
    })
  }

  DeleteGroupMessage(id:number){
    return this.http.delete('https://localhost:44327/api/GroupMessages/DeleteMessage/'+id)
  }

}
