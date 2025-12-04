import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { SidenavService } from '../../services/sidenav-service';
import { SidenavModule } from '../../modules/sidenav.module';
import { HasRoleDirective } from "../../../../core/directives/role.directive";
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-sidenav',
  imports: [SidenavModule, Header, Footer, HasRoleDirective],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private sidenavService = inject(SidenavService);
  private destroy$ = new Subject<void>();
  private observer = inject(BreakpointObserver);
  private router = inject(Router);

  readonly userName = input<string>();
  @Output() logoutEvent = new EventEmitter();

  isOpened = this.sidenavService.isOpened;
  mode = this.sidenavService.mode;

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)'])
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      if (res.matches) {
        this.sidenavService.setMode('over');
        this.sidenavService.close();
      } else {
        this.sidenavService.setMode('side');
        this.sidenavService.open();
      }
    });

    this.router.events
    .pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$))
    .subscribe(() => {
      if (this.sidenavService.mode() === 'over') {
        this.sidenavService.close();
      }
    });
  }

  logout() {
    this.logoutEvent.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
