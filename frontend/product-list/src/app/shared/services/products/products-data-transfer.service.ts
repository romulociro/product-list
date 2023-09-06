import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsData: Array<GetAllProductsResponse> = [];

  setProductsDatas(productsData: Array<GetAllProductsResponse>): void {
    if(productsData) {
      this.productsData = productsData;
      this.productsDataEmmitter$.next(productsData);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.productsDataEmmitter$
      .pipe(
        take(1)
      ) 
      .subscribe({
        next: (response) => {
          if(response) {
            this.productsData = response;
          }
        }
      });
      return this.productsData; 
  }
}
