import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './../users.service';
import { Users } from './../model/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;

  zeroLoginEmailField: boolean;
  zeroLoginPasswordField: boolean;
  zeroNameField: boolean;
  zeroRegisterEmailField: boolean;
  zeroRegisterPasswordField: boolean;
  checkInvalidRegister: boolean;
  checkLoginEmail: boolean = true;
  checkLoginPassword: boolean = true;
  user = {} as Users;
  users: Users[];
  constructor(
    private fb: FormBuilder,
    private _usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validatorLogin();
    this.validatorRegister();
    this.getUser();
  }

  checkInputLogin() {
    const valueEmailLogin = this.formLogin.controls.emailLogin.value;
    const statusPasswordLogin = this.formLogin.controls.passwordLogin.status;

    valueEmailLogin === ''
      ? (this.zeroLoginEmailField = true)
      : (this.zeroLoginEmailField = false);
    statusPasswordLogin === 'INVALID'
      ? (this.zeroLoginPasswordField = true)
      : (this.zeroLoginPasswordField = false);
  }
  checkRegisterField() {
    const statusName = this.formRegister.controls.name.status;
    const registerEmailValue = this.formRegister.controls.emailCadastro.value;
    const registerPasswordStatus = this.formRegister.controls.passwordCadastro
      .status;
    statusName === 'INVALID'
      ? (this.zeroNameField = true)
      : (this.zeroNameField = false);
    registerEmailValue === undefined
      ? (this.zeroRegisterEmailField = true)
      : (this.zeroRegisterEmailField = false);
    registerPasswordStatus === 'INVALID'
      ? (this.zeroRegisterPasswordField = true)
      : (this.zeroRegisterPasswordField = false);

    this.formRegister.valid
      ? (this.checkInvalidRegister = false)
      : (this.checkInvalidRegister = true);
  }

  submitLogin() {
    this.checkInputLogin();
    this._usersService.getUser().subscribe((users: Users[]) => {
      this.users = users;
    });
    let check;
    const valueEmail = this.formLogin.controls.emailLogin.value;
    const valuePassword = this.formLogin.controls.passwordLogin.value;
    for (let i in this.users) {
      check = this.users[i];
      if (valueEmail === check.email && valuePassword === check.password) {
        this.checkLoginEmail = true;
        this.router.navigate(['list']);
      } else if (valueEmail !== '' && valuePassword !== '') {
        valueEmail !== check.email ? (this.checkLoginEmail = false) : null;
        valuePassword !== check.password
          ? (this.checkLoginPassword = false)
          : null;
      }
    }
  }
  submitRegister() {
    this.checkRegisterField();
    if (!this.checkInvalidRegister) {
      this._usersService.saveUser(this.user).subscribe(() => {
        this.cleanForm(this.formRegister);
      });
      this.router.navigate(['list']);
    }
  }

  validatorLogin() {
    this.formLogin = this.fb.group({
      emailLogin: ['', [Validators.email, Validators.required]],
      passwordLogin: ['', Validators.required],
    });
  }
  validatorRegister() {
    this.formRegister = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      emailCadastro: ['', [Validators.required, Validators.email]],
      passwordCadastro: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }
  getUser() {
    this._usersService.getUser().subscribe((users: Users[]) => {
      this.users = users;
    });
  }

  cleanForm(form) {
    this.getUser();
    form.resetForm();
    this.user = {} as Users;
  }

  get hasErrorEmailLogin() {
    const controller = this.formLogin.get('emailLogin');
    return controller.touched && controller.errors && controller.invalid;
  }

  get hasErrorPasswordLogin() {
    const controller = this.formLogin.get('passwordLogin');
    return (
      controller.touched && controller.errors && controller.errors.required
    );
  }
  get hasErrorMinName() {
    const controller = this.formRegister.get('name');
    return (
      controller.touched && controller.errors && controller.errors.minlength
    );
  }
  get hasErrorEmailCadastro() {
    const controller = this.formRegister.get('emailCadastro');
    return controller.touched && controller.errors && controller.invalid;
  }
  get hasErrorPasswordCadastro() {
    const controller = this.formRegister.get('passwordCadastro');
    return (
      controller.touched && controller.errors && controller.errors.required
    );
  }
  get hasErrorMinPasswordCadastro() {
    const controller = this.formRegister.get('passwordCadastro');
    return (
      controller.touched && controller.errors && controller.errors.minlength
    );
  }
}
