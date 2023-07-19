import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './View/login/login.component';
import { AddProductComponent } from './View/add-product/add-product.component';
import { HomeComponent } from './View/home/home.component';
import { ProductComponent } from './View/product/product.component';
import { AuthService } from './Controller/auth/auth.service';

const routes: Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'AddProduct', component : AddProductComponent},
  {path : '', component : HomeComponent},
  {path : 'product/:id', component : ProductComponent},
  {path : 'logout/', component : AuthService},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
