import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryComponent} from './category/category.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductsComponent} from './products/products.component';
import {FormsModule} from '@angular/forms';
import {ProductCardComponent} from './product-card/product-card.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NewProductComponent } from './new-product/new-product.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductsComponent,
    ProductCardComponent,
    DetailProductComponent,
    NewProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
