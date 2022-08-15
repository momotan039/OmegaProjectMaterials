import { Test } from './../models/Test';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpTestsService {

constructor(
  private httpClient:HttpClient
) { }

GetTests(){
  return this.httpClient.get<Test[]>("https://localhost:44327/api/Tests/GetTests")
}

PostTest(test:Test){
  return this.httpClient.post("https://localhost:44327/api/Tests/PostTest",test,{
    responseType:"text"
  })
}

EditTest(test:Test){
  return this.httpClient.put("https://localhost:44327/api/Tests/EditTest",test,{
    responseType:"text"
  })
}

DeleteTest(id:number){
  return this.httpClient.delete("https://localhost:44327/api/Tests/DeleteTest/"+id,{
    responseType:"text"
  })
}
}
