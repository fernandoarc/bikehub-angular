import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService, Product } from '../../../services/products.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Products</h2>

    <p *ngIf="loading()">Loading...</p>
    <p *ngIf="error()">{{ error() }}</p>

    <ul *ngIf="!loading() && !error()">
      <li *ngFor="let p of products()">
        {{ p.title }} — {{ p.price }}
      </li>
    </ul>
  `,
})
export class ProductsPage implements OnInit {
  private readonly productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.productsService.getProducts(10, 0).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products.');
        this.loading.set(false);
      },
    });
  }
}
