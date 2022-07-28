import { MyLocalStorage } from './../MyLocalStorage';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpResponseBase, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {
 headers=new HttpHeaders()
  constructor(private http:HttpClient) { }

   GetUsers():Observable<User[]>{
    return   this.http.get<User[]>("https://localhost:44327/api/Users/GetUsers/");
  }
   GetUsersByRole(role:number):Observable<User[]>{
    return  this.http.get<User[]>("https://localhost:44327/api/Users/GetUsersByRole/"+role);
  }
  async GetUsersByGroupId(id:number){
    return await this.http.get("  https://localhost:44327/api/Users/GetUsersByGroupId/"+id).toPromise();
  }
  async GetFreindsByUser(Id:number){
    return await this.http.get("https://localhost:44327/api/Users/GetFreindsByUser/"+Id).toPromise();
  }
   GetUsersNotInThisGroup(GroupId:number){
    return  this.http.get<User[]>("https://localhost:44327/api/Users/GetUsersNotInThisGroup/"+GroupId);
  }
   PostUser(user:User){
    //return await this.http.post("https://localhost:44327/api/Users/PostUser",user).toPromise();
      return this.http.post("https://localhost:44327/api/Users/PostUser",user);
  }

   DeleteUser(id:number){
    return  this.http.delete("https://localhost:44327/api/Users/DeleteUser/"+id)
}
 EditingUser(user:User){
  return this.http.put("https://localhost:44327/api/Users/EditUser",user)
}
GetUsersById(id:string){
  return  this.http.get<User>("https://localhost:44327/api/Users/GetUsersById/"+id);
}

}


