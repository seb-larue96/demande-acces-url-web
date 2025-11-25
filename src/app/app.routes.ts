import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'acceuil',
        pathMatch: 'full',
    },
    {
        path: 'acceuil',
        loadComponent: () => import('./features/main/components/home/home').then(c => c.Home)
    }
];
