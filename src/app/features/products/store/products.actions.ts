import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../../services/products.service';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    Load: props<{ q: string; limit: number; skip: number }>(),
    'Load Success': props<{ products: Product[] }>(),
    'Load Failure': props<{ message: string }>(),
  },
});
