import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ProductsComponent} from '../products/products.component';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  private photoToEdit: boolean;
  private photoSelectedToUpload: any;
  private currentPhotoSelected: any;
  private progress: number;
  private timeStamp: Date;

  constructor(private catalogueService: CatalogueService,
              private product: ProductsComponent,
              private router: Router) { }

  ngOnInit() {
  }

  onEditPhoto(p) {
    this.product.currentProduct = p;
    this.photoToEdit = true;
  }

  onChargePhotoSelectedToUpload(event) {
    this.photoSelectedToUpload = event.target.files;
  }

  onUploadPhotoSelected() {
    this.currentPhotoSelected = this.photoSelectedToUpload.item(0);
    this.progress = 0;
    this.catalogueService.uploadPhoto(this.currentPhotoSelected, this.product.currentProduct.id)
      .subscribe(event=>{
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Photo chargée avec succès');
          //this.getProductSelected('/products/search/selectedProducts');
          this.timeStamp  = new Date();
        }
      }, error => {
        console.log(error)
      })
    this.photoSelectedToUpload = undefined;
  }

  getTS() {
    return this.timeStamp;
  }
  buttonUploadVisible() {
    return this.photoSelectedToUpload;
  }

  onProductDetail(p) {
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl("detail-product/"+url)
  }
}
