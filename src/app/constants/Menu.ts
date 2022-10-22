import { MyTools } from './MyTools';


export class Menu {
  title = '';
  icon? = '';
  href = '';
  roles?:number[] = [];
  value?:number
  Child?:HTMLElement
  forGuest?:boolean
  childs?:Array<any>

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
    {
      title: 'الرئيسية',
      href: 'main',
      forGuest:true
    },
    {
      title: 'من نحن',
      href: 'about-us',
      forGuest:true
    },
    {
      title: 'اخبارنا ونشاطاتنا',
      href: 'news',
      forGuest:true
    },
    {
      title: 'دوراتنا',
      href: '#',
      forGuest:true,
      childs:[
        {
          'name':'دورات البسيخومتري',
          'link':'/our-courses/دورات البسيخومتري'
        }
        ,
        {
          'name':'أوميغا جولد – السنة التحضيرية',
          'link':'/our-courses/أوميغا جولد – السنة التحضيرية'
        }
        ,
        {
          'name': 'دورات اللغة العبرية',
          'link':'/main',
          childs:[{
            'name':'دورة اللغة العبرية – مستوى רמה א',
            'link':'/our-courses/دورة اللغة العبرية – مستوى רמה א',
          }
          ,
          {
            'name':'دورة اللغة العبرية – مستوى רמה ב',
            'link':'/our-courses/دورة اللغة العبرية – مستوى רמה ב',
          }
          ,
          {
            'name':'دورة اللغة العبرية – مستوى רמה ג',
            'link':'/our-courses/دورة اللغة العبرية – مستوى רמה ג',
          }
          ,
          {
            'name':'دورة اللغة العبرية – مستوى רמה ד',
            'link':'/our-courses/دورة اللغة العبرية – مستوى רמה ד',
          }
          ,
          {
            'name':'إمتحان مستوى اللغة العبرية',
            'link':'https://docs.google.com/forms/d/e/1FAIpQLSdCwOPeLJFbZi3aDUp5bDwG-PIVE5QzTvhpjTMevA3I7XIE7Q/viewform',
            'external':true
          }]
        }
        
      ]
    },
    {
      title: 'الطاقم الأكاديمي',
      href: 'our-staff',
      forGuest:true
    },
   
    {
      title: 'اتصل بنا',
      href: 'contact-us',
      forGuest:true
    },
  ];

  static getItemsByUserRole(roleId:number){
  return Menu.Items.filter(i=>!i.forGuest&& i.roles!.find(v=>v==roleId))
  }

  static getGuestItem(){
    return Menu.Items.filter(i=>i.forGuest)
    }
}
