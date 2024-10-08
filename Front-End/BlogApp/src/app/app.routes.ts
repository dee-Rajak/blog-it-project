import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home/explore',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:LoginPageComponent
    },
    {
        path:'home',
        component:HomePageComponent,
        children: [
            {
                path:'explore',
                component:ExplorePageComponent
            },
            {
                path:'dashboard',
                component:DashboardPageComponent
            }
        ]
    }
];
