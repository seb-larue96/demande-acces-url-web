import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth-service";
import { ROLE_HIERARCHY } from "../constants/role-hierarchy";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const requiredRole = route.data['role'] as string;
        const userRole = this.authService.role();

        if (!userRole) {
            this.router.navigate(['/']);
            return false;
        }

        const userLevel = ROLE_HIERARCHY[userRole];
        const requiredLevel = ROLE_HIERARCHY[requiredRole];

        if (userLevel >= requiredLevel) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}