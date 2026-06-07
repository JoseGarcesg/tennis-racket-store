import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterLink,
    RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
