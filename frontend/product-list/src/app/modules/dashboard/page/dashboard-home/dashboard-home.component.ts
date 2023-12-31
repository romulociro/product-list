import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    public productsList: Array<GetAllProductsResponse> = [];
  
    constructor(
      private productService: ProductsService,
      private messageService: MessageService,
      private productsDtService: ProductsDataTransferService,
      private router: Router
    ) { }

    ngOnInit(): void {
      this.getProductsDatas();
    }

    getProductsDatas(): void {
      this.productService
        .getAllProducts()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if(response.length > 0) {
              this.productsList = response;
              this.productsDtService.setProductsDatas(this.productsList);
            }
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: "Erro ao buscar produtos!",
              life: 2500,
            });
          }
        })
    }

    navigateToProducts() {
      this.router.navigate(['/products']);
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
