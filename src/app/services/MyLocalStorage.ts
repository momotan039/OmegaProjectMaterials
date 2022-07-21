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
}
