import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './interceptor/custom.interceptor';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { QuillModule } from 'ngx-quill';
import { BrowserModule } from '@angular/platform-browser';
export const appConfig: ApplicationConfig = {
 
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])), provideZoneChangeDetection({ eventCoalescing: true }),
    provideMarkdown(),
    provideRouter(routes),
   importProvidersFrom(
    QuillModule.forRoot()
   ),
    provideToastr(),
    provideAnimations(),
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ]
};
