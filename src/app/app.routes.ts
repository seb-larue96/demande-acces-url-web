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
        path: 'mes-demandes-acces',
        loadComponent: () => 
            import('./features/access-requests/components/list-access-requests/list-access-requests')
            .then(c => c.ListAccessRequests),
        data: { type: 'user' }
    },
    {
        path: 'toutes-demandes-acces',
        loadComponent: () => 
            import('./features/access-requests/components/list-access-requests/list-access-requests')
            .then(c => c.ListAccessRequests),
        data: { type: 'admin' }
    },
    {
        path: 'users',
        loadComponent: () => import('./features/users/components/list-users/list-users').then(c => c.ListUsers)
    }
];
