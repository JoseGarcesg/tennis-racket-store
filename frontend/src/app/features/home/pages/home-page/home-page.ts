import { Component } from '@angular/core';
import { RACKETS } from '../../../../../assets/mock/rackets';
import { ProductCard } from
  '../../../products/components/product-card/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  rackets = RACKETS;
}
