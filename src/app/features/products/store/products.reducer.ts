import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductsActions } from './products.actions';
import { Product } from '../../../services/products.service';

export interface ProductsState {
  q: string;
  limit: number;
  skip: number;
  loading: boolean;
  error: string | null;
  products: Product[];
}

export const initialState: ProductsState = {
  q: '',
  limit: 10,
  skip: 0,
  loading: false,
  error: null,
  products: [],
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsActions.load, (state, { q, limit, skip }) => ({
      ...state,
      q,
      limit,
      skip,
      loading: true,
      error: null,
    })),
    on(ProductsActions.loadSuccess, (state, { products }) => ({
      ...state,
      loading: false,
      products,
    })),
    on(ProductsActions.loadFailure, (state, { message }) => ({
      ...state,
      loading: false,
      error: message,
    })),
  ),
});
