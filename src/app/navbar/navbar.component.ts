import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean;

  constructor(private authService: AuthService) {
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.setLoginStatus();
  }

  setLoginStatus() {
    this.isLogin = this.authService.checkLogin();
  }

}
