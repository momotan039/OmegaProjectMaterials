import { TestDetailsComponent } from './Components/Details/test-details/test-details.component';
import { TestComponent } from './test/test.component';
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
    component: ConfirmRegistrationComponent,
    path: 'ConfirmRegistration/:id',
  },

  {
    component: ResetPasswordDialogComponent,
    path: 'ResetPassword',
  },
  {
    component: TestComponent,
    path: 'test',
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
  {
    pathMatch:"full",
    component: HomeComponent,
    path: '**',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
