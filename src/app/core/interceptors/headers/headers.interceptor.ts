import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'f4179b26-21ac-432c-bcd8-cb4bc6e50981'; //TODO: get token from service
    const masterkey = environment.masterKey;

    let modifiedRequest;

    if (!token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${masterkey}`
        }
      });
    } else {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(modifiedRequest);
  }
}