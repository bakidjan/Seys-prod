import {Component, Injectable, OnInit} from '@angular/core';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private categories: any;
  public currentCategory: any;

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategory()
      .subscribe(data => {
        this.categories = data;
      }, error => {
        console.log(error);
      });
  }

  onGetProductsByCategories(c: any) {
    this.currentCategory = c;
    this.router.navigateByUrl('products/2/' + c.id);
  }
}
