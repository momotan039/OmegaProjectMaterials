import { MyTools } from './MyTools';


export class Menu {
  title = '';
  icon = '';
  href = '';
  roles:number[] = [];
  value?:number
  Child?:HTMLElement

    static Items: Menu[] = [
    {
      title: 'Admins',
      icon: 'verified_user',
      href: 'admins',
      roles: [1],
    },
    {
      title: 'Students',
      icon: 'school',
      href: 'students',
      roles: [1],
    },
    {
      title: 'Teachers',
      icon: 'cast_for_education',
      href: 'teachers',
      roles: [1],
    },
    {
      title: 'Courses',
      icon: 'history_edu',
      href: 'courses',
      roles: [1],
    },
    {
      title: 'Groups',
      icon: 'diversity_3',
      href: 'groups',
      roles: [1],
    },
    {
      title: 'My Groups',
      icon: 'diversity_3',
      href: 'myGroups',
      roles: [2,3],
    },
    {
      title: 'HomeWorks',
      icon: 'library_books',
      href: 'homeWorks',
      roles: [2,3],
    },
    {
      title: 'Tests',
      icon: 'quiz',
      href: 'tests',
      roles: [1,2,3],
    },
    {
      title: 'Grades',
      icon: 'grade',
      href: 'grades',
      roles: [1,2,3],
    },
    {
      title: 'Messages',
      icon: 'mail',
      href: 'messages',
      roles: [1,2,3],
    },
    {
      title: 'Logout',
      icon: 'logout',
      href: 'login',
      roles: [1,2,3],
    },
  ];

  static getItemsByUserRole(roleId:number){
  return Menu.Items.filter(i=>i.roles.find(v=>v==roleId))
  }

}
