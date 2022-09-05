import { AuthService } from './../../../services/auth.service';
import { HomeWorkStudentService } from './../../../services/home-work-student.service';
import { HttpUsersService } from './../../../services/http-users.service';
import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { HomeWorkFile } from './../../../models/HomeWorkFile';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeWork } from 'src/app/models/HomeWork';
import { filter, Observable, Observer, BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css'],
})
export class HomeworkDetailsComponent implements OnInit {
  id = 0;
  students_behavior = new BehaviorSubject<any>({});
  students: Array<any> = [];
  submitedStudents = 0;
  homeWork = new HomeWork();
  currentStudent?: any;
  showProgressBarContainer = false;
  constructor(
    private route: ActivatedRoute,
    private homeWorkService: HomeWorkService,
    public homeWorkStudentService: HomeWorkStudentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.homeWorkService.GetHomeWorks(this.id).subscribe((data) => {
      this.homeWork = data as HomeWork;

      //if it is a student get info about submitaion homework
      if (this.authService.currentUser.roleId == 3)
        this.homeWorkStudentService
          .GetSubmitStudentByself(
            this.authService.currentUser.id!,
            this.homeWork.id
          )
          .subscribe((data) => {
            this.currentStudent = data;
          });
      //else get info about all student and submitation
      else
        this.homeWorkStudentService
          .GetSubmitedStudentsById(this.id)
          .subscribe((data) => {
            this.students_behavior.next(data);
            //get all student
            this.students = data;

            //count how much student submited this homework
            this.submitedStudents = this.students.filter(
              (f) => f.submited == 'Yes'
            ).length;
          });
    });
  }

  convertPathsToArray(path: string) {
    const last = path.charAt(path.length - 1);
    if (last == '\n') path = path.slice(0, -1);
    return path.split('\n');
  }

  getFileName(path: string) {
    return path.replace(/^.*[\\\/]/, '');
  }

  donwloadFile(path: any, isStudentFile = false) {
    let hwf = new HomeWorkFile(
      this.homeWork.id,
      this.getFileName(path),
      this.homeWork.group?.id!,
      this.homeWork.teacher?.id!
    );

    let fun: Observable<any>;

    if (!isStudentFile) fun = this.homeWorkService.DownloadHomeWorkFile(hwf);
    else
      fun = this.homeWorkStudentService.DownloadFile(
        this.getFileName(path),
        hwf.groupId,
        this.authService.currentUser.id!,
        hwf.id
      );

    fun.subscribe(
      (data) => {
        this.showProgressBarContainer = true;
        if (data.type === HttpEventType.DownloadProgress) {
          this.progress=Math.round((100 * data.loaded) / data.total!);
          console.warn(data.loaded)
        }
        if (data.type === HttpEventType.Response) {
          const blob = new Blob([data as BlobPart]);
          saveAs(blob, hwf.name);
          // const url = window.URL.createObjectURL(blob);
          // const link = document.createElement('a');
          // link.style.display = 'none';
          // document.body.appendChild(link);
          // link.href = url;
          // link.download = hwf.name;
          // link.click();
        }
      },
      (error) => {
        MyTools.Dialog.open(MessageDialogComponent, {
          data: {
            title: 'Fiald Download',
            content: 'This File Not Found',
          },
        });
      }
    );
  }
  progress?: number;
  SendStudentFiles(Files: any) {
    let files = Files as File[];

    if (files.length == 0) return;

    let fd = new FormData();
    fd.append('homeWorkId', this.homeWork.id + '');
    fd.append('groupId', this.homeWork.groupId + '');
    fd.append('studentId', this.authService.currentUser.id + '');

    for (let i = 0; i < files.length; i++) fd.append('files', files[i]);

    this.homeWorkStudentService.Submit(fd).subscribe(
      (event) => {
        this.showProgressBarContainer = true;
        {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total!);
          } else if (event.type === HttpEventType.Response) {
            MyTools.ShowResult200Message(event.body);
            //if it is a student get info about submitaion homework
            this.homeWorkStudentService
              .GetSubmitStudentByself(
                this.authService.currentUser.id!,
                this.homeWork.id
              )
              .subscribe((data) => {
                this.currentStudent = data;
              });
            //  this.showProgressBarContainer=false
          }
        }
      },
      (error) => {
        MyTools.ShowFialdMessage(error, 'Submiting Home Work');
      }
    );
  }
  CancelSubmitation() {
    let data = {
      id: this.currentStudent.homeWorkStudentId,
      groupId: this.homeWork.groupId,
    };
    this.homeWorkStudentService.DeleteSubmited(data).subscribe(
      (data) => {
        MyTools.ShowResult200Message('Cancel Submitation');
        //if it is a student get info about submitaion homework
        this.homeWorkStudentService
          .GetSubmitStudentByself(
            this.authService.currentUser.id!,
            this.homeWork.id
          )
          .subscribe((data) => {
            this.currentStudent = data;
          });
      },
      (error) => {
        MyTools.ShowFialdMessage(error, 'Cancel Submitation');
      }
    );
  }
}


