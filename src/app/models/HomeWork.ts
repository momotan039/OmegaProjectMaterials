import { User } from './User';
import { Group } from './Group';
export class HomeWork {
  id=0
  title=""
  contents=""
  groupID=0
  teacherID=0
  filesPath=""
  sendingDate?:Date
  group?:Group
  teacher?:User
}
