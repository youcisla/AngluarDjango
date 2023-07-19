import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { MyUser } from 'src/app/Model/MyUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = "http://127.0.0.1:8000"

  optionRequete = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }), responseType: 'text' as 'json'
  }

  public user: Observable<string>
  public userSubject: BehaviorSubject<string>

  constructor(
    private http: HttpClient,
    private router : Router
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') || '');
    this.user = this.userSubject.asObservable();
  }

  getUserInfo() {
    return this.http.get<MyUser>(`${this.API_URL}/me`)
  }
  

  login(username: string, password: string) {
    return this.http.post(`${this.API_URL}/login`, { username: username, password: password }, this.optionRequete);
  }
  Register(username: string, password: string, email: string) {
    return this.http.post(`${this.API_URL}/SingUp`, { username: username, password: password, email: email }, this.optionRequete);
  }
  logout() {
    localStorage.removeItem('UserToken')
    this.userSubject.next('')
    this.router.navigate(['login'])
  }

}