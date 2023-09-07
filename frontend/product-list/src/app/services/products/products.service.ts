import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';
import { CreatedProductResponse } from 'src/app/models/interfaces/products/response/CreateProductResponse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { EditProductResponse } from 'src/app/models/interfaces/products/response/EditProductResponse';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = environment.API_URL;
  get httpOptions() {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookie.get('token')}`
      }
    };
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService
    ) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`, 
      this.httpOptions
      );
  }

  deleteProduct(product_id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/products/${product_id}`, 
      this.httpOptions
    );
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreatedProductResponse> {
    return this.http.post<CreatedProductResponse>(
      `${this.API_URL}/products`, 
      requestDatas, 
      this.httpOptions
    );
  }

  editProduct(productId: string, requestDatas: EditProductRequest): Observable<EditProductResponse> {
    return this.http.put<EditProductResponse>(
      `${this.API_URL}/products/${productId}`, 
      requestDatas, 
      this.httpOptions
    );
  }
}
