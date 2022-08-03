import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * @summary Displays success snackbar at top left of screen with the message
   * @param {string} message
   */
  openSuccessSnackbar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: environment.HOME_SNACKBAR,
    });
  }

  /**
   * @summary Displays failed snackbar at top left of screen with the message
   * @param {string} message
   */
  openFailSnackbar(message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'start',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: environment.HOME_SNACKBAR_FAIL,
    });
  }
}
