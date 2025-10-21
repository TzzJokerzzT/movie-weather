import { Component, signal } from '@angular/core';
import { HomeComponent } from '@pages/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('movie-weather');
}
