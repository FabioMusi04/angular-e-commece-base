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

  constructor(private tokenService: TokenService, private masterKey: boolean) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    const masterkey = this.masterKey && environment.masterKey;

    let modifiedRequest;

    if (!token) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${masterkey}`
        }
      });
    } else if (masterkey) {
      modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${masterkey}`
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