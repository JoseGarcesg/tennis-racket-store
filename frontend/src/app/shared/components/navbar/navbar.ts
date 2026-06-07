import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../../features/cart/services/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  cart =
    inject(Cart);
}
