import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-catalog',
  imports: [CurrencyPipe],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.scss'],
})
export class Catalog {
  readonly products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.products.set(this.productService.getProducts());
  }
}
