import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(
    private readonly router: Router, private readonly authService: AuthService
  ) {
  }

  /**
   * @param HttpRequest<any> request - The intercepted request
   * @param HttpHandler next - The next interceptor in the pipeline
   * @return Observable<HttpEvent<any>>
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request)
      .pipe(
        catchError(
          (error: any, caught: Observable<HttpEvent<any>>) => {
            if (error.status === 401 || error.status === 403) {
              // this.handleAuthError();
              return of(error);
            }
            throw error;
          }
        ),
      );
  }

  private handleAuthError(): void {
    // удаляем невалидные значения и переходим на страницу аутентификации
    this.authService.logOut();
  }

  private addToken(request: HttpRequest<any>): HttpRequest<any> {
    const token: string = localStorage.getItem('beauty.access.token');
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

}
