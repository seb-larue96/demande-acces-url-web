import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderModule } from '../../modules/header.module';

@Component({
  selector: 'app-header',
  imports: [HeaderModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() sidenav!: MatSidenav
}
