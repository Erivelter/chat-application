import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  exports: [ MatToolbarModule, MatDialogModule, MatButtonModule, MatIconModule,  MatInputModule, MatSnackBarModule, MatDialogModule],

})
export class AppMaterialModule { }
