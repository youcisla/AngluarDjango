import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Controller/Product/product.service';
import { AuthService } from 'src/app/Controller/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  
  constructor(
    private _authService : AuthService,
    private _autproduct : ProductService,
    private router: Router,
    private http: HttpClient
  ) { }
  
  GetProducts() {
    this._autproduct.AllProducts().subscribe((data : any) => {
      console.log(data);
      this.products = data["All Products"];
    });
  }
  

  ngOnInit(): void {
    this.GetProducts();
  }

  ngAfterViewInit(): void {
  }
  

  }


