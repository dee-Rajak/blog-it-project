import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const cloneReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  });
  debugger;
  return next(cloneReq);
};
