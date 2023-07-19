// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Controller/auth/auth.service';
import { MyUser } from 'src/app/Model/MyUser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  address : string = ''
  username: string = ''
  password: string = ''
  email: string = ''
  is_staff: Boolean =  false
  id: string = ''
  token: string = ''
  Router: any

  constructor(
    private _authService: AuthService,
    private router: Router
    // private http: HttpClient
  ) { }



  // ngOnInit(): void {
  // }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      this.username = ''
      this.password = ''
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      this.username = ''
      this.password = ''
      this.email = ''
      this.address = ''
      container?.classList.remove('right-panel-active');
    });
  }

  login() {
    this._authService.login(this.username, this.password).subscribe(data => {
      console.log(data.toString())
      localStorage.setItem('UserToken', JSON.stringify(data))
      // this.connect = 1;
      this.router.navigateByUrl('/')
    })
  }

  Register() {
    this._authService.Register(this.username, this.password, this.email).subscribe(data => { console.log(data) })
  }


  GetId() {
    const retrievedData = localStorage.getItem("UserToken");
    console.log(retrievedData)
  }
}


