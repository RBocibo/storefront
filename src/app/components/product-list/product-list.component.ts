import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private apiService: ProductApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
