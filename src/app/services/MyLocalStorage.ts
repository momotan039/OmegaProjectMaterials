import { JwtHelperService } from "@auth0/angular-jwt";

export class MyLocalStorage {
  static GetToken(){
    return localStorage.getItem("token")
  }
  static SetToken(tk:string){
    localStorage.setItem("token",tk)
  }
  static RemoveToken(){
    localStorage.removeItem("token");
  }
  static IsExpiredToken(){
    let token=MyLocalStorage.GetToken()?.replace("Bearer","")
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token)
  }

}
