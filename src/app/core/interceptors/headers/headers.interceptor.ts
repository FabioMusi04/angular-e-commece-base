import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    let modifiedRequest;

    if (request.url.endsWith('/auth')) {
      return next.handle(request);
    }

    if (!token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.masterKey}`
        }
      });
    } else {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        url: `${environment.apiUrl}${request.url}`
      });
    }

    return next.handle(modifiedRequest);
  }
}
