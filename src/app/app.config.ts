import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/logging/logging.interceptor';
import { HeadersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { ErrorInterceptor } from './core/interceptors/errors/errors.interceptor';
import { provideStore } from '@ngrx/store';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    provideStore(),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
]
};
