import { Component } from '@angular/core';
import { Login } from '../login/login';

@Component({
  selector: 'app-landing',
  imports: [Login],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
}
