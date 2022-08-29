import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.css'],
})
export class DialogEmployeeComponent implements OnInit {
  mat_dialog_data;
  emp_img_url = './assets/add.png';
  technologies: string[] = ['Android', 'Angular', 'Java', 'Node.js'];
  employee_form!: FormGroup;
  currentEmployee;
  eventName;

  constructor(
    private localStorageService: LocalStorageService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<DialogEmployeeComponent>,
    private homeService: HomeService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder
  ) {
    this.mat_dialog_data = data;
    this.eventName = data.eventName;
    this.currentEmployee = employeeService.getEmployee(
      this.mat_dialog_data.data._id
    );
    this.createEmployeeForm();
  }

  ngOnInit(): void {}

  createEmployeeForm() {
    this.employee_form = this.fb.group({
      name: [
        this.eventName === 'edit' ? this.currentEmployee.name : '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      mail: [
        this.eventName === 'edit' ? this.currentEmployee.mail : '',
        [Validators.required, Validators.pattern('[a-zA-z0-9\\.]*@ril\\.com$')],
      ],
      mobile: [
        this.eventName === 'edit' ? this.currentEmployee.mobile : '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      technology: [
        this.eventName === 'edit' ? this.currentEmployee.technology : 'Node.js',
        Validators.required,
      ],
    });
  }

  closeProfileDialog() {
    this.dialogRef.close();
  }

  previewImage(imageFile: any) {
    const reader = new FileReader();
    let file = imageFile['files'][0];

    reader.addEventListener(
      'load',
      () => {
        this.emp_img_url = <string>reader.result;
        let newEmployeeImage = reader.result;
        this.localStorageService.set('tempImg', <string>newEmployeeImage);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  submitForm(form: FormGroup) {
    if (this.eventName === 'edit') {
      this.edit_emp(form);
    } else {
      this.add_emp(form);
    }
  }

  add_emp(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    form.value.usermail = this.mat_dialog_data.usermail;
    form.value.user_id = this.mat_dialog_data.user_id;

    this.homeService.addEmployee(form.value).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
        console.log(err.error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  edit_emp(form: FormGroup) {
    console.log('updating employee...');
  }
}
