import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {ResponseLogin} from "../model/response-login.model";
import {RequestLogin} from "../model/request-login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private memberApiBackend: string;
  private token: string | null;

  constructor(private http: HttpClient) {
    this.memberApiBackend = environment.memberBackend;
    this.token = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : '';

    // console.log('memberApiBackend ', this.memberApiBackend);
  }

  checkLogin(): boolean {
    return (this.token !== null && this.token !== undefined && this.token !== '');
  }

  login(requstLogin: RequestLogin): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<ResponseLogin>>(this.memberApiBackend + '/member/login', requstLogin, {observe: 'response'});
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }


}
