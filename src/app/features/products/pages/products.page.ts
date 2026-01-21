import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';
import { ProductsService, Product } from '../../../services/products.service';

type ViewState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; products: Product[] };

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage {
  private readonly productsService = inject(ProductsService);

  vm$ = this.productsService.getProducts(15, 0).pipe(
    map((res): ViewState => ({ status: 'ok', products: res.products })),
    startWith({ status: 'loading' } as ViewState),
    catchError(() => of({ status: 'error', message: 'Could not load products' } as ViewState)),
  );
}
