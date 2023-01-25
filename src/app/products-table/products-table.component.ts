/* eslint-disable import/no-extraneous-dependencies */
import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../product.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductsTableComponent {
  public products: Array<Product>;

  public productDialog: boolean;

  public product: Product;

  public selectedProducts: Product[];

  public submitted: boolean;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.productsService.getProducts().subscribe((res) => (this.products = res));
  }

  public openNew() {
    this.product = {
      category: '',
      description: '',
      id: 0,
      image: '',
      price: 0,
      rating: { count: 0, rate: 0 },
      title: '',
    };
    this.submitted = false;
    this.productDialog = true;
  }

  public deleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((el) => !this.selectedProducts.includes(el));
        this.selectedProducts = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  public editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  public deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((el) => el.id !== product.id);
        this.product = {
          category: '',
          description: '',
          id: 0,
          image: '',
          price: 0,
          rating: { count: 0, rate: 0 },
          title: '',
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  public hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  public saveProduct() {
    this.submitted = true;

    if (this.product.title.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = Number(this.createId());
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {
        category: '',
        description: '',
        id: 0,
        image: '',
        price: 0,
        rating: { count: 0, rate: 0 },
        title: '',
      };
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  public createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
