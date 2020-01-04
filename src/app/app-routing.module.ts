import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CategoryComponent} from './category/category.component';
import {ProductsComponent} from './products/products.component';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {NewProductComponent} from './new-product/new-product.component';

const routes: Routes = [
  {path: 'categories', component: CategoryComponent},
  {path: 'products/:p1/:p2', component: ProductsComponent},
  {path: 'detail-product/:url', component: DetailProductComponent},
  {path: 'new-product',component: NewProductComponent},
  {path: '', redirectTo: '/products/1/0', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
