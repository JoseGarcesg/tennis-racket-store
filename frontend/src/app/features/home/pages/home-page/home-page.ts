import { Component, inject } from '@angular/core';
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
export class HomePage {
  private productsService = inject(Products);
  rackets: Racket[] = [];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {

    this.productsService
      .getProducts()
      .subscribe(products => {
        this.rackets = products;
      });
  }
}
