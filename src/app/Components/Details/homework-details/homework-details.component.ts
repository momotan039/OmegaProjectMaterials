import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { MyTools } from './../../../constants/MyTools';
import { Group } from './../../../models/Group';
import { HomeWorkFile } from './../../../models/HomeWorkFile';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomeWork } from 'src/app/models/HomeWork';
import { Observable, Observer } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css']
})
export class HomeworkDetailsComponent implements OnInit {
  id=0
  base64Image: string | undefined;
  homeWork=new HomeWork()
  constructor(
    private route:ActivatedRoute,
    private homeWorkService:HomeWorkService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.homeWorkService.GetHomeWorks(this.id).subscribe(data=>{
      this.homeWork=data as HomeWork
      let path=this.convertPathsToArray(this.homeWork.filesPath)[0]
      console.warn(path)
      console.warn(this.getFileName(path))
    })

  }

  convertPathsToArray(path:string){
    const last=path.charAt(path.length - 1);
    if(last=='\n')
    path=path.slice(0,-1)
  return path.split('\n')
  }

  getFileName(path:string){
    return  path.replace(/^.*[\\\/]/, '');
  }
  GoTo(path:any){
    window.open(path)
  }

  donwloadFile(path:any){
    let hwf=new HomeWorkFile(
      this.getFileName(path),
      this.homeWork.group?.id!,
      this.homeWork.teacher?.id!
      )
      this.homeWorkService.DownloadHomeWorkFile(hwf)
      .subscribe(data => {
          const blob = new Blob([data as BlobPart]);
          const url= window.URL.createObjectURL(blob);

          const link = document.createElement( 'a' );
          link.style.display = 'none';
          document.body.appendChild( link );
          link.href=url
          link.download=hwf.name
          link.click()
      },(error)=>{
       MyTools.Dialog.open(MessageDialogComponent
        ,{
          data:{
            "title":"Fiald Download",
            "content":"This File Not Found"
          }
        })
      })
  }
  downloadImage(imageUrl:SafeUrl) {

    this.getBase64ImageFromURL(imageUrl).subscribe((base64data: string) => {
      console.log(base64data);
      this.base64Image = 'data:image/jpg;base64,' + base64data;
      // save image to disk
      var link = document.createElement('a');

      document.body.appendChild(link); // for Firefox

      link.setAttribute('href', this.base64Image);
      link.setAttribute('download', 'mrHankey.jpg');
      link.click();
    });
  }

  getBase64ImageFromURL(url: any) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

}

