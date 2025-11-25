import { Component } from '@angular/core';
import { HomeModule } from '../../modules/home.module';

@Component({
  selector: 'app-home',
  imports: [HomeModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
