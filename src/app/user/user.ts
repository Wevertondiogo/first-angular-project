export class User {
  constructor(
    name: string,
    emailLogin: string,
    passwordLogin: string,
    emailCadastro: string,
    passwordCadastro: string
  ) {
    this.emailLogin = emailLogin;
    this.passwordLogin = passwordLogin;
    this.name = name;
    this.emailCadastro = emailCadastro;
    this.passwordCadastro = passwordCadastro;
  }
  name: string;
  emailLogin: string;
  passwordLogin: string;
  emailCadastro: string;
  passwordCadastro: string;
}
