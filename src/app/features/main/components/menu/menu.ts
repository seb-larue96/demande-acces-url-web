import { Component, inject } from '@angular/core';
import { Sidenav } from '../../../../shared/layout/components/sidenav/sidenav';
import { AuthService } from '../../../../core/services/auth/auth-service';

@Component({
  selector: 'app-menu',
  imports: [Sidenav],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private authService = inject(AuthService);

  userName = this.authService.userName;
}
