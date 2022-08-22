import { Test } from './../models/Test';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpTestsService {

constructor(
  private httpClient:HttpClient
) { }

GetTests(){
  return this.httpClient.get<Test[]>(MyTools.UrlRootApi+"/Tests/GetTests")
}

PostTest(test:Test){
  return this.httpClient.post(MyTools.UrlRootApi+"/Tests/PostTest",test,{
    responseType:"text"
  })
}

EditTest(test:Test){
  return this.httpClient.put(MyTools.UrlRootApi+"/Tests/EditTest",test,{
    responseType:"text"
  })
}

DeleteTest(id:number){
  return this.httpClient.delete(MyTools.UrlRootApi+"/Tests/DeleteTest/"+id,{
    responseType:"text"
  })
}
}
