import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ProductsService } from '../../../services/products.service';
import { ProductsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productsService = inject(ProductsService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.load),
      switchMap(({ q, limit, skip }) => {
        const req$ = q?.trim()
          ? this.productsService.searchProducts(q, limit, skip)
          : this.productsService.getProducts(limit, skip);

        return req$.pipe(
          map((res) => ProductsActions.loadSuccess({ products: res.products })),
          catchError(() => of(ProductsActions.loadFailure({ message: 'Could not load products' }))),
        );
      }),
    ),
  );
}
