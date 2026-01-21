import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders: {
      'X-App-Name': 'bikehub-angular',
    },
  });
  return next(request).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        console.error('[HTTP ERROR]:', {
          url: err.url,
          status: err.status,
          message: err.message,
        });
      } else {
        console.error('[HTTP ERROR] Unknown error occurred:', err);
      }
      return throwError(() => err);
    }),
  );
};
