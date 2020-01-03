import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public host: string = "http://localhost:8080";

  constructor( private httpClient: HttpClient) { }

  getCategory(){
    return this.httpClient.get(this.host+"/categories")
  }

}
