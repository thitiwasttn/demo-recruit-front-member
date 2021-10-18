import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {RequestLogin} from "../../model/request-login.model";
import {ResponseLogin} from "../../model/response-login.model";
import {sha256} from "js-sha256";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginM: RequestLogin;
  responseLogin: ResponseLogin;

  constructor(private authService: AuthService, private router: Router) {
    this.loginM = new RequestLogin();
    this.responseLogin = new ResponseLogin()
  }

  ngOnInit(): void {
  }

  /*mockLogin() {
    this.loginM.email = 'test@test.com';
    this.loginM.password = '959bea296a22c07ab93e3dc62a1c61f7243c9f8aeb457fecde843b3cfbd9b45a';
    this.authService.login(this.loginM).subscribe(value => {
      this.responseLogin = value.body;
      console.log(this.responseLogin);
    })
  }*/

  login() {
    let loginTemp = new RequestLogin();
    loginTemp.email = this.loginM.email;
    loginTemp.password = sha256(this.loginM.password + environment.pwasswordSecret);


    this.authService.login(loginTemp).subscribe(value => {
      this.responseLogin = value.body;
      if (this.responseLogin.token !== undefined) {
        this.authService.setToken(this.responseLogin.token);
        this.router.navigate(['/home']);
      }
    }, error => {
      alert(error.error.message)
    })
  }
}
