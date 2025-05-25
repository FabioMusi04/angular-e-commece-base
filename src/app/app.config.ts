import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/logging/logging.interceptor';
import { HeadersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { ErrorInterceptor } from './core/interceptors/errors/errors.interceptor';
import { provideStore } from '@ngrx/store';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideEffects } from '@ngrx/effects';

import { productsReducer } from './state/products/products.reducer';
import { ProductsEffects } from './state/products/products.effects';

import { categoriesReducer } from './state/categories/categories.reducer';
import { CategoriesEffects } from './state/categories/categories.effects';

import { ordersReducer } from './state/orders/orders.reducer';
import { OrdersEffects } from './state/orders/orders.effects';

import { usersReducer } from './state/users/users.reducer';
import { UsersEffects } from './state/users/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideStore({
      products: productsReducer,
      categories: categoriesReducer,
      orders: ordersReducer,
      users: usersReducer
    }),
    provideEffects(
      [
        ProductsEffects,
        CategoriesEffects,
        OrdersEffects,
        UsersEffects
      ]
    ),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
};
