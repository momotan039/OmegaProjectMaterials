import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpResponseBase, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { MyTools } from 'src/app/constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {
 headers=new HttpHeaders()
  constructor(private http:HttpClient) { }

   GetUsers():Observable<User[]>{
    return   this.http.get<User[]>(MyTools.UrlRootApi+"/Users/GetUsers/");
  }
   GetUsersByRole(role:number):Observable<User[]>{
    return  this.http.get<User[]>(MyTools.UrlRootApi+"/Users/GetUsersByRole/"+role);
  }
   GetUsersByGroupId(id:number){
    return  this.http.get<User[]>(MyTools.UrlRootApi+"/Users/GetUsersByGroupId/"+id)
  }
  async GetFreindsByUser(Id:number){
    return await this.http.get(MyTools.UrlRootApi+"/Users/GetFreindsByUser/"+Id).toPromise();
  }
   GetUsersNotInThisGroup(GroupId:number){
    return  this.http.get<User[]>(MyTools.UrlRootApi+"/Users/GetUsersNotInThisGroup/"+GroupId);
  }
   PostUser(user:User){
    //return await this.http.post(MyTools.UrlRootApi+"/Users/PostUser",user).toPromise();
      return this.http.post(MyTools.UrlRootApi+"/Users/PostUser",user,{
        responseType:"text"
      });
  }

   DeleteUser(id:number){
    return  this.http.delete(MyTools.UrlRootApi+"/Users/DeleteUser/"+id,{
      responseType:"text"
    })
}
 EditingUser(user:User){
  return this.http.put(MyTools.UrlRootApi+"/Users/EditUser",user,{
    responseType:"text"
  })
}
GetUserById(id:string){
  return  this.http.get<User>(MyTools.UrlRootApi+"/Registration/GetUserById/"+id);
}

}


