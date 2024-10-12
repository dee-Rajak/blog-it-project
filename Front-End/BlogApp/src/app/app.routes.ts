import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';

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
        path:'about',
        component:AboutPageComponent
    },
    {
        path:'team',
        component:TeamPageComponent
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
                component:DashboardPageComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
];
