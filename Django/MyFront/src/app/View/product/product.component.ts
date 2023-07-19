import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Controller/Product/product.service';
import { MyProduct } from 'src/app/Model/MyProduct';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  Product: MyProduct = {
    id: 0,
    Year: 0,
    Make: '',
    Model: '',
    Trim: '',
    price: 0
  };

  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.Product.id = params['id'];
      this.GetProduct(this.Product.id);
    });
  }

  ngAfterViewInit(): void {
  }

  GetProduct(id: number) {
    this._productService.product(id).subscribe((data: any) => {
      this.Product = data["Product"];
      console.log(this.Product)
    });
  }
}
