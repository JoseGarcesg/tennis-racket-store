import { Component, inject, OnInit, signal, computed } from '@angular/core';
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
  search = signal('');
  selectedBrand = signal('All Brands');

  brands = computed(() => {

    const uniqueBrands =
      [...new Set(
        this.rackets()
          .map(r => r.brand)
      )];

    return [
      'All Brands',
      ...uniqueBrands
    ];
  });

  filteredRackets = computed(() => {

    const query =
      this.search()
        .toLowerCase()
        .trim();

    const brand =
      this.selectedBrand();

    return this.rackets()
      .filter(racket => {

        const matchesSearch =
          !query
          ||
          racket.name
            .toLowerCase()
            .includes(query)
          ||
          racket.brand
            .toLowerCase()
            .includes(query);

        const matchesBrand =
          brand === 'All Brands'
          ||
          racket.brand === brand;

        return (
          matchesSearch
          &&
          matchesBrand
        );
      });
  });

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
