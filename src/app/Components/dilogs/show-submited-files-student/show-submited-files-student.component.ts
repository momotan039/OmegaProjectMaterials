import { MatProgressBar } from '@angular/material/progress-bar';
import { MatListItem } from '@angular/material/list';
import { HomeWorkStudentService } from './../../../services/home-work-student.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-show-submited-files-student',
  templateUrl: './show-submited-files-student.component.html',
  styleUrls: ['./show-submited-files-student.component.css']
})
export class ShowSubmitedFilesStudentComponent implements OnInit {
  showProgressBarContainer: boolean | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA)public data:any,
    private homeWorkStudentService:HomeWorkStudentService
  ) { }

  ngOnInit(): void {
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
    //show Progress Bar
   containerProgress.classList.remove("hidden")

    this.homeWorkStudentService.DownloadFileByPath(path).subscribe(
      (data) => {
        if (data.type === HttpEventType.DownloadProgress) {
          refProgress.value=Math.round((100 * data.loaded) / data.total!);
        }
        if (data.type === HttpEventType.Response) {
          //Create link to download
          const blob = new Blob([data.body as BlobPart]);
          // saveAs(blob, hwf.name);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.href = url;
          link.download = this.getFileNameFromPath(path);
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
}
