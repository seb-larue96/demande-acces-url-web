import { Component, EventEmitter, inject, input, Output, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter, Subject, takeUntil } from 'rxjs';
import { SidenavModule } from '../../modules/sidenav.module';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-sidenav',
  imports: [SidenavModule, Header, Footer],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  private destroy$ = new Subject<void>();
  private observer = inject(BreakpointObserver);
  private router = inject(Router);

  readonly userName = input<string>();
  @Output() logoutEvent = new EventEmitter();
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngAfterViewInit() {
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(
      delay(1),
      takeUntil(this.destroy$)
    )
    .subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.router.events
    .pipe(
      filter((e) => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      if (this.sidenav.mode === 'over') {
        this.sidenav.close();
      }
    });
  }

  logout(){
    this.logoutEvent.emit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
