import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyUser } from 'src/app/Model/MyUser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = "http://127.0.0.1:8000"

  optionRequete = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'json' as 'json' // Use 'json' instead of 'text'
  };
  
  
  constructor(
    private http: HttpClient
  ) { }

  Add(Year: number, Make: string, Model: string, Trim:string, price: number, id: number) {
    return this.http.post(`${this.API_URL}/AddProduct`,{Year:Year,Make:Make,Model:Model,Trim:Trim,price:price,id:id}, this.optionRequete);
  }

  AllProducts() {
    return this.http.get(`${this.API_URL}/`, this.optionRequete);
    // return this.http.get(`${this.API_URL}/GetProducts/`, this.optionRequete);
}
  product(id: number) {
    return this.http.post(`${this.API_URL}/product`, {id:id}, this.optionRequete);
  }

}