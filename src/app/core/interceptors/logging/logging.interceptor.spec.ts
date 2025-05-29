import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should log outgoing HTTP requests', () => {
    const consoleSpy = spyOn(console, 'log');

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');

    req.flush({});

    expect(consoleSpy).toHaveBeenCalledWith('Outgoing HTTP request', jasmine.any(Object));
  });

  it('should log incoming HTTP responses', () => {
    const consoleSpy = spyOn(console, 'log');

    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({});

    expect(consoleSpy).toHaveBeenCalledWith('Incoming HTTP response', jasmine.any(Object));
  });
});