import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit {

    public productsList: Array<GetAllProductsResponse> = [];
  
    constructor(
      private productService: ProductsService,
      private messageService: MessageService
    ) { }

    ngOnInit(): void {
      this.getProductsDatas();
    }

    getProductsDatas(): void {
      this.productService
        .getAllProducts()
        .subscribe({
          next: (response) => {
            if(response.length > 0) {
              this.productsList = response;
              console.log("DADOS DOS PRODUTOS", this.productsList);
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
}