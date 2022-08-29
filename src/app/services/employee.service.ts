import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee-model';
import { LocalStorageService } from './local-storage.service';
import { UserModel } from '../models/user-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * @returns employees of current user from local storage
   */
  getCurrentUserEmployees(currentUser: UserModel) {
    let employees = this.getAllEmployees();
    let currentUserEmployees = employees.filter((employee: EmployeeModel) => {
      return employee.user_mail === currentUser.mail;
    });
    this.localStorageService.set(
      'currentUserEmployees',
      JSON.stringify(currentUserEmployees)
    );
    this.localStorageService.set(
      'currentUserEmployeesCount',
      currentUserEmployees.length
    );
    return currentUserEmployees;
  }

  /**
   * @returns employees array from local storage of all users
   */
  getAllEmployees() {
    let employees = this.localStorageService.get('employees');
    return employees ? JSON.parse(employees) : [];
  }

  /**
   * @summary
   * Fetches employee object with given id of the employee
   * if exists or returns empty object.
   * @param employeeID
   * @returns employee object or empty object
   */
  getEmployee(employeeID: string) {
    let employees = this.getAllEmployees();

    let employee = employees.find((emp: any) => {
      return emp._id === employeeID;
    });

    return employee ? employee : {};
  }

  /**
   * @summary Fetches employees array from database of current user.
   * @returns http response observable
   * @param user
   */
  getUserEmployees(user: any) {
    return this.http.get('/api/employees', {
      params: {
        user_id: user._id,
      },
    });
  }

  /**
   * @summary replaces employees array with new array
   * @param employees
   */
  updateAllEmployees(employees: any) {
    this.localStorageService.set('employeesCount', String(employees.length));
    this.localStorageService.set('employees', JSON.stringify(employees));
  }

  /**
   * @summary navigate to edit employee screen.
   * @param employee
   */
  editEmployee(employee: EmployeeModel) {
    this.localStorageService.set('currentEmployee', JSON.stringify(employee));
    window.location.href = 'edit-employee.html';
    this.router.navigate(['edit-employee']).then((r) => console.log(r));
  }

  /**
   * @summary deletes employee from employees array.
   * @param {UserModel} currentUser
   * @param {EmployeeModel} employee
   */
  deleteEmployee(currentUser: UserModel, employee: EmployeeModel) {
    let all_employees = this.getAllEmployees();
    let index = all_employees.findIndex((temp_employee: EmployeeModel) => {
      return (
        temp_employee.user_mail.toLowerCase() ===
          currentUser.mail.toLowerCase() &&
        temp_employee.mail.toLowerCase() === employee.mail.toLowerCase()
      );
    });
    if (index !== -1) {
      all_employees.splice(index, 1);
      this.updateAllEmployees(all_employees);
      window.location.reload();
    }
  }
}
