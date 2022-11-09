import { MatButton } from '@angular/material/button';
import { DeleteUserComponent } from './../../dilogs/delete-user/delete-user.component';
import { style } from '@angular/animations';
import { ShowSubmitedFilesStudentComponent } from './../../dilogs/show-submited-files-student/show-submited-files-student.component';
import { AuthService } from './../../../services/auth.service';
import { HomeWorkStudentService } from './../../../services/home-work-student.service';
import { HttpUsersService } from './../../../services/http-users.service';
import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { HomeWorkFile } from './../../../models/HomeWorkFile';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeWork } from 'src/app/models/HomeWork';
import { filter, Observable, Observer, BehaviorSubject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpEventType } from '@angular/common/http';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css'],
})
export class HomeworkDetailsComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  id = 0;
  students_behavior = new BehaviorSubject<any>({});
  students: Array<any> = [];
  submitedStudents = 0;
  homeWork = new HomeWork();
  currentStudent?: any;
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

  getFileNameFromPath(path: string) {
    return path.replace(/^.*[\\\/]/, '');
  }

  donwloadFile(path: any,containerProgress:HTMLElement,refProgress:MatProgressBar) {
    let hwf = new HomeWorkFile(
      this.homeWork.id,
      this.getFileNameFromPath(path),
      this.homeWork.group?.id!,
      this.homeWork.teacher?.id!
    );
      containerProgress.classList.remove("hidden")
    this.homeWorkStudentService.DownloadFileByPath(path).subscribe(
      (data) => {
        if (data.type === HttpEventType.DownloadProgress) {
          refProgress.value=Math.round((100 * data.loaded) / data.total!);
          console.warn(data.loaded)
        }
        if (data.type === HttpEventType.Response) {

          setTimeout(() => {
            refProgress.value=0
          containerProgress.classList.add("hidden")
          }, 300);
          
          const blob = new Blob([data.body as BlobPart]);
          // saveAs(blob, hwf.name);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.href = url;
          link.download = hwf.name;
          link.click();
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
  showFilesSizeErorr=false;

  SendStudentFiles(Files: any,containerProgress:HTMLElement,
    refProgress:MatProgressBar,btnCancel:MatButton) {
     
    let files = Files as File[];
    this.showFilesSizeErorr=false;
    if (files.length == 0) return;

    //Check Size of files
     if(!this.IsValidSizeFiles(files))
     {
      this.showFilesSizeErorr=true;
     return ;
     }

    let fd = new FormData();
    fd.append('homeWorkId', this.homeWork.id + '');
    fd.append('groupId', this.homeWork.groupId + '');
    fd.append('studentId', this.authService.currentUser.id + '');

    for (let i = 0; i < files.length; i++)
     fd.append('files', files[i]);

     containerProgress.classList.remove("hidden")
     btnCancel.disabled=true

    this.homeWorkStudentService.Submit(fd).subscribe(
      (event) => {
        {
          if (event.type === HttpEventType.UploadProgress) {
            refProgress.value = Math.round((100 * event.loaded) / event.total!);
          } else if (event.type === HttpEventType.Response) {
            setTimeout(() => {
              refProgress.value=0
              containerProgress.classList.add("hidden")
            }, 300);
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
          }
        }
      },
      (error) => {
        MyTools.ShowFialdMessage(error, 'Submiting Home Work');
        btnCancel.disabled=false
      }
    );
  }
  CancelSubmitation() {


    MyTools.Dialog.open(DeleteUserComponent,{
      data:{}
    })
    .afterClosed().subscribe(res=>{
        if(!res)
        return

        let data = {
          id: this.currentStudent.homeWorkStudentId,
          groupId: this.homeWork.groupId,
        };
        this.homeWorkStudentService.DeleteSubmited(data).subscribe(
          (data) => {
            MyTools.ShowResult200Message('Delete Submitation');
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
            MyTools.ShowFialdMessage(error, 'Delete Submitation');
          }
        );
    })

   
  }

  ShowViewDialogParent=()=>{
    let pathFiles=this.myTable?.selectedRow.pathFiles
    MyTools.Dialog.open(ShowSubmitedFilesStudentComponent,{
      data:pathFiles
    })
  }

  IsValidSizeFiles(files: File[]) {
    let size=0;
    for (let i = 0; i < files.length; i++)
      size+=files[i].size

    //conver it to gigabytes
    size=size/1000000000;
    return Math.floor(size)<2;
  }


}




