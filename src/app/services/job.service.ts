import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Member} from "../model/member.model";
import {Job} from "../model/job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private memberApiBackend: string
  private token: string | null;

  constructor(private http: HttpClient) {
    this.memberApiBackend = environment.memberBackend;
    this.token = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : '';
  }

  getJobs(): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return this.http.get<HttpResponse<Job[]>>(this.memberApiBackend + '/jobs/getAll', {
      observe: 'response',
      headers: headers
    });
  }
}
