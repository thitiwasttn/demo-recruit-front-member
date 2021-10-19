import {Component, OnInit} from '@angular/core';
import {RegisterVM} from "../../model/register-vm.model";
import {AuthService} from "../auth.service";
import {RequestLogin} from "../../model/request-login.model";
import {ResponseLogin} from "../../model/response-login.model";
import {Router} from "@angular/router";
import {sha256} from "js-sha256";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: RegisterVM;
  responseLogin: ResponseLogin;

  constructor(private authenService: AuthService, private router: Router) {
    this.register = new RegisterVM();
    this.responseLogin = new ResponseLogin();
  }

  ngOnInit(): void {
  }

  regis() {
    if (this.register.password !== this.register.confirmPassword) {
      alert('password not match')
      return;
    }
    this.authenService.regis(this.register).subscribe(value => {
      let requestLogin = new RequestLogin();
      requestLogin.email = this.register.email;
      requestLogin.password =  sha256(this.register.password + environment.pwasswordSecret);
      this.authenService.login(requestLogin).subscribe(value1 => {
        this.responseLogin = value1.body;
        if (this.responseLogin.token !== undefined) {
          this.authenService.setToken(this.responseLogin.token);
          this.authenService.isLogin = true;
          this.router.navigate(['/home']);
        }
      }, error => {
        alert(error.error.message)
      })
    }, error => {
      alert(error.error.message)
    })
  }
}
