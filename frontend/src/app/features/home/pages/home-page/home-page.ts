import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCard } from
  '../../../products/components/product-card/product-card';
import { CommonModule } from '@angular/common';
import { Products } from '../../../products/services/products';
import { Racket } from '../../../../core/models/racket.model';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  private productsService = inject(Products);
  rackets = signal<Racket[]>([]);

  isLoading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {

    this.productsService
      .getProducts()
      .subscribe({
        next: (products) => {
          //console.log(products);
          this.rackets
            .set(products);

          this.isLoading
            .set(false);
        },

        error: (error) => {
          console.error(error);

          this.error
            .set('Could not load products');

          this.isLoading
            .set(false);
        }
      });
  }
}
