import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.baseUrl}/products?limit=${limit}&skip=${skip}`);
  }
}
