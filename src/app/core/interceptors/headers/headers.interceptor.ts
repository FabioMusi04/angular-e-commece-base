import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../services/token.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();

    let modifiedRequest;

    if (!token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.masterKey}`
        }
      });
    } else if (environment.masterKey) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${environment.masterKey}`
        }
      });
    }
    else {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedRequest);
  }
}