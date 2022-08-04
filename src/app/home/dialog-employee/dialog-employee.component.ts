import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private localStorageService: LocalStorageService,
    private dialogRef: MatDialogRef<DialogEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fb: FormBuilder
  ) {
    this.mat_dialog_data = data;
    this.createEmployeeForm();
  }

  ngOnInit(): void {
    console.log(this.mat_dialog_data);
  }

  createEmployeeForm() {
    this.employee_form = this.fb.group({
      employee_name: [
        'Ram',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      employee_mail: [
        'ram@ril.com',
        [Validators.required, Validators.pattern('[a-zA-z0-9\\.]*@ril\\.com$')],
      ],
      employee_mobile: [
        '1234567890',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      employee_tech: ['Node.js', Validators.required],
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

  add_emp(form: FormGroup) {
    if (!form.valid) {
      return alert('Required values are not provided');
    }
    form.value.usermail = this.mat_dialog_data.usermail;
    console.log(typeof form.value);
    console.log(form.value);
  }
}
