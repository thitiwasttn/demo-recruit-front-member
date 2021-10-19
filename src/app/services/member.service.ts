import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseLogin} from "../model/response-login.model";
import {Member} from "../model/member.model";
import {MemberProfile} from "../model/member-profile.model";
import {Job} from "../model/job.model";

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

  updateProfile(memberProfile: MemberProfile): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.post<HttpResponse<Member>>(this.memberApiBackend + '/member/profile/update', memberProfile, {
      observe: 'response',
      headers: headers
    });
  }

  saveJob(job:Job[]): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.post<HttpResponse<void>>(this.memberApiBackend + '/member/member/job', job, {
      observe: 'response',
      headers: headers
    });
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
