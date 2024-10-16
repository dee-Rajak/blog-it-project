import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './interceptor/custom.interceptor';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])), provideZoneChangeDetection({ eventCoalescing: true }),
    provideMarkdown(),
    provideRouter(routes),
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ]
};
