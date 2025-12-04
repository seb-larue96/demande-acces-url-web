import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';

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
        canActivate: [RoleGuard],
        data: { type: 'user', role: 'User' }
    },
    {
        path: 'toutes-demandes-acces',
        loadComponent: () => 
            import('./features/access-requests/components/list-access-requests/list-access-requests')
            .then(c => c.ListAccessRequests),
        canActivate: [RoleGuard],
        data: { type: 'admin', role: 'Admin' }
    },
    {
        path: 'users',
        loadComponent: () => 
            import('./features/users/components/list-users/list-users')
            .then(c => c.ListUsers),
        canActivate: [RoleGuard],
        data: { role: 'Admin' }
    }
];
