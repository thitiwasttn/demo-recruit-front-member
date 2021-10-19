import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseLogin} from "../model/response-login.model";
import {Member} from "../model/member.model";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private memberApiBackend: string
  private token: string | null;

  constructor(private http: HttpClient) {
    this.memberApiBackend = environment.memberBackend;
    this.token = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : '';
  }

  getInfo(): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.get<HttpResponse<Member>>(this.memberApiBackend + '/member/getSelf', {
      observe: 'response',
      headers: headers
    });
  }
}
