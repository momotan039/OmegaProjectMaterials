import { User } from './User';
import { Group } from './Group';
export class HomeWork {
  id=0
  title=""
  contents=""
  groupId=0
  teacherId=0
  filesPath=""
  requiredSubmit=false
  sendingDate?:Date
  group?:Group
  teacher?:User
}
