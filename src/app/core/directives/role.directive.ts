import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';
import { ROLE_HIERARCHY } from '../constants/role-hierarchy';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

  private allowedRoles: string[] = [];

  @Input() set appHasRole(roleOrRoles: string | string[]) {
    this.allowedRoles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
    this.updateView();
  }

  constructor() {
    effect(() => this.updateView());
  }

  private updateView() {
    const userRole = this.authService.role();
    const userLevel = userRole ? ROLE_HIERARCHY[userRole] : 0;

    const allowed = this.allowedRoles.some(r => userLevel >= (ROLE_HIERARCHY[r] || 0));

    if (allowed) {
      if (this.viewContainer.length === 0) this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
