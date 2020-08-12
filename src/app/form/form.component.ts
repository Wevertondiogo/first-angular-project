import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../user/user';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formLogin: FormGroup;
  formCadastro: FormGroup;
  emailLogin: string = '';
  passwordLogin: string = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.login();
    this.cadastro();
  }
  onSubmit() {
    console.log('oi');
  }

  findData() {
    console.log(this.emailLogin, this.passwordLogin);
  }
  sendData() {
    console.log(this.formCadastro.value);
  }

  login() {
    this.formLogin = this.fb.group({
      emailLogin: ['', [Validators.email, Validators.required]],
      passwordLogin: ['', Validators.required],
    });
  }
  cadastro() {
    this.formCadastro = this.fb.group({
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
    const controller = this.formCadastro.get('name');
    return (
      controller.touched && controller.errors && controller.errors.minlength
    );
  }
  get hasErrorEmailCadastro() {
    const controller = this.formCadastro.get('emailCadastro');
    return controller.touched && controller.errors && controller.invalid;
  }
  get hasErrorPasswordCadastro() {
    const controller = this.formCadastro.get('passwordCadastro');
    return (
      controller.touched && controller.errors && controller.errors.required
    );
  }
  get hasErrorMinPasswordCadastro() {
    const controller = this.formCadastro.get('passwordCadastro');
    return (
      controller.touched && controller.errors && controller.errors.minlength
    );
  }
}
