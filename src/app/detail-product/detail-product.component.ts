import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {ProductsComponent} from '../products/products.component';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  private currentProduct: any;
  private photoToEdit: boolean;
  private photoSelectedToUpload: any;
  private currentPhotoSelected: any;
  private progress: number;
  private timeStamp: Date;
  mode: number = 0;
  private url: any;

  constructor(private activatedRoute: ActivatedRoute,
              private catalogueService: CatalogueService,
              private router: Router) {
  }

  ngOnInit() {
    this.url = atob(this.activatedRoute.snapshot.params.url);
    this.catalogueService.getResource(this.url)
      .subscribe(data => {
        this.currentProduct = data;
      }, error => {
        console.log(error);
      });
  }

  onEditPhoto(p) {
    this.currentProduct = p;
    this.photoToEdit = true;
  }

  onChargePhotoSelectedToUpload(event) {
    this.photoSelectedToUpload = event.target.files;
  }

  onUploadPhotoSelected() {
    this.currentPhotoSelected = this.photoSelectedToUpload.item(0);
    this.progress = 0;
    this.catalogueService.uploadPhoto(this.currentPhotoSelected, this.currentProduct.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('Photo chargée avec succès');
          //this.getProductSelected('/products/search/selectedProducts');
          this.timeStamp = new Date();
        }
      }, error => {
        console.log(error);
      });
    this.photoSelectedToUpload = undefined;
  }

  getTS() {
    return this.timeStamp;
  }

  buttonUploadVisible() {
    return this.photoSelectedToUpload;
  }


  onEditProduct() {
    this.mode = 1;
  }

  onUpdateProduct(value) {
    let url = this.currentProduct._links.self.href;
    console.log(this.url)
    /*
    * patchResource permet la mise en jour d'un champ independemment
    * sinon un put change tous les champs*/
    this.catalogueService.patchResource(url, value)
      .subscribe(data => {
        confirm('est vous sûr ?');
        this.currentProduct = data;
        this.mode = 0;
      }, error => {
        console.log(error);
      });
  }
}
