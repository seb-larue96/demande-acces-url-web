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
    },
    {
        path: 'demandes-acces',
        loadComponent: () => import('./features/access-requests/components/list-access-requests/list-access-requests').then(c => c.ListAccessRequests)
    }
];
