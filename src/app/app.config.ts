import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpErrorInterceptor } from '../core/http/http-error.interceptor';
import { isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productsFeature } from './features/products/store/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './features/products/store/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideStore(),
    provideState(productsFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([ProductsEffects]),
  ],
};
