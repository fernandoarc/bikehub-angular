import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../../services/products.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';

type ViewState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; products: Product[] };

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  form = new FormGroup({
    q: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(30)] }),
    limit: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(50)],
    }),
    skip: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
  });

  apply(): void {
    if (this.form.invalid) return;

    const { q, limit, skip } = this.form.getRawValue();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: q || null, limit, skip },
      queryParamsHandling: 'merge',
    });
  }

  vm$ = this.route.queryParamMap.pipe(
    map((qp) => ({
      q: qp.get('q') ?? '',
      limit: Number(qp.get('limit') ?? 10),
      skip: Number(qp.get('skip') ?? 0),
    })),
    switchMap(({ q, limit, skip }) => {
      const req$ = q
        ? this.productsService.searchProducts(q, limit, skip)
        : this.productsService.getProducts(limit, skip);

      return req$.pipe(
        map((res): ViewState => ({ status: 'ok', products: res.products })),
        startWith({ status: 'loading' } as ViewState),
        catchError(() => of({ status: 'error', message: 'Could not load products' } as ViewState)),
      );
    }),
  );
}
