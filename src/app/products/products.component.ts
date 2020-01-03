import {Component, Injectable, OnInit} from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;
  public title: string;
  currentProduct: any;

  constructor(private catalogueService: CatalogueService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    let p1 = this.activatedRoute.snapshot.params.p1;
    if (p1 == 1) {
      this.title = 'Produits';
      this.getProducts(this.catalogueService.host + '/products');
    }
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationEnd) {
        let p1 = this.activatedRoute.snapshot.params.p1;
        if (p1 == 1) {
          this.getProducts(this.catalogueService.host + '/products');
        } else if (p1 == 2) {
          let idCat = this.activatedRoute.snapshot.params.p2;
          this.title = 'Produits de cat ' + idCat;
          this.getProducts(this.catalogueService.host + '/categories/' + idCat + '/products');
        } else if (p1 == 4) {
          this.title = 'Promo';
          this.getProducts(this.catalogueService.host + '/products/search/promoProducts');
        } else if (p1 == 3) {
          this.title = 'Dispo';
          this.getProducts(this.catalogueService.host + '/products/search/availableProducts');
        } else if (p1 == 5) {
          this.title = 'Selection';
          this.getProducts(this.catalogueService.host + '/products/search/selectedProducts');
        }
      }
    });
  }

  getProducts(url) {
    this.catalogueService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, error => {
        console.log(error);
      });
  }
}
