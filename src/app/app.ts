import { Component, inject, signal } from '@angular/core';
import { AuthService } from './core/services/auth/auth-service';
import { Landing } from './features/main/components/landing/landing';
import { Menu } from './features/main/components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [Landing, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal("Demande d'Accès URL");

  public authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuth().subscribe();
  }

}
