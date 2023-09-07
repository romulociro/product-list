import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];


  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas();

    if(productsLoaded.length > 0) {
      this.productsDatas = productsLoaded;
    } else {
      this.getAPIProductsDatas();
    }
  }

  getAPIProductsDatas() {
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.productsDatas = response;
        }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar produtos',
          life: 2500
        });
        this.router.navigate(['/dashboard'])
      }
    });
  }

  handleProductAction(event: EventAction): void {
    if(event) {
      console.log("dados do evento", event);
    }
  }

  handleDeleteProductAction(event: { 
    product_id: string, 
    productName: string
    }): void {
      if(event) {
        this.confirmationService.confirm({
          message: `Deseja excluir o produto ${event?.productName}?`,
          header: 'Confirmação de Exclusão',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          accept: () => this.deleteProduct(event?.product_id),
        })
      }
  }

  deleteProduct(product_id: string) {
    if (product_id) {
      this.productsService.deleteProduct(product_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next: () => {
              this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Produto excluído com sucesso',
                  life: 2500
              });
              this.getAPIProductsDatas();
          }, 
          error: (error) => {
              console.log(error);
              this.messageService.add({
                  severity: 'error',
                  summary: 'Erro',
                  detail: 'Erro ao excluir produto',
                  life: 2500
              });
          }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
