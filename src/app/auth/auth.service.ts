import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private memberApiBackend: string;
  private token: string | null;

  constructor(private http: HttpClient) {
    this.memberApiBackend = environment.memberBackend;
    this.token = (localStorage.getItem('token') !== null) ? localStorage.getItem('token') : '';

    console.log('memberApiBackend ', this.memberApiBackend);
  }

  checkLogin(): boolean {
    return (this.token !== null && this.token !== undefined && this.token !== '');
  }

  
}
