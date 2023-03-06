import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SnackBarService} from '../../services/snack-bar.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthResponseMessage, Client, Role} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Shop} from '../../models/shop.model';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public authForm: FormGroup;
  public clientForm: FormGroup;
  public shopForm: FormGroup;
  public selectedRole: Role = 'ROLE_CLIENT';
  public roles = [{value: 'ROLE_CLIENT', viewValue: 'Клиент'}, {value: 'ROLE_SHOP', viewValue: 'Магазин'}];
  public hide = true;
  public isAuthenticationError = false;
  public isLoginAlreadyExists = false;
  public isLoginPage = true;
  public errorMessage: string;
  public matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private snackBarService: SnackBarService) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      login: ['', {validators: [Validators.required]}],
      password: ['', {validators: [Validators.required]}],
    });
    this.shopForm = this.formBuilder.group({
      name: ['', {validators: [Validators.required]}],
    });
    this.clientForm = this.formBuilder.group({
      firstName: ['', {validators: [Validators.required]}],
      lastName: ['', {validators: [Validators.required]}],
    });
  }

  authenticate(): void {
    this.isAuthenticationError = false;
    this.isLoginAlreadyExists = false;
    const user: Client = {
      login: this.authForm.get('login').value.trim(),
      password: this.authForm.get('password').value.trim()
    };
    this.authService.logIn(user).subscribe((data: AuthResponseMessage) => {
      console.log('go to main');
      localStorage.setItem('beauty.access.token', data.accessToken as string);
      localStorage.setItem('beauty.user.role', data.roles[0] as string);
      localStorage.setItem('beauty.user.id', data.id.toString());
      localStorage.setItem('beauty.user.login', data.login.toString());
      this.router.navigateByUrl('main');
    }, (error) => {
      this.isAuthenticationError = true;
      this.errorHandler(error);
      console.log('Невозможно осуществить вход');
    });
  }

  goToRegistration(): void {
    this.isLoginPage = false;
  }

  registration(): void {
    if (this.selectedRole === 'ROLE_CLIENT') {
      const client: Client = {
        login: this.authForm.get('login').value.trim(),
        password: this.authForm.get('password').value.trim(),
        firstName: this.clientForm.get('firstName').value.trim(),
        lastName: this.clientForm.get('lastName').value.trim(),
      };
      this.authService.registerClient(client).subscribe(() => {
          this.errorMessage = '';
          this.authenticate();
        }, (err: HttpErrorResponse) => {
          this.errorHandler(err);
        }
      );
    } else {
      const shop: Shop = {
        login: this.authForm.get('login').value.trim(),
        password: this.authForm.get('password').value.trim(),
        name: this.shopForm.get('name').value.trim(),
      };
      this.authService.registerShop(shop).subscribe(() => {
          this.errorMessage = '';
          this.authenticate();
        }, (err: HttpErrorResponse) => {
          this.errorHandler(err);
        }
      );
    }
  }

  public errorHandler(err: HttpErrorResponse): void {
    switch (err.status) {
      case 0:
        this.snackBarService.openSnackBar('Невозможно подключиться к серверу');
        break;
      case 400:
        this.isLoginAlreadyExists = true;
        break;
      default:
        this.snackBarService.openSnackBar('Неизвестная ошибка ' + err.status);
    }
  }

  goToLogIn(): void {
    this.isLoginPage = true;
  }

}

// Error when invalid control is dirty or touched
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && !control.valid && (control.dirty || control.touched));
  }
}
