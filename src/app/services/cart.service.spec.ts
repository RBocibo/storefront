import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

describe('CartService', () => {
  let service: CartService;
  let cartItemsSource: BehaviorSubject<CartItem[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
    cartItemsSource = new BehaviorSubject<CartItem[]>([]);
    service['cartItemsSource'] = cartItemsSource;
  });

  it('It should be created', () => {
    expect(service).toBeTruthy();
  });

  it('It should correctly add a product to the cart', () => {
    const productToAdd: Product = { 
      id: 1,
      title: 'Test Product',
      price: 10,
      description: '',
      category: '',
      image: '',
    };
    service.addToCart(productToAdd);

    const cartItems: CartItem[] = cartItemsSource.getValue();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toBe(productToAdd);
    expect(cartItems[0].quantity).toBe(1);
  });

  it('It should correctly increment quantity for an existing product in the cart', () => {
    const existingProduct: Product = { 
      id: 1,
      title: 'Test Product',
      price: 10,
      description: '',
      category: '',
      image: '', };
    const initialQuantity = 2;
    cartItemsSource.next([{ product: existingProduct, quantity: initialQuantity }]);

    service.addToCart(existingProduct);

    const cartItems: CartItem[] = cartItemsSource.getValue();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toBe(existingProduct);
    expect(cartItems[0].quantity).toBe(initialQuantity + 1);
  });

  it('It should correctly remove a product from the cart', () => {
    const productIdToRemove = 1;
    const cartItems: CartItem[] = [
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 2 },
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 3 },
    ];
    cartItemsSource.next(cartItems);

    service.removeFromCart(productIdToRemove);

    const updatedCartItems: CartItem[] = cartItemsSource.getValue();
    expect(updatedCartItems.length).toBe(cartItems.length - 1);
    expect(updatedCartItems.every((item) => item.product.id !== productIdToRemove)).toBeTruthy();
  });

  it('It should correctly clear the cart', () => {
    const cartItems: CartItem[] = [
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 2 },
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 3 },
    ];
    cartItemsSource.next(cartItems);

    service.clearCart();

    const updatedCartItems: CartItem[] = cartItemsSource.getValue();
    expect(updatedCartItems.length).toBe(0);
  });

  it('It should correctly decrement quantity for an existing product in the cart', () => {
    const existingProduct: Product = { id: 1,
      title: 'Test Product',
      price: 10,
      description: '',
      category: '',
      image: '', };
    const initialQuantity = 2;
    cartItemsSource.next([{ product: existingProduct, quantity: initialQuantity }]);

    service.decrementFromCart(existingProduct.id);

    const cartItems: CartItem[] = cartItemsSource.getValue();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toBe(existingProduct);
    expect(cartItems[0].quantity).toBe(initialQuantity - 1);
  });

  it('It should not decrement quantity if the quantity is already 1', () => {
    const existingProduct: Product = { id: 1,
      title: 'Test Product',
      price: 10,
      description: '',
      category: '',
      image: '', };
    cartItemsSource.next([{ product: existingProduct, quantity: 1 }]);

    service.decrementFromCart(existingProduct.id);

    const cartItems: CartItem[] = cartItemsSource.getValue();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toBe(existingProduct);
    expect(cartItems[0].quantity).toBe(1);
  });

  it('It should return the correct total items in the cart', () => {
    const cartItems: CartItem[] = [
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 2 },
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 3 },
    ];
    cartItemsSource.next(cartItems);

    const totalItems = service.getTotalItems();
    expect(totalItems).toBe(5); // 2 + 3 = 5
  });

  it('It should return the correct total price in the cart', () => {
    const cartItems: CartItem[] = [
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 2 },
      { product: { id: 1,
        title: 'Test Product',
        price: 10,
        description: '',
        category: '',
        image: '', }, quantity: 3 },
    ];
    cartItemsSource.next(cartItems);

    const totalPrice = service.getTotalPrice();
    expect(totalPrice).toBe(2 * 10 + 3 * 15); 
  });
});

