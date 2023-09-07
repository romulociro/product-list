import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { CreateProductRequest } from 'src/app/models/interfaces/products/request/CreateProductRequest';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnDestroy, OnInit {
  private readonly destroy$: Subject<void> = new Subject();
  public productAction!: {
    event: EventAction;
    productDatas: Array<GetAllProductsResponse>
  }
  public productSelectedDatas!: GetAllProductsResponse; 
  public productDatas: Array<GetAllProductsResponse> = []; 

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    supplier: ['', Validators.required],
    price: ['', Validators.required],
  });
  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    supplier: ['', Validators.required],
    price: ['', Validators.required],
  });

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT 

  constructor(
    private productsDtService: ProductsDataTransferService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private productsService: ProductsService,
    public ref: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.productAction = this.ref.data;
    if(this.productAction?.event?.action === this.editProductAction && this.productAction.productDatas) {
      this.getProductSelectedDatas(this.productAction?.event?.id as string);
    }
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.valid && this.addProductForm?.value) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        supplier: this.addProductForm.value.supplier as string,
        price: this.addProductForm.value.price as string,
      };

      this.productsService.createProduct(requestCreateProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto cadastrado com sucesso!',
              life: 2500,
            });
          }
        }, error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao cadastrar produto!',
            life: 2500,
          });
        }
      })
    }

    this.addProductForm.reset();
  }

  handleSubmitEditProduct(): void {
    if(this.editProductForm.value && this.editProductForm.valid && this.productAction.event.id) {
      const requestEditProduct: CreateProductRequest = {
        name: this.editProductForm.value.name as string,
        supplier: this.editProductForm.value.supplier as string,
        price: this.editProductForm.value.price as string,
      };

      this.productsService.editProduct(this.productAction.event.id, requestEditProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto editado com sucesso!',
            life: 2500,
          });
          this.editProductForm.reset();
        }, error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao editar produto!',
            life: 2500,
          });
          this.editProductForm.reset();
        }
      })
    }
  }

  getProductSelectedDatas(productId: string): void {
    const allProducts = this.productAction?.productDatas;

    if(allProducts.length > 0){
      const productFiltered = allProducts.filter((product) => product?.id === productId);
    
      if(productFiltered) {
        this.productSelectedDatas = productFiltered[0];

        this.editProductForm.setValue({
          name: this.productSelectedDatas?.name,
          supplier: this.productSelectedDatas?.supplier,
          price: this.productSelectedDatas?.price,
        });
      }
    };
  }

  getProductDatas(): void {
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.productDatas = response;
          this.productDatas && this.productsDtService.setProductsDatas(this.productDatas)
        }
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
