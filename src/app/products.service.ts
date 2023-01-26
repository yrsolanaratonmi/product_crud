import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>('https://fakestoreapi.com/products');
  }

  public addProduct(product: Product) {
    return this.http.post<Product>('https://fakestoreapi.com/products', product);
  }
}
