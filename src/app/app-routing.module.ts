import { UserAttendanceComponent } from './Components/user-attendance/user-attendance.component';
import { AttendanceComponent } from './Components/attendance/attendance.component';
import { StaffComponent } from './Components/admin/staff/staff.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { OmegaGoldComponent } from './Components/Guest/our-courses/omega-gold/omega-gold.component';
import { PsychometryComponent } from './Components/Guest/our-courses/psychometry/psychometry.component';
import { HebrewAComponent } from './Components/Guest/our-courses/hebrew-a/hebrew-a.component';
import { OurCoursesComponent } from './Components/Guest/our-courses/our-courses.component';
import { OurStaffComponent } from './Components/Guest/our-staff/our-staff.component';
import { NewsActivitiesComponent } from './Components/Guest/news-activities/news-activities.component';
import { ContactUsComponent } from './Components/Guest/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/Guest/about-us/about-us.component';
import { SelectWithSearchComponent } from './Components/select-with-search/select-with-search.component';
import { TestDetailsComponent } from './Components/Details/test-details/test-details.component';
import { ResetPasswordDialogComponent } from './Components/Account/reset-password-dialog/reset-password-dialog.component';
import { TestsComponent } from './Components/tests/tests.component';
import { GradesComponent } from './Components/grades/grades.component';
import { HomeworkDetailsComponent } from './Components/Details/homework-details/homework-details.component';
import { MyGroupsComponent } from './Components/my-groups/my-groups.component';
import { CourseDetailsComponent } from './Components/Details/course-details/course-details.component';
import { GroupsDetailsComponent } from './Components/Details/groups-details/groups-details.component';
import { UserDetailsComponent } from './Components/Details/user-details/user-details.component';
import { HomeworksComponent } from './Components/homeworks/homeworks.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { TeachersComponent } from './Components/admin/teachers/teachers.component';
import { StudentsComponent } from './Components/admin/students/students.component';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { GroupsComponent } from './Components/admin/groups/groups.component';
import { AdminsComponent } from './Components/admin/admins/admins.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { CoursesComponent } from './Components/admin/courses/courses.component';
import { ConfirmRegistrationComponent } from './Components/Account/confirm-registration/confirm-registration.component';
import { MainComponent } from './Components/Guest/main/main.component';
import { HebrewBComponent } from './Components/Guest/our-courses/hebrew-b/hebrew-b.component';
import { HebrewCComponent } from './Components/Guest/our-courses/hebrew-c/hebrew-c.component';
import { HebrewDComponent } from './Components/Guest/our-courses/hebrew-d/hebrew-d.component';
import { InquiriesComponent } from './Components/admin/inquiries/inquiries.component';
import { ActivitiesComponent } from './Components/admin/activities/activities.component';

const routes: Routes = [
  {
    component: AdminsComponent,
    path: 'admins',
    canActivate: [AuthGuardService],
  },
  {
    component: StudentsComponent,
    path: 'students',
    canActivate: [AuthGuardService],
  },
  
  {
    component: TeachersComponent,
    path: 'teachers',
    canActivate: [AuthGuardService],
  },
  {
    component: CoursesComponent,
    path: 'courses',
    canActivate: [AuthGuardService],
  },
  {
    component: GroupsComponent,
    path: 'groups',
    canActivate: [AuthGuardService],
  },
  {
    component: MyGroupsComponent,
    path: 'myGroups',
    canActivate: [AuthGuardService],
  },
  {
    component: MessagesComponent,
    path: 'messages',
    canActivate: [AuthGuardService],
  },
  {
    component: HomeworksComponent,
    path: 'homeWorks',
    canActivate: [AuthGuardService],
  },
  {
    component: GradesComponent,
    path: 'grades',
    canActivate: [AuthGuardService],
  },
  {
    component: TestsComponent,
    path: 'tests',
    canActivate: [AuthGuardService],
  },
  {
    component: StaffComponent,
    path: 'staff',
    canActivate: [AuthGuardService],
  },
  {
    component: InquiriesComponent,
    path: 'inquiries',
    canActivate: [AuthGuardService],
  },
  {
    component: ActivitiesComponent,
    path: 'activites',
    canActivate: [AuthGuardService],
  },

  {
    component: AttendanceComponent,
    path: 'attendance',
    canActivate: [AuthGuardService],
  },
  {
    component: AttendanceComponent,
    path: 'attendance/:groupId',
    canActivate: [AuthGuardService],
  },
  {
    component: AttendanceComponent,
    path: 'attendance/:groupId/:date',
    canActivate: [AuthGuardService],
  },

  {
    component: UserAttendanceComponent,
    path: 'userAttendance',
    canActivate: [AuthGuardService],
  },
  {
    component: UserAttendanceComponent,
    path: 'userAttendance/:groupId',
    canActivate: [AuthGuardService],
  },
  {
    component: UserAttendanceComponent,
    path: 'userAttendance/:groupId/:date',
    canActivate: [AuthGuardService],
  },

  {
    component: ConfirmRegistrationComponent,
    path: 'ConfirmRegistration/:id',
  },

  {
    component: ResetPasswordDialogComponent,
    path: 'ResetPassword/:token',
  },
  {
    component: UserDetailsComponent,
    path: 'userDetails/:id',
    canActivate: [AuthGuardService],
  },
  {
    component: GroupsDetailsComponent,
    path: 'groupDetails/:id',
    canActivate: [AuthGuardService],
  },
  {
    component: CourseDetailsComponent,
    path: 'courseDetails/:id',
    canActivate: [AuthGuardService],
  },
  {
    component: HomeworkDetailsComponent,
    path: 'HomeWorkDetails/:id',
    canActivate: [AuthGuardService],
  },
  
  {
    component: TestDetailsComponent,
    path: 'testDetails/:id',
    canActivate: [AuthGuardService],
  },
  { component: LogInComponent, path: 'login' },
  { component: HomeComponent, path: 'home', canActivate: [AuthGuardService] },
  
  //Start with Guest Pages
  { component: MainComponent, path: 'main'},
  { component: AboutUsComponent, path: 'about-us'},
  { component: ContactUsComponent, path: 'contact-us'},
  { component: NewsActivitiesComponent, path: 'news'},
  { component: OurStaffComponent, path: 'our-staff'},

  // { component: OurCoursesComponent, path: 'our-courses/:string'},
  { component: PsychometryComponent, path: 'our-courses/دورات البسيخومتري'},
  { component: OmegaGoldComponent, path: 'our-courses/أوميغا جولد – السنة التحضيرية'},
  { component: HebrewAComponent, path: 'our-courses/دورة اللغة العبرية – مستوى רמה א'},
  { component: HebrewBComponent, path: 'our-courses/دورة اللغة العبرية – مستوى רמה ב'},
  { component: HebrewCComponent, path: 'our-courses/دورة اللغة العبرية – مستوى רמה ג'},
  { component: HebrewDComponent, path: 'our-courses/دورة اللغة العبرية – مستوى רמה ד'},

  // End Guest Pages 
  //make home compnent the main page
  {
    pathMatch:"full",
    component: NotFoundPageComponent,
    path: '**',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
