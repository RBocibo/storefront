import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  constructor() {}

  addToCart(product: Product) {
    const currentItems = this.cartItemsSource.getValue();
    const existingItemIndex = currentItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity++;
    } else {
      const newItem: CartItem = { product: product, quantity: 1 };
      currentItems.push(newItem);
    }

    this.cartItemsSource.next(currentItems);
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItemsSource.getValue();
    const updatedItems = currentItems.filter(
      (item) => item.product.id !== productId
    );
    this.cartItemsSource.next(updatedItems);
  }

  clearCart() {
    this.cartItemsSource.next([]);
  }

  decrementFromCart(productId: number) {
    const currentItems = this.cartItemsSource.getValue();
    const existingItemIndex = currentItems.findIndex(
      (item) => item.product.id === productId
    );

    if (existingItemIndex !== -1) {
      if (currentItems[existingItemIndex].quantity > 1) {
        currentItems[existingItemIndex].quantity--;
        this.cartItemsSource.next(currentItems);
      }
    }
  }

  getTotalItems(): number {
    return this.cartItemsSource
      .getValue()
      .reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItemsSource
      .getValue()
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
