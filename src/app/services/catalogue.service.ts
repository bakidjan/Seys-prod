import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

/*  public getProduct(url, page: number, size: number) {
    return this.httpClient.get(url + '/products?page=' + page + '&size=' + size);
  }*/

  getResource(url) {
    return this.httpClient.get(url);
  }

  uploadPhoto(photoToUpload: File, id: number): Observable<HttpEvent<{}>> {
    const url = this.host + '/uploadPhoto/' + id;
    const formData: FormData = new FormData();
    formData.append('file', photoToUpload);
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.httpClient.request(req);
  }

  updateProduct(url, data) {
    return this.httpClient.put(url, data);
  }

}
