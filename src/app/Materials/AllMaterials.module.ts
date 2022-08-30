import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import {MatRadioModule} from '@angular/material/radio';

const materials=[
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatRadioModule,
  NgxMatSelectSearchModule
]
@NgModule({
  imports:[materials],
  exports:[materials]
})

export class AllMaterialsModule{

}
