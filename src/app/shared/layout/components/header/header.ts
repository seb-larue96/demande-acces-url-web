import { Component, inject } from '@angular/core';
import { HeaderModule } from '../../modules/header.module';
import { SidenavService } from '../../services/sidenav-service';

@Component({
  selector: 'app-header',
  imports: [HeaderModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private sidenavService = inject(SidenavService);

  mode = this.sidenavService.mode;
  isOpened = this.sidenavService.isOpened;

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
