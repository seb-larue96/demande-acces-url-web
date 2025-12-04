import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private _isOpened = signal(true);
  readonly isOpened = this._isOpened.asReadonly();

  private _mode = signal<'side' | 'over'>('side');
  readonly mode = this._mode.asReadonly();

  readonly isOverAndOpened = computed(() => this._mode() === 'over' && this._isOpened());

  open() {
    this._isOpened.set(true);
  }

  close() {
    this._isOpened.set(false);
  }

  toggle() {
    this._isOpened.set(!this._isOpened());
  }

  setMode(mode: 'side' | 'over') {
    this._mode.set(mode);
  }
}
