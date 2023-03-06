import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  matSnackBarConfig: MatSnackBarConfig;
  constructor(private snackBar: MatSnackBar) {
    this.matSnackBarConfig = new MatSnackBarConfig();
    this.matSnackBarConfig.panelClass = ['snackBar'];
    this.matSnackBarConfig.duration = 2000;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', this.matSnackBarConfig);
  }

}
