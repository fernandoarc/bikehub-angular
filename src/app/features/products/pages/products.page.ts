import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../../../services/products.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, startWith, switchMap, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsActions } from '../store/products.actions';
import { productsFeature } from '../store/products.reducer';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  private readonly products$ = this.store.select(productsFeature.selectProducts);
  private readonly loading$ = this.store.select(productsFeature.selectLoading);
  private readonly error$ = this.store.select(productsFeature.selectError);

  form = new FormGroup({
    q: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(30)] }),
    limit: new FormControl(10, {
      nonNullable: true,
      validators: [Validators.min(1), Validators.max(50)],
    }),
    skip: new FormControl(0, { nonNullable: true, validators: [Validators.min(0)] }),
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((qp) => {
      const q = qp.get('q') ?? '';
      const limit = Number(qp.get('limit') ?? 10);
      const skip = Number(qp.get('skip') ?? 0);

      this.form.patchValue({ q, limit, skip }, { emitEvent: false });
      this.store.dispatch(ProductsActions.load({ q, limit, skip }));
    });
  }

  apply(): void {
    if (this.form.invalid) return;

    const { q, limit, skip } = this.form.getRawValue();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: q || null, limit, skip },
      queryParamsHandling: 'merge',
    });
  }

  vm$ = combineLatest({
    loading: this.loading$,
    error: this.error$,
    products: this.products$,
  }).pipe(
    map(({ loading, error, products }): ViewState => {
      if (loading) return { status: 'loading' };
      if (error) return { status: 'error', message: error };
      return { status: 'ok', products };
    }),
  );
}
