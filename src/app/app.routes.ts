import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/products.page').then((m) => m.ProductsPage),
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];