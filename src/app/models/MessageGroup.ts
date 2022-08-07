import { User } from "./User"

export class MessageGroup {
  id?:number
  groupId?:number
  senderId?:number
  contents?:string
  isOpened=false
  SendingDate?:Date
  sender?:User
  constructor(
    groupId:number,
    senderId:number,
    content:string,
    ){
      this.groupId=groupId
      this.senderId=senderId
      this.contents=content
  }
}
