import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from 'src/app/Controller/Product/product.service';
import { AuthService } from 'src/app/Controller/auth/auth.service';
import { MyUser } from 'src/app/Model/MyUser';
import { Router } from '@angular/router';
import { data } from 'jquery';
declare const CarQuery: any;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, AfterViewInit {
  Year: number = 0
  Make: string = ''
  Model: string = ''
  Trim: string = ''
  price: GLfloat = 0
  User: MyUser = {
    id: 0, username: '', password: '', email: '', address: '', is_staff: false
  };

  constructor(
    private _authService: AuthService,
    private _productervice: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this._authService.getUserInfo().subscribe(data => {
    //   this.User = data
    // })

  }

  ngAfterViewInit(): void {


    document.addEventListener('DOMContentLoaded', () => {
      const carquery = new CarQuery();

      carquery.init();

      carquery.setFilters({ sold_in_us: true });

      carquery.initYearMakeModelTrim(
        'car-years',
        'car-makes',
        'car-models',
        'car-model-trims'
      );

      document
        .getElementById('cq-show-data')
        ?.addEventListener('click', () => {
          carquery.populateCarData('car-model-data');
        });

      carquery.initMakeModelTrimList(
        'make-list',
        'model-list',
        'trim-list',
        'trim-data-list'
      );

      carquery.year_select_min = 1990;
      carquery.year_select_max = 1999;

      const searchArgs = {
        body_id: 'cq-body',
        default_search_text: 'Keyword Search',
        doors_id: 'cq-doors',
        drive_id: 'cq-drive',
        engine_position_id: 'cq-engine-position',
        engine_type_id: 'cq-engine-type',
        fuel_type_id: 'cq-fuel-type',
        min_cylinders_id: 'cq-min-cylinders',
        min_mpg_hwy_id: 'cq-min-mpg-hwy',
        min_power_id: 'cq-min-power',
        min_top_speed_id: 'cq-min-top-speed',
        min_torque_id: 'cq-min-torque',
        min_weight_id: 'cq-min-weight',
        min_year_id: 'cq-min-year',
        max_cylinders_id: 'cq-max-cylinders',
        max_mpg_hwy_id: 'cq-max-mpg-hwy',
        max_power_id: 'cq-max-power',
        max_top_speed_id: 'cq-max-top-speed',
        max_weight_id: 'cq-max-weight',
        max_year_id: 'cq-max-year',
        search_controls_id: 'cq-search-controls',
        search_input_id: 'cq-search-input',
        search_results_id: 'cq-search-results',
        search_result_id: 'cq-search-result',
        seats_id: 'cq-seats',
        sold_in_us_id: 'cq-sold-in-us',
      };
      carquery.initSearchInterface(searchArgs);

      document.getElementById('cq-search-btn')?.addEventListener('click', () => {
        carquery.search();
      });
    });
  }



  Add() {
    this._productervice.Add(this.Year, this.Make, this.Model, this.Trim, this.price, this.User.id).subscribe((data: any) => { console.log(data) })
    this.router.navigateByUrl('/')
  }

}

