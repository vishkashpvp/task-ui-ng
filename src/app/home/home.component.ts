import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser;
  currentUserEmployees;

  displayedColumns: string[] = [
    'position',
    'name',
    'image',
    'mail',
    'technology',
    'mobile',
    'action',
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private employeeService: EmployeeService,
    private matDialog: MatDialog
  ) {
    this.currentUser = this.userService.getCurrentUser();
    this.currentUserEmployees = this.employeeService.getAllEmployees();
  }

  ngOnInit(): void {}

  /**
   * @summary routes to signin page
   */
  logout() {
    this.userService.clearCurrentUserDetails();
    this.localStorageService.set('isSignedIn', 'false');
    this.router
      .navigate(['account/signin'])
      .then((r) => console.log('Logged out successfully'));
  }

  editEmployee(employeeID: any) {
    this.openEmployeeDialog('edit', { _id: employeeID });
  }

  deleteEmployee(employeeID: any) {
    console.log(employeeID, 'delete clicked...');
  }

  addEmployee() {
    this.openEmployeeDialog('add', {});
  }

  openEmployeeDialog(eventName: string, data: object) {
    const employeeDialog = this.matDialog.open(DialogEmployeeComponent, {
      width: '50vw',
      data: {
        eventName,
        data,
        usermail: this.currentUser.mail,
        user_id: this.currentUser._id,
      },
      disableClose: true,
      autoFocus: false,
    });

    employeeDialog.afterClosed().subscribe((res) => {
      console.log('The dialog was closed');
      console.log(res);
    });
  }
}
