import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('bikehub-angular');

  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.productsService.getProducts(5, 0).subscribe({
      next: (res) => console.log('[BKH-005] DummyJSON products:', res),
      error: (err) => console.error('[BKH-005] DummyJSON error:', err),
    });
  }
}
