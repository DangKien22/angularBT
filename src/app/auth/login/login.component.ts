import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorMsg: { [key: string]: string } = {};

  constructor(private formBuilder: FormBuilder,
    private service : AuthService
    ) {}

  ngOnInit() {}

  public formData: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, this.usernameValidator]],
    password: ['', [Validators.required, this.passwordValidator]],
  });

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegex.test(control.value)) {
      return { invalidUsername: true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/;
    if (!passwordRegex.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  handleSubmit() {
    const value = this.formData.value;
    console.log({value})
    if (this.formData.valid) {
      this.service.fakeLogin({userName: value.username, password: value.password}).subscribe(
        (response) => {
          console.log({response})
          if (response.authToken) {
            console.log('Login successful:', response);
          }
          else {
            console.log('Login error:', response.error);
            this.errorMsg['common'] = response.error || 'Đăng nhập thất bại';
          }
        },
        (error) => {
          console.log('API error:', error);
        }
      )
    } else {
      Object.keys(this.formData.controls).forEach((key) => {
        const controlErrors = this.formData.get(key)?.errors;
        console.log(controlErrors)
        if (controlErrors) {
          if (controlErrors['required']) {
            this.errorMsg[key] = 'Không được để trống!';
            console.log('as', this.errorMsg)
          } else if (controlErrors['invalidUsername']) {
            this.errorMsg[key] = 'Tên đăng nhập không hợp lệ!';
          } else if (controlErrors['invalidPassword']) {
            this.errorMsg[key] = 'Mật khẩu không hợp lệ!';
          }
        }
      });
    }
  }
}
