import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsComponent} from './products/products.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor( private router: Router,
               private product: ProductsComponent) {
  }
  ngOnInit(): void {
  }

  onAvailableProducts() {
    this.router.navigateByUrl("products/3/0")
  }

  onPromoProducts() {
    this.router.navigateByUrl("products/4/0")
  }

  onSelectedProducts() {
    this.router.navigateByUrl("products/5/0")
  }
}
